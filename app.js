const form = document.getElementById("form");
const formData = document.querySelectorAll(".formData");
const textControl = document.querySelectorAll(".text-control");
const checkbox1 = document.getElementById('checkbox1');
const btnSubmit = document.querySelector('.btn-submit');

form.addEventListener('submit', e => {
  e.preventDefault();
  formVerify();
});

function formVerify() {
  validateInput(textControl[0], "Ce champ ne peut pas être vide", "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
  validateInput(textControl[1], "Ce champ ne peut pas être vide", "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
  validateInput(textControl[2], "Email ne peut pas être vide", "Email non valide", email_verify);
  validateInput(textControl[3], "Vous devez entrez votre date de naissance", "Vous devez avoir minimum 18 ans !", validateBirthdate);
  validateInput(textControl[4], "Vous devez entrer un nombre", "Vous devez entrer un nombre entre 0 et 99", validateTournamentNum);

  validateSelection(formData[5]);
}

function validateInput(input, emptyMessage, invalidMessage, validationFunction = null) {
  const value = input.value.trim();
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');

  if (value === "") {
    setError(input, small, emptyMessage);
  } else if (validationFunction && !validationFunction(value)) {
    setError(input, small, invalidMessage);
  } else {
    setSuccess(formControl);
  }
}

function setError(input, small, message) {
  small.innerText = message;
  input.parentElement.className = "formData error";
}

function setSuccess(formControl) {
  formControl.className = "formData success";
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
  return tournamentNum !== "" && tournamentNum >= 0 && tournamentNum < 100 && Number.isInteger(Number(tournamentNum));
}

function validateSelection(formData) {
  const radioElements = formData.querySelectorAll('input[type="radio"]');
  const errorSmall = formData.querySelector('small');

  for (let i = 0; i < radioElements.length; i++) {
    if (radioElements[i].checked) {
      formData.removeAttribute('data-error');
      formData.removeAttribute('data-error-visible');
      return;
    }
  }
  const message = "Vous devez choisir une option.";
  errorSmall.innerText = message;
  formData.setAttribute('data-error', message);
  formData.setAttribute('data-error-visible', 'true');
}

checkbox1.addEventListener('change', function () {
  btnSubmit.disabled = !checkbox1.checked;
});