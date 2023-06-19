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

// launch modal event
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
//const formData = document.querySelectorAll(".formData");
const textControl = document.querySelectorAll(".text-control");

//Events submit form 
form.addEventListener('submit', e =>{
  e.preventDefault();
  formVerify();
});

function formVerify(){
  const firstName = textControl[0].value.trim();
  const lastName = textControl[1].value.trim();
  const email = textControl[2].value.trim();
  const dateOfBirth = textControl[3].value.trim();
  const tournamentNum = textControl[4].value.trim();

  // fistName verify
  if (firstName === ""){
    let message = "Ce champ ne peut pas être vide";
    setError(firstName, message);
  }
  else{
    let letterNum = firstName.length;
    if (letterNum < 2) {
        let message ="Veuillez entrer 2 caractères ou plus pour le champ du nom.";
        setError(firstName,message)
    } else {
        setSuccess(firstName);
    }
  }
  // lastName verify
  /*
  if (lastName === ""){
    let message = "Ce champ ne peut pas être vide";
    setError(lastName, message);
  }
  else{
    let letterNum = lastName.length;
    if (letterNum < 2) {
        let message ="Veuillez entrer 2 caractères ou plus pour le champ du nom.";
        setError(lastName,message)
    } else {
        setSuccess(lastName);
    }
  }
  // email verify
  if (emailValue === "") {
      let message = "Email ne peut pas être vide";
      setError(email,message);
  }else if(!email_verify(emailValue)){
      let message = "Email non valide";
      setError(email,message);
  }else{
      setSuccess(email)
  }
  */
}

// Fonction error
function setError(elem, message){
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
  formControl.className = "formData success input";
}

function email_verify(email) {
  return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(email);
}