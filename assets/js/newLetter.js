import {calculerAge} from './calcAge.js';

const emailRegex = /\S+@\S+\.\S+/;
const nomRegex = /^[a-zA-Z\s]+$/;
const prenomRegex = /^[a-zA-Z\s]+$/;
const adresseRegex = /^[a-zA-Z0-9\s,'-]*$/;

// Fonction pour envoyer un e-mail à l'adresse saisie dans le formulaire
async function envoyerCourriel(email, formulaire, data) {
  if (!emailRegex.test(email)) {
    const alerte = `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Adresse e-mail invalide.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    formulaire.insertAdjacentHTML('beforeend', alerte);
    return;
  }

  try {
      const response = await fetch('http://localhost:3000/api/send-email-newletter ', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      nom: data.nom,
      prenom: data.prenom,
      adresse: data.adresse,
      date_naissance: data.date_naissance,
      email: email
    }),
  });


    if (!response.ok) {
      throw new Error(`Erreur lors de l'envoi du courriel: ${response.statusText}`);
    }

    const alerte = `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        Courriel envoyé à ${email}.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    formulaire.insertAdjacentHTML('beforeend', alerte);
  } catch (error) {
    const alerte = `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Erreur lors de l'envoi du courriel : ${error.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    formulaire.insertAdjacentHTML('beforeend', alerte);
  }
}

// Récupération du formulaire et ajout d'un gestionnaire d'événements pour la soumission
const formulaire = document.querySelector('#formulaire-newsletter');
formulaire.addEventListener('submit', (evenement) => {
  evenement.preventDefault(); // Empêcher la soumission du formulaire

  const civiliteValue = formulaire.querySelector('#civilite').value;
  const nomValue = formulaire.querySelector('#nom').value;
  const prenomValue = formulaire.querySelector('#prenom').value;
  const adresseValue = formulaire.querySelector('#adresse').value;
  const dateNaissanceValue = formulaire.querySelector('#date_naissance').value;
  const emailValue = formulaire.querySelector('#email').value;
  const emailConfirmValue = formulaire.querySelector('#email_confirm').value;

  const age = calculerAge(dateNaissanceValue);

  const alerteNom = formulaire.querySelector('#alerte-nom');
  const alertePrenom = formulaire.querySelector('#alerte-prenom');
  const alerteAdresse = formulaire.querySelector('#alerte-adresse');
  const alerteDateNaissance = formulaire.querySelector('#alerte-date_naissance');
  const alerteEmail = formulaire.querySelector('#alerte-email');
  
  if (
    !civiliteValue
    || !nomValue
    || !prenomValue
    || !adresseValue
    || !dateNaissanceValue
    || !emailValue
    || !emailConfirmValue
    || !nomRegex.test(nomValue) 
    || !prenomRegex.test(prenomValue) 
    || !adresseRegex.test(adresseValue) 
    || emailValue !== emailConfirmValue 
    || age < 18
  ) {
      if (!nomValue || !nomRegex.test(nomValue)) {
        alerteNom.style.display = 'block';
      } else {
        alerteNom.style.display = 'none';
      }
      if (!prenomValue || !prenomRegex.test(prenomValue)) {
        alertePrenom.style.display = 'block';
      } else {
        alertePrenom.style.display = 'none';
      }
      if (!adresseValue || !adresseRegex.test(adresseValue)) {
        alerteAdresse.style.display = 'block';
      } else {
        alerteAdresse.style.display = 'none';
      }
      if (!dateNaissanceValue) {
        alerteDateNaissance.style.display = 'block';
      } else {
        alerteDateNaissance.style.display = 'none';
      }
      if (!emailValue || !emailRegex.test(emailValue) || emailValue !== emailConfirmValue) {
        alerteEmail.style.display = 'block';
      } else {
        alerteEmail.style.display = 'none';
      }
  
      const alerte = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          Les informations saisies sont invalides.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
      formulaire.insertAdjacentHTML('beforeend', alerte);
      return;
    }
  

  const data = {
    civilite: civiliteValue,
    nom: nomValue,
    prenom: prenomValue,
    adresse: adresseValue,
    date_naissance: dateNaissanceValue,
  };

  envoyerCourriel(emailValue, formulaire, data);
});