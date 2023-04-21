import {keyApi} from '../../accesController.js';
import { listFilm } from "../../accesController.js";
import { setFilmDate } from './toolDate.js';


// Clef d'api
const API_KEY = keyApi();

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

const createFilmCard = (film) => {
    return `
        <div class="film-item size" data-film-title="${film.Title}">
            <a href="#section-ancre">
                <div class="card">
                    <img src="${film.Poster}" class="card-img-top size" alt="${film.Title}">
                    <div class="card-body">
                        <h5 class="card-title">${film.Title}</h5>
                        <p class="card-text">Année: ${film.Year}</p>
                        <p class="card-text">IMDb Note: ${film.imdbRating}</p>
                    </div>
                </div>
            </a>
        </div>
    `;
}

const createFilmInfoCard = (film) => {
    const filmDate = getFilmDate(film.Title);
    return `
        <div class="col-md-6 d-md-flex justify-content-md-center">
            <div class="card">
                <img src="${film.Poster}" class="card-img-top" alt="${film.Title}">                    
            </div>
        </div>
        <div class="col-md-6 d-md-flex justify-content-md-center">
            <div class="card p-2">
                <h5 class="card-title">${film.Title}</h5>
                <p class="card-text">Année: ${film.Year}</p>
                <p class="card-text">Genre: ${film.Genre}</p>
                <p class="card-text">Réalisateur: ${film.Director}</p>
                <p class="card-text">Acteurs: ${film.Actors}</p>
                <p class="card-text">Synopsis: ${film.Plot}</p>
                <p class="card-text">Pays: ${film.Country}</p>
                <p class="card-text">Langue: ${film.Language}</p>
                <p class="card-text">IMDb Note: ${film.imdbRating}</p>
                <p class="card-text">Votes: ${film.imdbVotes}</p>
                <p class="card-text">Type: ${film.Type}</p>
                <p class="card-text"><strong>Prochaine séance: ${filmDate}</strong></p>
            </div>
        </div>
    `;
}

const getFilmDate = (titre) => {
    const filmsDAffiche = listFilm();
    return setFilmDate(filmsDAffiche, titre);
};

const displayFilmInfo = async (title) => {
    const film = await fetchFilm(title);
    const filmInfoCard = createFilmInfoCard(film);
    const filmsInfoContainer = document.getElementById('film-selectionner');
    filmsInfoContainer.innerHTML = filmInfoCard;
}

const addFilmClickListener = () => {
    const filmItems = document.querySelectorAll('.film-item');
    filmItems.forEach((item) => {
        item.addEventListener('click', (event) => {
            const filmTitle = event.currentTarget.dataset.filmTitle;
            displayFilmInfo(filmTitle);
        });
    });
}

const getURLParams = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return Array.from(urlParams.values());
}

const getFilmToDisplay = () => {
    const urlParams = getURLParams();
    return urlParams[0] || null;
}

(async () => {
    const filmsDAffiche = listFilm();
    const filmsCardsContainer = document.getElementById('film-list2');

    for (const titre of filmsDAffiche) {
        const film = await fetchFilm(titre);
        const filmCard = createFilmCard(film);
        filmsCardsContainer.innerHTML += filmCard;
    }
    
    addFilmClickListener();

    // Affiche les informations du film sélectionné par défaut
    const defaultFilmTitle = getFilmToDisplay();
    if (defaultFilmTitle) {
        displayFilmInfo(defaultFilmTitle);
    } else {
        displayFilmInfo(filmsDAffiche[0]);
    }
})();
