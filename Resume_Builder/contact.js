export class Contact {
  constructor(phone, email, addressLine1, addressLine2, linkedin) {
    this.phone = phone || "";
    this.email = email || "";
    this.addressLine1 = addressLine1 || "";
    this.addressLine2 = addressLine2 || "";
    this.linkedin = linkedin || "";
  }

  toConv() {
    let card = document.createElement("div");
    card.className = "contact-card";

    if (this.phone) {
      card.innerHTML += `<p><i class="fas fa-phone" style="color:Gray"></i>&nbsp${this.phone}</p>`;
    }
    if (this.email) {
      card.innerHTML += `<p><i class="fas fa-envelope" style="color:Gray"></i>&nbsp${this.email}</p>`;
    }
    if (this.addressLine1) {
      card.innerHTML += `<p><i class="fas fa-home" style="color:Gray"></i>&nbsp${this.addressLine1}</p>`;
    }
    if (this.addressLine2) {
      card.innerHTML += `<p>${this.addressLine2}</p>`;
    }
    if (this.linkedin) {
      card.innerHTML += `<p><i class="fab fa-linkedin" style="color:Gray"></i>&nbsp<a href="${this.linkedin}" target="_blank">${this.linkedin}</a></p>`;
    }

    let removeButton = document.createElement("button");
    removeButton.textContent = "✗";
    removeButton.addEventListener("click", () => {
      ContactManager.removeContact(this, card);
    });

    card.appendChild(removeButton);
    return card;
  }
}

export class ContactManager {
  static saveContactDetails(contact) {
    let contactDetails = JSON.parse(sessionStorage.getItem("contacts")) || [];
    contactDetails.push({
      phone: contact.phone,
      email: contact.email,
      addressLine1: contact.addressLine1,
      addressLine2: contact.addressLine2,
      linkedin: contact.linkedin,
    });
    sessionStorage.setItem("contacts", JSON.stringify(contactDetails));
  }

  static loadContacts() {
    let contactDetails = JSON.parse(sessionStorage.getItem("contacts")) || [];
    contactDetails.forEach((contactData) => {
      let contact = new Contact(
        contactData.phone,
        contactData.email,
        contactData.addressLine1,
        contactData.addressLine2,
        contactData.linkedin
      );
      ContactManager.displayContactCard(contact);
    });
  }

  static displayContactCard(contact) {
    let cardDisplay = document.getElementById("card-display");
    let card = contact.toConv();
    cardDisplay.appendChild(card);
  }

  static removeContact(contact, cardElement) {
    let contactDetails = JSON.parse(sessionStorage.getItem("contacts")) || [];
    contactDetails = contactDetails.filter(
      (c) =>
        JSON.stringify(c) !==
        JSON.stringify({
          phone: contact.phone,
          email: contact.email,
          addressLine1: contact.addressLine1,
          addressLine2: contact.addressLine2,
          linkedin: contact.linkedin,
        })
    );
    sessionStorage.setItem("contacts", JSON.stringify(contactDetails));
    cardElement.remove();
  }
}

export function onContactClick() {
  document.getElementById("contact-form-section").className =
    "contact-form-section show";
  document.getElementById("contact-error").textContent = "";
}

export function cancelContactForm() {
  document.getElementById("contact-form-section").className =
    "contact-form-section hide";
  document.getElementById("contact-error").textContent = "";
}

export function submitContactForm() {
  let phone = document.getElementById("phone-input").value;
  let email = document.getElementById("email-input").value;
  let addressLine1 = document.getElementById("address-line1-input").value;
  let addressLine2 = document.getElementById("address-line2-input").value;
  let linkedin = document.getElementById("linkedin-input").value;

  if (phone || email || addressLine1 || addressLine2 || linkedin) {
    let contact = new Contact(
      phone,
      email,
      addressLine1,
      addressLine2,
      linkedin
    );
    ContactManager.saveContactDetails(contact);
    ContactManager.displayContactCard(contact);
    cancelContactForm();
  } else {
    document.getElementById("contact-error").textContent =
      "Please fill in at least one field.";
  }
}
