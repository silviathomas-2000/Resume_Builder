export class Academic {
  constructor(qualification, year, college, university, percentage) {
    this.qualification = qualification || "";
    this.year = year || "";
    this.college = college || "";
    this.university = university || "";
    this.percentage = percentage || "";
  }
  toConv() {
    let card = document.createElement("div");
    card.className = "academic-card";

    if (this.qualification) {
      card.innerHTML += `<p><b>${this.qualification}</b></p>`;
    }
    if (this.year) {
      card.innerHTML += `<p>${this.year}</p>`;
    }
    if (this.college) {
      card.innerHTML += `<p>${this.college}</p>`;
    }
    if (this.university) {
      card.innerHTML += `<p>${this.university}</p>`;
    }
    if (this.percentage) {
      card.innerHTML += `<p><b>${this.percentage}</b></p>`;
    }

    let removeButton = document.createElement("button");
    removeButton.textContent = "✗";
    removeButton.onclick = () => {
      AcademicManager.removeAcademic(this, card);
    };

    card.appendChild(removeButton);
    return card;
  }
}

export class AcademicManager {
  static saveAcademicDetails(academic) {
    let academicDetails = JSON.parse(sessionStorage.getItem("academic")) || [];
    academicDetails.push(academic);
    sessionStorage.setItem("academic", JSON.stringify(academicDetails));
  }

  static loadAcademic() {
    let academicDetails = JSON.parse(sessionStorage.getItem("academic")) || [];
    academicDetails.forEach((academicData) => {
      let academic = new Academic(
        academicData.qualification,
        academicData.year,
        academicData.college,
        academicData.university,
        academicData.percentage
      );
      AcademicManager.displayAcademicCard(academic);
    });
  }

  static displayAcademicCard(academic) {
    let cardDisplay = document.getElementById("academic-display");
    let card = academic.toConv();
    cardDisplay.appendChild(card);
  }

  static removeAcademic(academic, cardElement) {
    let academicDetails = JSON.parse(sessionStorage.getItem("academic")) || [];
    academicDetails = academicDetails.filter(
      (c) => JSON.stringify(c) !== JSON.stringify(academic)
    );
    sessionStorage.setItem("academic", JSON.stringify(academicDetails));
    cardElement.remove();
  }
}
export function onAcademicClick() {
  document.getElementById("academic-form-section").className =
    "academic-form-section show";
  document.getElementById("academic-error").textContent = "";
}

export function cancelAcademicForm() {
  document.getElementById("academic-form-section").className =
    "academic-form-section hide";
  document.getElementById("academic-error").textContent = "";
}

export function submitAcademicForm() {
  let qualification = document.getElementById("qualification-input").value;
  let year = document.getElementById("year-input").value;
  let college = document.getElementById("college-input").value;
  let university = document.getElementById("university-input").value;
  let percentage = document.getElementById("percentage-input").value;

  if (qualification || year || college || university || percentage) {
    let academic = new Academic(
      qualification,
      year,
      college,
      university,
      percentage
    );
    AcademicManager.saveAcademicDetails(academic);
    AcademicManager.displayAcademicCard(academic);
    cancelAcademicForm();
  } else {
    document.getElementById("academic-error").textContent =
      "Please fill in at least one field.";
  }
}
