export class Strength {
  constructor(strength1, strenght2) {
    this.strength1 = strength1 || "";
    this.strenght2 = strenght2 || "";
  }
  toConv() {
    let card = document.createElement("div");
    card.className = "strength-card";

    if (this.strength1) {
      card.innerHTML += `<p><b>${this.strength1}</b></p>`;
    }
    if (this.strenght2) {
      card.innerHTML += `<p>${this.strenght2}</p>`;
    }

    let removeButton = document.createElement("button");
    removeButton.textContent = "✗";
    removeButton.onclick = () => {
      StrengthManager.removeStrength(this, card);
    };

    card.appendChild(removeButton);
    return card;
  }
}

export class StrengthManager {
  static saveStrengthDetails(strength) {
    let strengthDetails = JSON.parse(sessionStorage.getItem("strength")) || [];
    strengthDetails.push({
      strength1: strength.strength1,
      strenght2: strength.strenght2,
    });
    sessionStorage.setItem("strength", JSON.stringify(strengthDetails));
  }

  static loadStrength() {
    let strengthDetails = JSON.parse(sessionStorage.getItem("strength")) || [];

    strengthDetails.forEach((strengthData) => {
      let strength = new Strength(
        strengthData.strength1,
        strengthData.strenght2
      );
      StrengthManager.displayStrengthCard(strength);
    });
  }

  static displayStrengthCard(strength) {
    let strengthDisplay = document.getElementById("strength-display");
    let card = strength.toConv();
    strengthDisplay.appendChild(card);
  }

  static removeStrength(strength, cardElement) {
    let strengthDetails = JSON.parse(sessionStorage.getItem("strength")) || [];
    strengthDetails = strengthDetails.filter(
      (c) =>
        JSON.stringify(c) !==
        JSON.stringify({
          strength1: strength.strength1,
          strenght2: strength.strenght2,
        })
    );
    sessionStorage.setItem("strength", JSON.stringify(strengthDetails));
    cardElement.remove();
  }
}

export function onStrengthClick() {
  document.getElementById("strength-form-section").className =
    "strength-form-section show";
  document.getElementById("strength-error").textContent = "";
}

export function cancelStrengthForm() {
  document.getElementById("strength-form-section").className =
    "strength-form-section hide";
  document.getElementById("strength-error").textContent = "";
}

export function submitStrengthForm() {
  let strength1 = document.getElementById("strength-name-input").value;
  let strength2 = document.getElementById("strength2-name-input").value;

  if (strength1 || strength2) {
    let strength = new Strength(strength1, strength2);
    StrengthManager.saveStrengthDetails(strength);
    StrengthManager.displayStrengthCard(strength);
    cancelStrengthForm();
  } else {
    document.getElementById("strength-error").textContent =
      "Please fill in at least one field.";
  }
}
