function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const fermer = document.querySelectorAll(".fermer");
// launch and close modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
fermer.forEach((btn) => btn.addEventListener("click", closeModal));
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
}

/**********************************************************************/
const form = document.getElementById("form");
const formData = document.querySelectorAll(".formData");
const textControl = document.querySelectorAll(".text-control");
const checkbox1 = document.getElementById('checkbox1');
const btnSubmit = document.querySelector('.btn-submit');

form.addEventListener('submit', e => {
  e.preventDefault();
  if (formVerify()) {
    ConfirmationMessage();
  }
});

function formVerify() {
  const validationFunctions = [
    { input: textControl[0], emptyMessage: "Ce champ ne peut pas être vide", invalidMessage: "Veuillez entrer seulement des consonnes ou des voyelles", validationFunction: validateIdentifier },
    { input: textControl[1], emptyMessage: "Ce champ ne peut pas être vide", invalidMessage: "Veuillez entrer seulement des consonnes ou des voyelles", validationFunction: validateIdentifier },
    { input: textControl[2], emptyMessage: "Email ne peut pas être vide", invalidMessage: "Email non valide", validationFunction: email_verify },
    { input: textControl[3], emptyMessage: "Vous devez entrez votre date de naissance", invalidMessage: "Vous devez avoir minimum 18 ans !", validationFunction: validateBirthdate },
    { input: textControl[4], emptyMessage: "Vous devez entrer un nombre", invalidMessage: "Vous devez entrer un nombre entre 0 et 99", validationFunction: validateTournamentNum }
  ];

  const validationResults = validationFunctions.map(validationData => {
    const { input, emptyMessage, invalidMessage, validationFunction } = validationData;
    return validateInput(input, emptyMessage, invalidMessage, validationFunction);
  });

  const locationSelection = validateSelection(formData[5]);
  validationResults.push(locationSelection);

  const isValid = validationResults.every(result => result === true);

  return isValid;
}

function validateInput(input, emptyMessage, invalidMessage, validationFunction = null) {
  const value = input.value.trim();
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');

  if (value === "") {
    setError(input, small, emptyMessage);
    return false;
  } else if (validationFunction && !validationFunction(value)) {
    setError(input, small, invalidMessage);
    return false;
  } else {
    setSuccess(formControl);
    return true;
  }
}

function setError(input, small, message) {
  small.innerText = message;
  input.parentElement.className = "formData error";
}

function setSuccess(formControl) {
  formControl.className = "formData success";
}

function validateIdentifier(value) {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(value);
}

function email_verify(email) {
  return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(email);
}

function validateBirthdate(birthDate) {
  const selectedDate = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - selectedDate.getFullYear();

  return age >= 18 ||
    (age === 18 && (
      today.getMonth() > selectedDate.getMonth() ||
      (today.getMonth() === selectedDate.getMonth() && today.getDate() >= selectedDate.getDate())
    ));
}

function validateTournamentNum(tournamentNum) {
  return tournamentNum !== "" && Number.isInteger(Number(tournamentNum)) && tournamentNum >= 0 && tournamentNum < 100  ;
}

function validateSelection(formData) {
  const radioElements = formData.querySelectorAll('input[type="radio"]');

  for (let i = 0; i < radioElements.length; i++) {
    if (radioElements[i].checked) {
      formData.removeAttribute('data-error');
      formData.removeAttribute('data-error-visible');
      return true;
    }
  }
  const message = "Vous devez choisir une option.";
  formData.setAttribute('data-error', message);
  formData.setAttribute('data-error-visible', 'true');
  return false;
}

btnSubmit.disabled = true;
checkbox1.addEventListener('change', function () {
  btnSubmit.disabled = !checkbox1.checked;
});

/**************************************************************************************************/
const modalBody = document.querySelector(".modal-body");
const confirmation = document.querySelector(".confirmationMessage");

function ConfirmationMessage() {
  modalBody.style.display = "none";
  confirmation.style.display = "block";
}
