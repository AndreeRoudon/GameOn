// Fonction de la nav
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
// Elements Modal open and close
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const fermer = document.querySelectorAll(".fermer");

// Elements formulaire input
const form = document.getElementById("form");
const formData = document.querySelectorAll(".formData");
const textControl = document.querySelectorAll(".text-control");
const checkbox1 = document.getElementById('checkbox1');
const btnSubmit = document.querySelector('.btn-submit');

// Elements confirm message
const modalBody = document.querySelector(".modal-body");
const confirmation = document.querySelector(".confirmationMessage");

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


form.addEventListener('submit', e => {
  // Empêche le comportement par défaut du formulaire (rechargement de la page)
  e.preventDefault();
  // Vérifie le formulaire
  if (formVerify()) {
    confirmationMessage();
  }
});

// Affiche le message de confirmation
function confirmationMessage() {
  modalBody.style.display = "none";
  confirmation.style.display = "block";
}

function formVerify() {
  // Tableau des fonctions de validation pour chaque champ du formulaire
  const validationFunctions = [
    { input: textControl[0], emptyMessage: "Ce champ ne peut pas être vide", invalidMessage: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.", validationFunction: validateIdentifier },
    { input: textControl[1], emptyMessage: "Ce champ ne peut pas être vide", invalidMessage: "Veuillez entrer 2 caractères ou plus pour le champ du nom.", validationFunction: validateIdentifier },
    { input: textControl[2], emptyMessage: "Email ne peut pas être vide", invalidMessage: "Email non valide", validationFunction: email_verify },
    { input: textControl[3], emptyMessage: "Vous devez entrez votre date de naissance", invalidMessage: "Vous devez avoir minimum 18 ans !", validationFunction: validateBirthdate },
    { input: textControl[4], emptyMessage: "Vous devez entrer un nombre", invalidMessage: "Vous devez entrer un nombre entre 0 et 99", validationFunction: validateTournamentNum }
  ];

  // Tableau pour stocker les résultats de validation
  const validationResults = validationFunctions.map(validationData => {
    const { input, emptyMessage, invalidMessage, validationFunction } = validationData;
    return validateInput(input, emptyMessage, invalidMessage, validationFunction);
  });

  // Vérification de la sélection de la localisation
  const locationSelection = validateSelection(formData[5]);
  validationResults.push(locationSelection);

  // Vérifie si tous les résultats de validation sont true (le formulaire est valide)
  const isValid = validationResults.every(result => result === true);

  return isValid;
}

function validateInput(input, emptyMessage, invalidMessage, validationFunction = null) {
  const value = input.value.trim();
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');

  // Vérifier si la valeur est vide
  if (value === "") {
    setError(input, small, emptyMessage);
    return false;
  // Vérifier la validation personnalisée si une fonction de validation est fournie
  } else if (validationFunction && !validationFunction(value)) {
    setError(input, small, invalidMessage);
    return false;
  // La valeur est valide
  } else {
    setSuccess(formControl);
    return true;
  }
}

// Fonction error
function setError(input, small, message) {
  small.innerText = message;
  input.parentElement.className = "formData error";
}

// Fonction success
function setSuccess(formControl) {
  formControl.className = "formData success";
}

// Fonction de validation pour le prénom et nom
function validateIdentifier(value) {
  const regex = /^[a-zA-Z]{2,}$/;
  return regex.test(value);
}

// Fonction de validation pour le mail
function email_verify(email) {
  return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(email);
}

// Fonction de validation pour la date de naissance
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

// Fonction de validation pour le nombre de tournoi
function validateTournamentNum(tournamentNum) {
  return tournamentNum !== "" && Number.isInteger(Number(tournamentNum)) && tournamentNum >= 0 && tournamentNum < 100 ;
}

// Fonction de validation pour le choix de ville
function validateSelection(formData) {
  const radioElements = formData.querySelectorAll('input[type="radio"]');

  for (let i = 0; i < radioElements.length; i++) {
    if (radioElements[i].checked) {
      formData.removeAttribute('data-error');
      formData.removeAttribute('data-error-visible');
      return true;
    }
  }

  // Aucune option n'est sélectionnée, afficher le message d'erreur
  const message = "Vous devez choisir une option.";
  formData.setAttribute('data-error', message);
  formData.setAttribute('data-error-visible', 'true');
  return false;
}

// Désactiver ou activer le bouton de soumission par défaut
if (checkbox1.checked){
  btnSubmit.disabled = false;
}else{
  btnSubmit.disabled = true;
}
// Ajouter un écouteur d'événements sur le changement de la case à cocher
checkbox1.addEventListener('change', function () {
  btnSubmit.disabled = !checkbox1.checked;
});