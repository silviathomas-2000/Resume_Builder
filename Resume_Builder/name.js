export class Name {
  constructor(firstname, lastname) {
    this.firstname = firstname || "";
    this.lastname = lastname || "";
  }

  toConv() {
    let card = document.createElement("div");
    card.className = "name-card";

    let nameContainer = document.createElement("div");
    nameContainer.className = "name-container";

    if (this.firstname || this.lastname) {
      let nameContent = document.createElement("span");
      nameContent.className = "name-content";

      if (this.firstname) {
        nameContent.innerHTML += `<b>${this.firstname}</b>`;
      }
      if (this.lastname) {
        if (this.firstname) {
          nameContent.innerHTML += " ";
        }
        nameContent.innerHTML += `${this.lastname}`;
      }

      nameContainer.appendChild(nameContent);
    }

    card.appendChild(nameContainer);

    let removeButton = document.createElement("button");
    removeButton.textContent = "✗";
    removeButton.onclick = () => {
      NameManager.removeName(this, card);
    };

    card.appendChild(removeButton);
    return card;
  }
}

export class NameManager {
  static saveNameDetails(name) {
    let nameDetails = JSON.parse(sessionStorage.getItem("name")) || [];
    nameDetails.push({ firstname: name.firstname, lastname: name.lastname });
    sessionStorage.setItem("name", JSON.stringify(nameDetails));
  }

  static loadName() {
    let nameDetails = JSON.parse(sessionStorage.getItem("name")) || [];
    nameDetails.forEach((nameData) => {
      let name = new Name(nameData.firstname, nameData.lastname);
      NameManager.displayNameCard(name);
    });
  }

  static displayNameCard(name) {
    let cardDisplay = document.getElementById("name-display");
    let card = name.toConv();
    cardDisplay.appendChild(card);
  }

  static removeName(name, cardElement) {
    let nameDetails = JSON.parse(sessionStorage.getItem("name")) || [];
    nameDetails = nameDetails.filter(
      (c) => JSON.stringify(c) !== JSON.stringify({ firstname: name.firstname, lastname: name.lastname })
    );
    sessionStorage.setItem("name", JSON.stringify(nameDetails));
    cardElement.remove();
  }
}

export function onNameClick() {
  document.getElementById("name-form-section").className = "name-form-section show";
  document.getElementById("name-error").textContent = "";
  document.getElementById("nameid").style.display = "none";
}

export function cancelNameForm() {
  document.getElementById("name-form-section").className = "name-form-section hide";
  document.getElementById("name-error").textContent = "";
  document.getElementById("nameid").style.display = "block";
}

export function submitNameForm() {
  let firstname = document.getElementById("firstname-input").value;
  let lastname = document.getElementById("lastname-input").value;

  if (firstname || lastname) {
    let name = new Name(firstname, lastname);
    NameManager.saveNameDetails(name);
    NameManager.displayNameCard(name);
    document.getElementById("name-form-section").className = "name-form-section hide";
    document.getElementById("nameid").style.display = "none";
  } else {
    document.getElementById("name-error").textContent = "Please fill in at least one field.";
  }
}


document.getElementById("nameid").addEventListener("click", onNameClick);
document.getElementById("name-cancel-btn").addEventListener("click", cancelNameForm);
document.getElementById("name-submit-btn").addEventListener("click", submitNameForm);


document.addEventListener("DOMContentLoaded", () => {
  NameManager.loadName();
});
