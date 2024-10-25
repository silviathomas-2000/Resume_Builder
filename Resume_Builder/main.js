
import { cancelContactForm, Contact, ContactManager, onContactClick, submitContactForm } from "./contact.js";
import {  cancelSkillForm , Skill, SkillManager ,  onSkillClick, submitSkillForm} from "./skill.js";
import {  cancelStrengthForm , Strength, StrengthManager ,  onStrengthClick, submitStrengthForm} from "./strength.js";
import {  cancelCertificationForm , Certification, CertificationManager ,  onCertificationClick, submitCertificationForm} from "./certification.js";
import {  cancelObjectiveForm , Objective, ObjectiveManager ,  onObjectiveClick, submitObjectiveForm} from "./objective.js";
import {  cancelAcademicForm , Academic, AcademicManager ,  onAcademicClick, submitAcademicForm} from "./academic.js";
import {  cancelProjectForm , Project, ProjectManager ,  onProjectClick, submitProjectForm} from "./project.js";
import {  cancelInternshipForm , Internship, InternshipManager ,  onInternshipClick, submitInternshipForm} from "./internship.js";
import {  cancelNameForm , Name, NameManager ,  onNameClick, submitNameForm} from "./name.js";


// document.getElementById("print-button").addEventListener("click", function() {
//   window.print();
// });

document.addEventListener("DOMContentLoaded", () => {
  NameManager.loadName();

  document.getElementById("nameid").addEventListener("click", onNameClick);
  document.getElementById("name-submit-btn").addEventListener("click", submitNameForm);
  document.getElementById("name-cancel-btn").addEventListener("click", cancelNameForm);
});



document.addEventListener("DOMContentLoaded", () => {
  ContactManager.loadContacts();

  document
    .getElementById("contactid")
    .addEventListener("click", onContactClick);
  document
    .getElementById("contact-submit-btn")
    .addEventListener("click", submitContactForm);
  document
    .getElementById("contact-cancel-btn")
    .addEventListener("click", cancelContactForm);
});

document.addEventListener("DOMContentLoaded", () => {
  SkillManager.loadSkill();
  document.getElementById("skillid").addEventListener("click", onSkillClick);
  document
    .getElementById("skill-submit-btn")
    .addEventListener("click", submitSkillForm);
  document
    .getElementById("skill-cancel-btn")
    .addEventListener("click", cancelSkillForm);
});

document.addEventListener("DOMContentLoaded", () => {
  CertificationManager.loadCertifications();
  document
    .getElementById("certificationid")
    .addEventListener("click", onCertificationClick);
  document
    .getElementById("certification-submit-btn")
    .addEventListener("click", submitCertificationForm);
  document
    .getElementById("certification-cancel-btn")
    .addEventListener("click", cancelCertificationForm);
});

document.addEventListener("DOMContentLoaded", () => {
  StrengthManager.loadStrength();
  document
    .getElementById("strengthid")
    .addEventListener("click", onStrengthClick);
  document
    .getElementById("strength-submit-btn")
    .addEventListener("click", submitStrengthForm);
  document
    .getElementById("strength-cancel-btn")
    .addEventListener("click", cancelStrengthForm);
});

document.addEventListener("DOMContentLoaded", () => {
  ObjectiveManager.loadObjective();
  document
    .getElementById("objectiveid")
    .addEventListener("click", onObjectiveClick);
  document
    .getElementById("objective-submit-btn")
    .addEventListener("click", submitObjectiveForm);
  document
    .getElementById("objective-cancel-btn")
    .addEventListener("click", cancelObjectiveForm);
});

document.addEventListener("DOMContentLoaded", () => {
  AcademicManager.loadAcademic();
  document
    .getElementById("academicid")
    .addEventListener("click", onAcademicClick);
  document
    .getElementById("academic-submit-btn")
    .addEventListener("click", submitAcademicForm);
  document
    .getElementById("academic-cancel-btn")
    .addEventListener("click", cancelAcademicForm);
});

document.addEventListener("DOMContentLoaded", () => {
  ProjectManager.loadProject();
  document
    .getElementById("projectid")
    .addEventListener("click", onProjectClick);
  document
    .getElementById("project-submit-btn")
    .addEventListener("click", submitProjectForm);
  document
    .getElementById("project-cancel-btn")
    .addEventListener("click", cancelProjectForm);
});

document.addEventListener("DOMContentLoaded", () => {
  InternshipManager.loadInternship();
  document
    .getElementById("internshipid")
    .addEventListener("click", onInternshipClick);
  document
    .getElementById("internship-submit-btn")
    .addEventListener("click", submitInternshipForm);
  document
    .getElementById("internship-cancel-btn")
    .addEventListener("click", cancelInternshipForm);
});
        
  





