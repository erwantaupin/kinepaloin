import {keyApi} from '../../accesController.js';
import { listFilm } from "../../accesController.js"; 
import { setFilmDate } from './toolDate.js';
// require('dotenv').config();
//clef d'api
// const API_KEY = process.env.KEY_API;
const API_KEY = keyApi();

//film à l'affiche
// const filmsDotEnv = process.env.LIST_FILM;
// const filmsDAffiche = filmsDotEnv.split(',');
const filmsDAffiche = listFilm();


//recheche dans l'api la liste des films
const fetchFilm = async (titre) => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${titre}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données.');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}   

//return la liste des films
const createFilmCard = (film) => {
  const filmDate = getFilmDate(film.Title);
    return `
        <a href="film.html?id=${film.Title}" class="d-md-flex justify-content-md-center">
            <div class="col-md-6">
                <div class="card">
                    <img src="${film.Poster}" class="card-img-top" alt="${film.Title}">
                    <div class="card-body">
                        <h5 class="card-title">${film.Title}</h5>
                        <p class="card-text">Année: ${film.Year}</p>
                        <p class="card-text">IMDb Note: ${film.imdbRating}</p>
                        <p class="card-text"><strong>Prochaine séance: ${filmDate}</strong></p>
                    </div>
                </div>
            </div>
        </a>
    `;
}   

// Obtenir le film du jour en fonction du jour de la semaine (Lundi-Vendredi)
const getFilmDuJour = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Dimanche: 0, Lundi: 1, ..., Vendredi: 5, Samedi: 6
  
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const filmDuJour = filmsDAffiche[dayOfWeek - 1];
      return `<a class="nav-link" href="film.html?id=${filmDuJour}">Film du jour</a>`;
    } else {
      return null; // Si ce n'est pas un jour de la semaine (samedi ou dimanche), retourne null
    }
  };
  
  const getFilmDate = (titre) => {
    const filmsDAffiche = listFilm();
    return setFilmDate(filmsDAffiche, titre);
};
document.addEventListener('DOMContentLoaded', async () => {
    // Récupérer le contenu du fichier inclus
    const response = await fetch('assets/include/navbar.html');
    const content = await response.text();
  
    // Ajouter le contenu au document HTML
    const container = document.getElementById('filmDuJour');
    container.innerHTML = content;
  
    // Maintenant, vous pouvez utiliser les fonctions async/await dans votre script JavaScript
    const filmDuJourLink = await getFilmDuJour();
    if (filmDuJourLink) {
      const filmDuJourContainer = document.getElementById('filmDuJour');
      filmDuJourContainer.innerHTML = filmDuJourLink;
    } else {
      console.log("Aucun film du jour (c'est le week-end)");
    }
  
    // Génération et affichage de la liste des films
    (async () => {
      const filmsCardsContainer = document.getElementById('film-list');
      for (const titre of filmsDAffiche) {
        const film = await fetchFilm(titre);
        const filmCard = createFilmCard(film);
        filmsCardsContainer.innerHTML += filmCard;
      }
    })();
  });