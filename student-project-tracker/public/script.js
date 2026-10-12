// Store projects in memory and in localStorage.
const STORAGE_KEY = "workshop-projects-v1";
const projects = [];

// Track the project currently being edited.
let editingId = null;

// Find the HTML elements.
const projectForm = document.querySelector("#project-form");
const nameInput = document.querySelector("#name");
const statusInput = document.querySelector("#status");
const projectList = document.querySelector("#project-list");
const emptyState = document.querySelector("#empty-state");
const saveButton = document.querySelector("#save-button");
const cancelButton = document.querySelector("#cancel-button");
const formTitle = document.querySelector("#form-title");
const message = document.querySelector("#message");

// Show a message without interpreting it as HTML.
function showMessage(text) {
  if (message) {
    message.textContent = text;
  }
}

// Generate a unique ID for each new project.
function createProjectId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// Check that the saved data has the expected structure.
function isValidProjectArray(data) {
  if (!Array.isArray(data)) {
    return false;
  }

  const ids = new Set();

  return data.every(function (project) {
    if (
      project === null ||
      typeof project !== "object" ||
      Array.isArray(project) ||
      typeof project.id !== "string" ||
      project.id.trim() === "" ||
      typeof project.name !== "string" ||
      project.name.trim() === "" ||
      !["Planned", "In Progress", "Completed"].includes(project.status)
    ) {
      return false;
    }

    if (ids.has(project.id)) {
      return false;
    }

    ids.add(project.id);
    return true;
  });
}

// Load saved projects when the page starts.
function loadProjects() {
  let storedText;

  try {
    storedText = localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    showMessage(
      "Saved projects could not be read from this browser. Changes may not be saved."
    );
    return;
  }

  // A missing key means this is a new, empty tracker.
  if (storedText === null) {
    return;
  }

  let storedProjects;

  try {
    storedProjects = JSON.parse(storedText);
  } catch (error) {
    showMessage(
      "Saved project data is invalid. It has not been overwritten. Check or clear the stored data before continuing."
    );
    return;
  }

  if (!isValidProjectArray(storedProjects)) {
    showMessage(
      "Saved project data has an invalid format. It has not been overwritten. Check or clear the stored data before continuing."
    );
    return;
  }

  // Restore the valid records into the existing array.
  projects.push(...storedProjects);
}

// Save the current collection.
function saveProjects() {
  try {
    // Convert the projects array into text for storage.
    const storedText = JSON.stringify(projects);

    localStorage.setItem(STORAGE_KEY, storedText);
    return true;
  } catch (error) {
    showMessage(
      "Your changes are in this page's memory, but they could not be saved to browser storage."
    );
    return false;
  }
}

// Return the form to Add mode.
function resetFormMode() {
  editingId = null;
  projectForm.reset();

  saveButton.textContent = "Save Project";
  cancelButton.hidden = true;

  if (formTitle) {
    formTitle.textContent = "Add a Project";
  }
}

// Display all projects.
function renderProjects() {
  if (!projectList) {
    return;
  }

  projectList.replaceChildren();

  if (emptyState) {
    emptyState.hidden = projects.length > 0;
  }

  projects.forEach(function (project) {
    const listItem = document.createElement("li");

    const projectName = document.createElement("strong");
    projectName.textContent = project.name;

    const projectStatus = document.createElement("span");
    projectStatus.textContent = " — " + project.status + " ";

    // Edit button.
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "Edit";

    editButton.addEventListener("click", function () {
      const selectedProject = projects.find(function (item) {
        return item.id === project.id;
      });

      if (!selectedProject) {
        return;
      }

      editingId = selectedProject.id;
      nameInput.value = selectedProject.name;
      statusInput.value = selectedProject.status;

      saveButton.textContent = "Save changes";
      cancelButton.hidden = false;

      if (formTitle) {
        formTitle.textContent = "Edit a Project";
      }

      showMessage("");
      nameInput.focus();
    });

    // Delete button.
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
      const selectedProject = projects.find(function (item) {
        return item.id === project.id;
      });

      if (!selectedProject) {
        return;
      }

      // Ask before deleting the selected project.
      const confirmed = window.confirm(
        "Are you sure you want to delete " +
          selectedProject.name +
          "?"
      );

      if (!confirmed) {
        return;
      }

      const projectIndex = projects.findIndex(function (item) {
        return item.id === selectedProject.id;
      });

      if (projectIndex === -1) {
        return;
      }

      const wasBeingEdited = editingId === selectedProject.id;

      projects.splice(projectIndex, 1);

      if (wasBeingEdited) {
        resetFormMode();
      }

      renderProjects();

      if (saveProjects()) {
        showMessage("Project deleted.");
      }
    });

    listItem.append(
      projectName,
      projectStatus,
      editButton,
      deleteButton
    );

    projectList.appendChild(listItem);
  });
}

// Handle form submission with one submit listener.
if (
  projectForm &&
  nameInput &&
  statusInput &&
  projectList &&
  saveButton &&
  cancelButton
) {
  projectForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const status = statusInput.value;

    // Validate the name and status.
    if (!name) {
      showMessage("Please enter a project name.");
      nameInput.focus();
      return;
    }

    if (!["Planned", "In Progress", "Completed"].includes(status)) {
      showMessage("Please select a valid project status.");
      statusInput.focus();
      return;
    }

    const wasEditing = editingId !== null;

    if (wasEditing) {
      // Edit mode: update the existing record.
      const projectToUpdate = projects.find(function (project) {
        return project.id === editingId;
      });

      if (!projectToUpdate) {
        resetFormMode();
        renderProjects();
        showMessage("That project could not be found. Please try again.");
        return;
      }

      // Keep the existing ID.
      projectToUpdate.name = name;
      projectToUpdate.status = status;
    } else {
      // Add mode: create a new record.
      projects.push({
        id: createProjectId(),
        name: name,
        status: status
      });
    }

    renderProjects();
    resetFormMode();

    if (saveProjects()) {
      showMessage("Project " + (wasEditing ? "updated." : "saved."));
    }

    nameInput.focus();
  });

  // Cancel editing without changing the stored record.
  cancelButton.addEventListener("click", function () {
    resetFormMode();
    showMessage("Editing cancelled. No changes were saved.");
    nameInput.focus();
  });
}

// Restore saved projects before the first render.
loadProjects();
renderProjects();
