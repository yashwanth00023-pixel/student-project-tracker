// Start with an empty array whenever the page loads.
const projects = [];

// Find the existing HTML elements.
const projectForm = document.querySelector("#project-form");
const nameInput = document.querySelector("#name");
const statusInput = document.querySelector("#status");
const projectList = document.querySelector("#project-list");
const emptyState = document.querySelector("#empty-state");

// Generate a unique ID for each new project.
function createProjectId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// Display all projects in the list.
function renderProjects() {
  if (!projectList) {
    return;
  }

  // Clear the old list before rebuilding it.
  projectList.replaceChildren();

  // Show or hide the empty-state message.
  if (emptyState) {
    emptyState.hidden = projects.length > 0;
  }

  // Create a list item for every project.
  projects.forEach(function (project) {
    const listItem = document.createElement("li");

    const projectName = document.createElement("strong");
    projectName.textContent = project.name;

    const projectStatus = document.createElement("span");
    projectStatus.textContent = ` — ${project.status}`;

    listItem.append(projectName, projectStatus);
    projectList.appendChild(listItem);
  });
}

// Handle form submission.
if (projectForm && nameInput && statusInput) {
  projectForm.addEventListener("submit", function (event) {
  // Stop the browser from submitting and reloading the page.
  event.preventDefault();

  // Read the current values from the form.
  const name = nameInput.value.trim();
  const status = statusInput.value;

  // Do not add a project if its name is empty.
  if (!name) {
    nameInput.focus();
    return;
  }

  // Create a project using the submitted values.
  const project = {
    id: createProjectId(),
    name: name,
    status: status
  };

  // Store the new project in memory.
  projects.push(project);

  // Update the displayed list.
  renderProjects();

  // Prepare the form for the next project.
  projectForm.reset();
  nameInput.focus();
  });
}

// Display the initial empty state.
renderProjects();
