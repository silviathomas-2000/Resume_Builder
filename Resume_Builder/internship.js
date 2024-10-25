export class Internship {
  constructor(internshipname, duration, institution) {
    this.internshipname = internshipname || "";
    this.duration = duration || "";
    this.institution = institution || "";
  }
  toConv() {
    let card = document.createElement("div");
    card.className = "institution-card";

    if (this.internshipname) {
      card.innerHTML += `<p><b>${this.internshipname}</b></p>`;
    }
    if (this.duration) {
      card.innerHTML += `<p>${this.duration}</p>`;
    }
    if (this.institution) {
      card.innerHTML += `<p>${this.institution}</p>`;
    }

    let removeButton = document.createElement("button");
    removeButton.textContent = "✗";
    removeButton.onclick = () => {
      InternshipManager.removeInternship(this, card);
    };

    card.appendChild(removeButton);
    return card;
  }
}

export class InternshipManager {
  static saveInternshipDetails(internship) {
    let internshipDetails =
      JSON.parse(sessionStorage.getItem("internship")) || [];
    internshipDetails.push(internship);
    sessionStorage.setItem("internship", JSON.stringify(internshipDetails));
  }

  static loadInternship() {
    let internshipDetails =
      JSON.parse(sessionStorage.getItem("internship")) || [];
    internshipDetails.forEach((internshipData) => {
      let internship = new Internship(
        internshipData.internshipname,
        internshipData.duration,
        internshipData.institution
      );
      InternshipManager.displayInternshipCard(internship);
    });
  }

  static displayInternshipCard(internship) {
    let cardDisplay = document.getElementById("internship-display");
    let card = internship.toConv();
    cardDisplay.appendChild(card);
  }

  static removeInternship(internship, cardElement) {
    let internshipDetails =
      JSON.parse(sessionStorage.getItem("internship")) || [];
    internshipDetails = internshipDetails.filter(
      (c) => JSON.stringify(c) !== JSON.stringify(internship)
    );
    sessionStorage.setItem("internship", JSON.stringify(internshipDetails));
    cardElement.remove();
  }
}

export function onInternshipClick() {
  document.getElementById("internship-form-section").className =
    "internship-form-section show";
  document.getElementById("internship-error").textContent = "";
}

export function cancelInternshipForm() {
  document.getElementById("internship-form-section").className =
    "internship-form-section hide";
  document.getElementById("internship-error").textContent = "";
}

export function submitInternshipForm() {
  let internshipname = document.getElementById("name-input").value;
  let duration = document.getElementById("duration-input").value;
  let institution = document.getElementById("institution-input").value;

  if (internshipname || duration || institution) {
    let internship = new Internship(internshipname, duration, institution);
    InternshipManager.saveInternshipDetails(internship);
    InternshipManager.displayInternshipCard(internship);
    cancelInternshipForm();
  } else {
    document.getElementById("internship-error").textContent =
      "Please fill in at least one field.";
  }
}
