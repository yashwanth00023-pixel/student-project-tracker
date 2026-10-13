const projectForm = document.querySelector("#project-form");
const nameInput = document.querySelector("#name");
const statusInput = document.querySelector("#status");
const projectList = document.querySelector("#project-list");
const emptyState = document.querySelector("#empty-state");
const saveButton = document.querySelector("#save-button");
const cancelButton = document.querySelector("#cancel-button");
const formTitle = document.querySelector("#form-title");
const message = document.querySelector("#message");
const searchInput = document.querySelector("#search");
const sortInput = document.querySelector("#sort");
const listTools = document.querySelector(".list-tools");
const filters = document.querySelector("#filters");
const filterButtons = [...filters.querySelectorAll("button")];
const listSummary = document.querySelector("#list-summary");

const statusOrder = ["Planned", "In Progress", "Completed"];

let projects = [];
let editingId = null;
let busy = false;
let renderedIds = new Set();
let statusFilter = "All";

function showMessage(text, isError = false) {
  message.textContent = text;
  message.dataset.error = String(isError);

  // Restart the entrance animation so each new message is noticeable.
  message.classList.remove("pop");
  void message.offsetWidth;
  message.classList.add("pop");
}

function resetFormMode() {
  editingId = null;
  projectForm.reset();
  saveButton.textContent = "Save Project";
  cancelButton.hidden = true;
  formTitle.textContent = "Add a Project";
}

function setBusy(value) {
  busy = value;
  projectForm
    .querySelectorAll("input, select, button")
    .forEach((element) => {
      element.disabled = value;
    });
  projectList.querySelectorAll("button").forEach((element) => {
    element.disabled = value;
  });
}

function getErrorMessage(error) {
  if (error instanceof TypeError) {
    return "Network error. Check that the server is running.";
  }

  return error instanceof Error ? error.message : "The request failed.";
}

async function getApiError(response) {
  try {
    const body = await response.json();
    if (typeof body.error === "string" && body.error.trim()) {
      return body.error;
    }
  } catch {
    // The server response did not contain readable JSON.
  }

  return `Request failed with status ${response.status}.`;
}

async function request(url, options = {}) {
  let response;

  try {
    response = await fetch(url, options);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  if (!response.ok) {
    throw new Error(await getApiError(response));
  }

  return response;
}

async function loadProjects() {
  const response = await request("/api/projects");
  const rows = await response.json();

  if (!Array.isArray(rows)) {
    throw new Error("The server returned an invalid project list.");
  }

  projects = rows;
  renderProjects();
}

function getVisibleProjects() {
  const search = searchInput.value.trim().toLowerCase();

  const visible = projects.filter((project) => {
    const matchesStatus = statusFilter === "All" || project.status === statusFilter;
    return matchesStatus && project.name.toLowerCase().includes(search);
  });

  // The API returns newest first, so "newest" keeps that order.
  if (sortInput.value === "oldest") {
    visible.sort((a, b) => a.id - b.id);
  } else if (sortInput.value === "name") {
    visible.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
  } else if (sortInput.value === "status") {
    visible.sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
  }

  return visible;
}

function renderFilters() {
  filterButtons.forEach((button) => {
    const status = button.dataset.filter;
    const count = status === "All"
      ? projects.length
      : projects.filter((project) => project.status === status).length;

    button.textContent = `${status} (${count})`;
    button.setAttribute("aria-pressed", String(status === statusFilter));
  });
}

function renderProjects() {
  const visibleProjects = getVisibleProjects();
  const hasProjects = projects.length > 0;

  projectList.replaceChildren();
  renderFilters();

  listTools.hidden = !hasProjects;
  filters.hidden = !hasProjects;
  emptyState.hidden = visibleProjects.length > 0;
  emptyState.textContent = hasProjects
    ? "No projects match your search or filter."
    : "No projects yet.";
  listSummary.textContent = hasProjects && visibleProjects.length !== projects.length
    ? `Showing ${visibleProjects.length} of ${projects.length} projects.`
    : "";

  let newItems = 0;

  visibleProjects.forEach((project) => {
    const listItem = document.createElement("li");
    const projectInfo = document.createElement("div");
    const projectActions = document.createElement("div");
    const projectName = document.createElement("strong");
    const projectStatus = document.createElement("span");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    projectInfo.className = "project-info";
    projectActions.className = "project-actions";

    // Animate only rows that were not on the page before this render.
    if (!renderedIds.has(project.id)) {
      listItem.classList.add("enter");
      listItem.style.setProperty("--i", String(newItems));
      newItems += 1;
    }

    projectName.textContent = project.name;
    projectStatus.textContent = project.status;
    projectStatus.className = "status";
    projectStatus.dataset.status = project.status;

    editButton.type = "button";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      if (busy) return;

      editingId = project.id;
      nameInput.value = project.name;
      statusInput.value = project.status;
      saveButton.textContent = "Save changes";
      cancelButton.hidden = false;
      formTitle.textContent = "Edit a Project";
      showMessage("Editing project.");
      nameInput.focus();
    });

    deleteButton.type = "button";
    deleteButton.className = "danger";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async () => {
      if (busy || !window.confirm(`Are you sure you want to delete ${project.name}?`)) {
        return;
      }

      setBusy(true);
      showMessage("Deleting...");

      try {
        await request(`/api/projects/${project.id}`, { method: "DELETE" });

        if (editingId === project.id) {
          resetFormMode();
        }

        await loadProjects();
        showMessage("Project deleted.");
      } catch (error) {
        showMessage(getErrorMessage(error), true);
      } finally {
        setBusy(false);
      }
    });

    projectInfo.append(projectName, projectStatus);
    projectActions.append(editButton, deleteButton);
    listItem.append(projectInfo, projectActions);
    projectList.appendChild(listItem);
  });

  renderedIds = new Set(visibleProjects.map((project) => project.id));

  // Rows are rebuilt on every render, so keep them locked while a request is pending.
  if (busy) setBusy(true);
}

searchInput.addEventListener("input", renderProjects);
sortInput.addEventListener("change", renderProjects);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    statusFilter = button.dataset.filter;
    renderProjects();
  });
});

projectForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (busy) return;

  const project = {
    name: nameInput.value.trim(),
    status: statusInput.value
  };

  if (!project.name) {
    showMessage("Please enter a project name.", true);
    nameInput.focus();
    return;
  }

  const isEditing = editingId !== null;
  const url = isEditing ? `/api/projects/${editingId}` : "/api/projects";
  const method = isEditing ? "PUT" : "POST";

  setBusy(true);
  showMessage("Saving...");

  try {
    await request(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project)
    });

    // Clear the search and filter after adding, so the new project is always visible.
    if (!isEditing) {
      searchInput.value = "";
      statusFilter = "All";
    }

    await loadProjects();
    resetFormMode();
    showMessage(isEditing ? "Project updated." : "Project saved.");
  } catch (error) {
    showMessage(getErrorMessage(error), true);
  } finally {
    setBusy(false);
  }
});

cancelButton.addEventListener("click", () => {
  if (busy) return;

  resetFormMode();
  showMessage("Editing cancelled. No changes were saved.");
  nameInput.focus();
});

setBusy(true);
showMessage("Loading projects...");

loadProjects()
  .then(() => {
    showMessage(projects.length ? "Projects loaded." : "No projects yet.");
  })
  .catch((error) => {
    projectList.replaceChildren();
    emptyState.hidden = true;
    listTools.hidden = true;
    filters.hidden = true;
    showMessage(getErrorMessage(error), true);
  })
  .finally(() => {
    setBusy(false);
  });
