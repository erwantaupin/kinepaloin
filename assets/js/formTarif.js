import { listFilm } from "../../accesController.js";  

const prixAdult = 10;
const prixChild = 6;
const prixSenior = 7;
const reducPrice = 8;
const priceMorning= 7;
const formulaire = document.querySelector('#formulaire-tarif');

const emailRegex = /\S+@\S+\.\S+/;

Vue.component('tarif-ticket', {
    props: ['totalPrix'],
    template: '<h3 class="text-end my-3" id="totalPrix">Total :  {{totalPrix}} € '
})
/**
 * TODO: l'envoi du formulaire
 */

let app = new Vue({
    el : "#form-tarif",
    data: {
        email: "",
        ErrorEmail: false,
        emailVerif: "",
        ErrorEmailDouble: false,
        horaires: ['matin', 'après-midi', 'soir'],
        selectedHoraire: "",
        ErrorHoraire: false,
        filmsDAffiche: listFilm(),
        selectedFilm: "",
        ErrorFilm: false,
        nameValue: "",
        ErrorNameValue: false,
        surname: "",
        ErrorSurname: false,
        filmDate: "",
        nbrAdult: 0,
        nbrAdultReduc: 0,
        nbrChild: 0,
        nbrStudent: 0,
        nbrSenior: 0,
        totalPrix : 0,
        nextClicked: false,
    },
    methods: {
        setFilmDate() {
            const filmIndex = this.filmsDAffiche.indexOf(this.selectedFilm);
            const today = new Date();
            const firstProjectionDay = 1; // Lundi
        
            // Calcul du nombre de jours entre aujourd'hui et le prochain jour de projection (lundi)
            const daysToNextProjection = (firstProjectionDay - today.getDay() + 7) % 7;
        
            // Calcul du nombre total de jours à ajouter pour obtenir la date du film sélectionné
            const daysDifference = daysToNextProjection + filmIndex;
        
            const filmDate = new Date(today.setDate(today.getDate() + daysDifference));
        
            // Format de date en français
            this.filmDate = filmDate.toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },
        

        calc(){
            if(this.selectedHoraire === "matin"){
                this.priceForadult = this.nbrAdult * priceMorning;
                this.priceForAdultReduc = this.nbrAdultReduc * priceMorning;
                this.priceForstudent = this.nbrStudent * priceMorning;
            }else{
                this.priceForadult = this.nbrAdult * prixAdult;
                this.priceForAdultReduc = this.nbrAdultReduc * reducPrice;
                this.priceForstudent = this.nbrStudent * reducPrice;
            }
            this.priceForChild = this.nbrChild * prixChild;
            this.priceForSenior = this.nbrSenior * prixSenior;
            

            this.totalPrix = 
                this.priceForadult 
                + this.priceForAdultReduc 
                + this.priceForstudent 
                + this.priceForChild 
                + this.priceForSenior;
        },
        
        check(){
            if(!emailRegex.test(this.email)){
                this.ErrorEmail = true
            }else{
                this.ErrorEmail = false
            }
            this.ErrorEmailDouble = this.email !== this.emailVerif;
        },

        nextButtonClicked() {
            this.nextClicked = true;
        },

        click() {
            let ErrorsUP = false;
        
            // Vérifiez les emails en utilisant la méthode check()
            this.check();
            // Vérifiez que les champs soit renseignée
            if (this.ErrorEmail || this.ErrorEmailDouble) {
                ErrorsUP = true;
            }
            // Vérifiez si un film est sélectionné
            if (!this.selectedFilm) {
                this.ErrorFilm = true;
                ErrorsUP = true;
            } else {
                this.ErrorFilm = false;
            }
            // Vérifiez si un horaire est sélectionné
            if (!this.selectedHoraire) {
                this.ErrorHoraire = true;
                ErrorsUP = true;
            } else {
                this.ErrorHoraire = false;
            }
            // Vérifiez si un nom est renseignée
            if (!this.nameValue.trim()) {
                this.ErrorNameValue = true;
                ErrorsUP = true;
            }else {
                this.ErrorNameValue = false;
            }
            // Vérifiez si un prenom est renseignée
            if (!this.surname.trim()) {
                this.ErrorSurname = true;
                ErrorsUP = true;
            }else {
                this.ErrorSurname = false;
            }
            // si errorsUp est false alors je peut envoyer le formulaire
            if(!ErrorsUP){
                //mettre ici chemin vers le back pour verifier coté backend et envoyer le formulaire
                $("#exampleModalCenter").modal("show");
            }
        },
    },

    watch: {
        totalPrix(newValue) {
            if (newValue === 0) {
                this.nextClicked = false;
            }
        }
    },
    

    computed: {
        
        filmIsSelected(){
            return this.selectedFilm !== "";
        },
        isAnyInputNonZero() {
            return this.totalPrix !== 0;
        },
        isNextOk() {
            return this.totalPrix !== 0 && this.nextClicked;
        },
    },

    
});

