export class Certification {
  constructor(name, institution, date) {
    this.name = name || "";
    this.institution = institution || "";
    this.date = date || "";
  }
  toConv() {
    let card = document.createElement("div");
    card.className = "cert-card";

    if (this.name) {
      card.innerHTML += `<p><b>${this.name}</b></p>`;
    }
    if (this.institution) {
      card.innerHTML += `<p>${this.institution}</p>`;
    }
    if (this.date) {
      card.innerHTML += `<p>${this.date}</p>`;
    }

    let removeButton = document.createElement("button");
    removeButton.textContent = "✗";
    removeButton.onclick = () => {
      CertificationManager.removeCertification(this, card);
    };

    card.appendChild(removeButton);
    return card;
  }
}

export class CertificationManager {
  static saveCertificationDetails(certification) {
    let certificationDetails =
      JSON.parse(sessionStorage.getItem("certifications")) || [];
    certificationDetails.push(certification);
    sessionStorage.setItem(
      "certifications",
      JSON.stringify(certificationDetails)
    );
  }

  static loadCertifications() {
    let certificationDetails =
      JSON.parse(sessionStorage.getItem("certifications")) || [];

    certificationDetails.forEach((certificationData) => {
      let certification = new Certification(
        certificationData.name,
        certificationData.institution,
        certificationData.date
      );
      CertificationManager.displayCertificationCard(certification);
    });
  }

  static displayCertificationCard(certification) {
    let certificationDisplay = document.getElementById("certification-display");
    let card = certification.toConv();
    certificationDisplay.appendChild(card);
  }

  static removeCertification(certification, cardElement) {
    let certificationDetails =
      JSON.parse(sessionStorage.getItem("certifications")) || [];
    certificationDetails = certificationDetails.filter(
      (c) => JSON.stringify(c) !== JSON.stringify(certification)
    );
    sessionStorage.setItem(
      "certifications",
      JSON.stringify(certificationDetails)
    );
    cardElement.remove();
  }
}

export function onCertificationClick() {
  document.getElementById("certification-form-section").className =
    "certification-form-section show";
  document.getElementById("certification-error").textContent = "";
}

export function cancelCertificationForm() {
  document.getElementById("certification-form-section").className =
    "certification-form-section hide";
  document.getElementById("certification-error").textContent = "";
}

export function submitCertificationForm() {
  let name = document.getElementById("certification-name-input").value;
  let institution = document.getElementById("institution-name-input").value;
  let date = document.getElementById("certification-date-input").value;

  if (name || institution || date) {
    let certification = new Certification(name, institution, date);
    CertificationManager.saveCertificationDetails(certification);
    CertificationManager.displayCertificationCard(certification);
    cancelCertificationForm();
  } else {
    document.getElementById("certification-error").textContent =
      "Please fill in at least one field.";
  }
}
