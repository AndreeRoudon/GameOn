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
const close = document.querySelector(".close");

// launch and close modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
close.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
}

/**********************************************************************/

//Dom Elements form
const form = document.getElementById("form");
const formData = document.querySelectorAll(".formData");
const textControl = document.querySelectorAll(".text-control");

//Events submit form 
form.addEventListener('submit', e => {
  e.preventDefault();
  formVerify();
});

function formVerify() {
  const firstName = textControl[0].value.trim();
  const lastName = textControl[1].value.trim();
  const email = textControl[2].value.trim();
  const birthDate = textControl[3].value.trim();
  const tournamentNum = textControl[4].value.trim();

  // fistName verify
  if (firstName === "") {
    let message = "Ce champ ne peut pas être vide";
    setError(textControl[0], message);
  }
  else {
    let letterNum = firstName.length;
    if (letterNum < 2) {
      let message = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
      setError(textControl[0], message)
    } else {
      setSuccess(textControl[0]);
    }
  }

  // lastName verify
  if (lastName === "") {
    let message = "Ce champ ne peut pas être vide";
    setError(textControl[1], message);
  }
  else {
    let letterNum = lastName.length;
    if (letterNum < 2) {
      let message = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
      setError(textControl[1], message)
    } else {
      setSuccess(textControl[1]);
    }
  }
  // email verify
  if (email === "") {
    let message = "Email ne peut pas être vide";
    setError(textControl[2], message);
  } else if (!email_verify(email)) {
    let message = "Email non valide";
    setError(textControl[2], message);
  } else {
    setSuccess(textControl[2])
  }

  // Birthdate verify
  if (birthDate === "") {
    let message = "Vous devez entrez votre date de naissance";
    setError(textControl[3], message);
  } else if (!validateBirthdate(birthDate)) {
    let message = "Vous devez avoir minimum 18 ans !"
    setError(textControl[3], message);
  } else {
    setSuccess(textControl[3]);
  }

  // Tournament Number verify
  if (tournamentNum === "") {
    let message = "Vous devez entrer un nombre";
    setError(textControl[4], message);
  }
  else if (tournamentNum >= 100 || tournamentNum < 0) {
    let message = "Vous devez entrer un nombre entre 0 et 99";
    setError(textControl[4], message);
  }
  // il manque une condition pour pas rentrer des nombres à virgules
  else {
    setSuccess(textControl[4]);
  }

  // Participation au tournoi
  const locationSelection = validateSelection();
  if (!locationSelection) {
    let message = "Vous devez choisir une option.";
    formData[5].setAttribute('data-error', message);
    formData[5].setAttribute('data-error-visible', 'true');
  }
  else {
    formData[5].removeAttribute('data-error');
    formData[5].removeAttribute('data-error-visible');
  }
}

// Fonction error
function setError(elem, message) {
  const formControl = elem.parentElement;
  const small = formControl.querySelector('small');

  // Ajout du message d'erreur
  small.innerText = message;

  // Ajout de la class error
  formControl.className = "formData error";
}

// Fonction success
function setSuccess(elem) {
  const formControl = elem.parentElement;
  formControl.className = "formData success";
}

// Fonction verif mail
function email_verify(elem) {
  return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(elem);
}

// Fonction de validation
function validateBirthdate(elem) {

  // Créer une date à partir de la valeur du champ de date de naissance
  let selectedDate = new Date(elem);

  // Obtenir la date d'aujourd'hui
  let today = new Date();

  // Calculer la différence en années entre la date d'aujourd'hui et la date sélectionnée
  let age = today.getFullYear() - selectedDate.getFullYear();

  // Vérifier si l'utilisateur a au moins 18 ans
  if (age < 18 || (age === 18 && (today.getMonth() < selectedDate.getMonth() || (today.getMonth() === selectedDate.getMonth() && today.getDate() < selectedDate.getDate())))) {
    return false;
  } else {
    return true;
  }
}

// Fonction pour valider le choix de ville.
function validateSelection() {
  let radioElements = document.querySelectorAll('.formData input[type="radio"]');

  // Parcourir les éléments radio et vérifier s'il y en a au moins un de coché  
  for (let i = 0; i < radioElements.length; i++) {
    if (radioElements[i].checked) {
      // Au moins un élément radio est sélectionné
      return true;
    }
  }

  // Aucun élément radio n'est sélectionné
  return false;
}

// coche checked verify
// Sélectionner les éléments nécessaires
let checkbox1 = document.getElementById('checkbox1');
let btnSubmit = document.querySelector('.btn-submit');
btnSubmit.disabled = true;

// Ajouter un écouteur d'événements sur le premier bouton
checkbox1.addEventListener('change', function () {
  // Vérifier si le premier bouton est coché
  if (checkbox1.checked) {
    // Activer le bouton "C'est parti"
    btnSubmit.disabled = false;
  } else {
    // Désactiver le bouton "C'est parti"
    btnSubmit.disabled = true;
  }
});

/*
function setError(elem, message) {
  elem.dataset.error = message; // Définit la valeur de l'attribut data-error sur l'élément input
  
  if (message) {
    elem.dataset.errorVisible = true; // Définit la valeur de l'attribut data-error-visible sur true
  } else {
    delete elem.dataset.errorVisible; // Supprime l'attribut data-error-visible s'il n'y a pas d'erreur
  }
}
*/