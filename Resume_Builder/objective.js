export class Objective {
  constructor(objective1) {
    this.objective1 = objective1 || "";
  }
  toConv() {
    let card = document.createElement("div");
    card.className = "objective-card";

    if (this.objective1) {
      card.innerHTML += `<p><b>${this.objective1}</b></p>`;
    }

    let removeButton = document.createElement("button");
    removeButton.textContent = "✗";
    removeButton.onclick = () => {
      ObjectiveManager.removeObjective(this, card);
    };

    card.appendChild(removeButton);
    return card;
  }
}

export class ObjectiveManager {
  static saveObjectiveDetails(objective) {
    let objectiveDetails =
      JSON.parse(sessionStorage.getItem("objective")) || [];
    objectiveDetails.push({ objective1: objective.objective1 });
    sessionStorage.setItem("objective", JSON.stringify(objectiveDetails));
  }

  static loadObjective() {
    let objectiveDetails =
      JSON.parse(sessionStorage.getItem("objective")) || [];

    objectiveDetails.forEach((objectiveData) => {
      let objective = new Objective(objectiveData.objective1);
      ObjectiveManager.displayObjectiveCard(objective);
    });
  }

  static displayObjectiveCard(objective) {
    let objectiveDisplay = document.getElementById("objective-display");
    let card = objective.toConv();
    objectiveDisplay.appendChild(card);
  }

  static removeObjective(objective, cardElement) {
    let objectiveDetails =
      JSON.parse(sessionStorage.getItem("objective")) || [];
    objectiveDetails = objectiveDetails.filter(
      (c) =>
        JSON.stringify(c) !==
        JSON.stringify({ objective1: objective.objective1 })
    );
    sessionStorage.setItem("objective", JSON.stringify(objectiveDetails));
    cardElement.remove();
  }
}

export function onObjectiveClick() {
  document.getElementById("objective-form-section").className =
    "objective-form-section show";
  document.getElementById("objective-error").textContent = "";
}

export function cancelObjectiveForm() {
  document.getElementById("objective-form-section").className =
    "objective-form-section hide";
  document.getElementById("objective-error").textContent = "";
}

export function submitObjectiveForm() {
  let objective1 = document.getElementById("objective-input").value;

  if (objective1) {
    let objective = new Objective(objective1);
    ObjectiveManager.saveObjectiveDetails(objective);
    ObjectiveManager.displayObjectiveCard(objective);
    cancelObjectiveForm();
  } else {
    document.getElementById("objective-error").textContent =
      "Please fill in at least one field.";
  }
}
