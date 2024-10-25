export class Skill {
  constructor(title, desc) {
    this.title = title || "";
    this.desc = desc || "";
  }

  toConv() {
    let card = document.createElement("div");
    card.className = "skill-card";

    if (this.title) {
      card.innerHTML += `<p><b>${this.title}</b></p>`;
    }
    if (this.desc) {
      card.innerHTML += `<p>${this.desc}</p>`;
    }

    let removeButton = document.createElement("button");
    removeButton.textContent = "✗";
    removeButton.addEventListener("click", () => {
      SkillManager.removeSkill(this, card);
    });

    card.appendChild(removeButton);
    return card;
  }
}

export class SkillManager {
  static saveSkillDetails(skill) {
    let skillDetails = JSON.parse(sessionStorage.getItem("skills")) || [];
    skillDetails.push({
      title: skill.title,
      desc: skill.desc,
    });
    sessionStorage.setItem("skills", JSON.stringify(skillDetails));
  }

  static loadSkill() {
    let skillDetails = JSON.parse(sessionStorage.getItem("skills")) || [];
    skillDetails.forEach((skillData) => {
      let skill = new Skill(skillData.title, skillData.desc);
      SkillManager.displaySkillCard(skill);
    });
  }

  static displaySkillCard(skill) {
    let skillDisplay = document.getElementById("skill-display");
    let card = skill.toConv();
    skillDisplay.appendChild(card);
  }

  static removeSkill(skill, cardElement) {
    let skillDetails = JSON.parse(sessionStorage.getItem("skills")) || [];
    skillDetails = skillDetails.filter(
      (s) =>
        JSON.stringify(s) !==
        JSON.stringify({
          title: skill.title,
          desc: skill.desc,
        })
    );
    sessionStorage.setItem("skills", JSON.stringify(skillDetails));
    cardElement.remove();
  }
}
export function onSkillClick() {
  document.getElementById("skill-form-section").className =
    "skill-form-section show";
  document.getElementById("skill-error").textContent = "";
}

export function cancelSkillForm() {
  document.getElementById("skill-form-section").className =
    "skill-form-section hide";
  document.getElementById("skill-error").textContent = "";
}

export function submitSkillForm() {
  let title = document.getElementById("title-input").value;
  let desc = document.getElementById("description-input").value;

  if (title || desc) {
    let skill = new Skill(title, desc);
    SkillManager.saveSkillDetails(skill);
    SkillManager.displaySkillCard(skill);
    cancelSkillForm();
  } else {
    document.getElementById("skill-error").textContent =
      "Please fill in at least one field.";
  }
}
