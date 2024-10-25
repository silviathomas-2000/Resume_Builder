export class Project {
  constructor(projectname, description, language) {
    this.projectname = projectname || "";
    this.description = description || "";
    this.language = language || "";
  }
  toConv() {
    let card = document.createElement("div");
    card.className = "project-card";

    if (this.projectname) {
      card.innerHTML += `<p><b>${this.projectname}</b></p>`;
    }
    if (this.description) {
      card.innerHTML += `<p>${this.description}</p>`;
    }
    if (this.language) {
      card.innerHTML += `<p>${this.language}</p>`;
    }

    let removeButton = document.createElement("button");
    removeButton.textContent = "✗";
    removeButton.onclick = () => {
      ProjectManager.removeProject(this, card);
    };

    card.appendChild(removeButton);
    return card;
  }
}

export class ProjectManager {
  static saveProjectDetails(project) {
    let projectDetails = JSON.parse(sessionStorage.getItem("project")) || [];
    projectDetails.push(project);
    sessionStorage.setItem("project", JSON.stringify(projectDetails));
  }

  static loadProject() {
    let projectDetails = JSON.parse(sessionStorage.getItem("project")) || [];
    projectDetails.forEach((projectData) => {
      let project = new Project(
        projectData.projectname,
        projectData.description,
        projectData.language
      );
      ProjectManager.displayProjectCard(project);
    });
  }

  static displayProjectCard(project) {
    let cardDisplay = document.getElementById("project-display");
    let card = project.toConv();
    cardDisplay.appendChild(card);
  }

  static removeProject(project, cardElement) {
    let projectDetails = JSON.parse(sessionStorage.getItem("project")) || [];
    projectDetails = projectDetails.filter(
      (c) => JSON.stringify(c) !== JSON.stringify(project)
    );
    sessionStorage.setItem("project", JSON.stringify(projectDetails));
    cardElement.remove();
  }
}

export function onProjectClick() {
  document.getElementById("project-form-section").className =
    "project-form-section show";
  document.getElementById("project-error").textContent = "";
}

export function cancelProjectForm() {
  document.getElementById("project-form-section").className =
    "project-form-section hide";
  document.getElementById("project-error").textContent = "";
}

export function submitProjectForm() {
  let projectname = document.getElementById("projectname-input").value;
  let description = document.getElementById("descriptionpro-input").value;
  let language = document.getElementById("language-input").value;

  if (projectname || description || language) {
    let project = new Project(projectname, description, language);
    ProjectManager.saveProjectDetails(project);
    ProjectManager.displayProjectCard(project);
    cancelProjectForm();
  } else {
    document.getElementById("project-error").textContent =
      "Please fill in at least one field.";
  }
}
