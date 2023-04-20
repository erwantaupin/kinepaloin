export function setFilmDate(filmsDAffiche, selectedFilm) {
    const filmIndex = filmsDAffiche.indexOf(selectedFilm);
    const today = new Date();
    const firstProjectionDay = 1; // Lundi

    // Calcul du nombre de jours entre aujourd'hui et le prochain jour de projection (lundi)
    const daysToNextProjection = (firstProjectionDay - today.getDay() + 7) % 7;

    // Calcul du nombre total de jours à ajouter pour obtenir la date du film sélectionné
    const daysDifference = daysToNextProjection + filmIndex;

    const filmDate = new Date(today.setDate(today.getDate() + daysDifference));

    // Format de date en français
    return filmDate.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
