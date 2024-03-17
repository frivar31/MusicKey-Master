﻿document.addEventListener('DOMContentLoaded', function () {

    let score = 0;
    let questionIndex = 0;
    let intervaltemps;
    const chronometreElement = document.querySelectorAll('.chronometre');
    const scoreElement = document.querySelectorAll('.score');
    let tempsRestant = 3;
    let pendingFeedbackClear = null;


    /* ---------------------------------- DONNEES DU JEU ----------------------------------------- */

    //question et leurs reponses pour jeu1
    const questionsEtReponsesJeu1 = [
        {
            question: "Quelle est la tonalité mineure relative de 'do ♭ majeur'?",
            reponses: ["la ♭ mineur", "sol mineur", "ré mineur", "mi mineur"],
            correcte: 0
        },
        {
            question: "Quelle est la tonalité majeure relative de 'ré mineur'?",
            reponses: ["do ♭ majeur", "ré majeur", "sol majeur", "fa majeur"],
            correcte: 3
        },
        {
            question: "Quelle est la tonalité mineure relative de 'sol majeur'?",
            reponses: ["mi ♭ mineur", "la mineur", "si mineur", "ré mineur"],
            correcte: 0
        },
        {
            question: "Quelle est la tonalité majeure relative de 'mi mineur'?",
            reponses: ["sol majeur", "do majeur", "la majeur", "ré majeur"],
            correcte: 0
        },

    ];

    const questionsEtReponsesJeu2 = [
        {
            question: "Quelle est la tonalité mineure de l'image",
            reponses: ["la ♭ mineur", "sol mineur", "ré mineur", "mi mineur"],
            correcte: 0,
            imgTonalite: "img-tonalite/7b.svg"
        },
        {
            question: "Quelle est la tonalité majeure de l'image",
            reponses: ["do ♭ majeur", "ré majeur", "sol majeur", "fa majeur"],
            correcte: 3,
            imgTonalite: "img-tonalite/1b.svg"
        },
        {
            question: "Quelle est la tonalité mineure de l'image",
            reponses: ["la mineur", "fa # mineur", "mi mineur", "do mineur"],
            correcte: 2,
            imgTonalite: "img-tonalite/1d.svg"
        },
        {
            question: "Quelle est la tonalité majeure de l'image",
            reponses: ["la majeur", "do majeur", "sol majeur", "fa # majeur"],
            correcte: 1,
            imgTonalite: "img-tonalite/zero.svg"
        }
    ];
    const questionsEtReponsesJeu3 = [
        {
            question: "Combien de di`eses y a t-il dans la gamme de ré majeur ?",
            correcte: "4",
        },
        {
            question: "La gamme de si mineur a t-elle 2 ou 3 dieses ? ",
            correcte: "2",
        }
    ];

    /* ----------------------------------- LOGIQUE ------------------------------------ */

    function updateChronometre() {
        chronometreElement.forEach(el => el.textContent = tempsRestant);
    }

    function updateScore() {
        scoreElement.forEach(el => el.textContent = score.toString());
    }

    // --------------------------------partie changer --------------------------------------------
    function updateFeedback(message, isFinalMessage = false) {
        // Efface tout timeout précédent pour effacer le feedback
        if (pendingFeedbackClear) {
            clearTimeout(pendingFeedbackClear);
            pendingFeedbackClear = null;
        }
        document.querySelectorAll('.feedback').forEach(el => el.textContent = message);
        if (!isFinalMessage) {
            // Planifie l'effacement du message seulement si ce n'est pas le message final
            pendingFeedbackClear = setTimeout(() => {
                document.querySelectorAll('.feedback').forEach(el => el.textContent = '');
            }, 1000);
        }
    }
 
    function initialiserJeu() {
        clearInterval(intervaltemps);
        tempsRestant = 5;
        score = 0;
        questionIndex = 0;
        updateScore(); 
        updateChronometre(); 
        updateFeedback('',false);

    }

    // --------------------------------partie changer -------------------------------------------
    function demarrerChronometre(jeuId, questions) {
        clearInterval(intervaltemps);
        intervaltemps = setInterval(() => {
            tempsRestant--;
            updateChronometre();

            if (tempsRestant === 0) {
                clearInterval(intervaltemps);
                updateFeedback("Temps écoulé", false);
                questionIndex++;
                if (questionIndex < questions.length) {
                    poserQuestion(questions, jeuId);
                } else {
                    finDuJeu(jeuId);
                }
            }
        }, 1000);
    }

   // --------------------------------partie changer -------------------------------------------
    //on demarre le jeu
    function demarrerJeu(jeuId, questions) {
        initialiserJeu();
        poserQuestion(questions, jeuId);
        demarrerChronometre(jeuId, questions);
    }
   


    function afficherJeu(jeuId, questions) {
        document.getElementById('selection-jeu').style.display = 'none';
        document.getElementById(jeuId).style.display = 'block';
        demarrerJeu(jeuId, questions);
    }

    function retourMenu(jeu){
        document.getElementById('selection-jeu').style.display = 'flex';
        document.getElementById(jeu).style.display = 'none';
        reinitialiserBoutonsReponse(jeu);
        initialiserJeu();
        
    }
    
    function poserQuestion(questions, jeuId) {
        // Vérifier si nous avons des questions à poser
        if (questionIndex < questions.length) {
            // Réinitialiser le temps et mettre à jour l'affichage
            tempsRestant = 5;
            updateChronometre();
    
            // Obtenir la question courante
            const questionCourante = questions[questionIndex];
            const questionElement = document.getElementById(`${jeuId}_question`);
            questionElement.textContent = questionCourante.question;
    
            // Gérer le type de jeu en cours
            if (jeuId === 'jeu3') {
                const formJeu = document.getElementById(`formJeu3`);
                formJeu.removeEventListener("submit", handleSubmitJeu3); // Détache l'écouteur d'événements existant
                formJeu.addEventListener("submit", soumettreReponseJeu3); // Ajoute un nouvel écouteur d'événements
            } else {
                const boutonsReponse = document.querySelectorAll(`#${jeuId} .btn-reponse`);
                boutonsReponse.forEach((bouton, index) => {
                    bouton.textContent = questionCourante.reponses[index];
                    bouton.onclick = function () {
                        clearInterval(intervaltemps);
                        // Vérifier si la réponse est correcte et mettre à jour le score et l'affichage
                        if (index === questionCourante.correcte) {
                            score += 1;
                            updateFeedback('Correct!');
                        } else {
                            updateFeedback('Incorrect.');
                        }
                        updateScore();
                        questionIndex++;
                        // Vérifier s'il reste d'autres questions à poser
                        if (questionIndex < questions.length) {
                            setTimeout(() => poserQuestion(questions, jeuId), 1000);
                        } else {
                            setTimeout(() => finDuJeu(jeuId), 1000);
                        }
                    };
                });
            }
    
            // Afficher une image si disponible
            if ('imgTonalite' in questionCourante) {
                document.getElementById('imgTonalite').src = questionCourante.imgTonalite;
            }
            // Démarrer le chronomètre
            demarrerChronometre(jeuId, questions);
        }
    }
    
    // Fonction de soumission du formulaire pour le jeu 3
    function soumettreReponseJeu3(event) {
        event.preventDefault();
        inputValue = document.getElementById(`reponseJeu3`).value;
        const questionCourante = questionsEtReponsesJeu3[questionIndex];
        // Vérifier si la réponse est correcte et mettre à jour le score et l'affichage
        if (inputValue === questionCourante.correcte) {
            score += 1;
            updateFeedback('Correct!');
        } else {
            updateFeedback('Incorrect.');
        }
        updateScore();
        questionIndex++;
        // Vérifier s'il reste d'autres questions à poser
        if (questionIndex < questionsEtReponsesJeu3.length) {
            setTimeout(() => poserQuestion(questionsEtReponsesJeu3, 'jeu3'), 1000);
        } else {
            setTimeout(() => finDuJeu('jeu3'), 1000);
        }
    }
    
    


    function reinitialiserBoutonsReponse(jeuId) {
        const boutonsReponse = document.querySelectorAll(`#${jeuId} .btn-reponse`);
        boutonsReponse.forEach(bouton => {
            bouton.style.display = 'inline-block';
            bouton.disabled = false;
        });
        const inputReponse = document.getElementById("formJeu3");
        inputReponse.style.display = 'block';
    }

    

    function finDuJeu(jeuId) {
        clearInterval(intervaltemps);
        updateFeedback("Le jeu est terminé. Score final : " + score, true);
        const boutonsReponse = document.querySelectorAll(`#${jeuId} .btn-reponse`);
        boutonsReponse.forEach(bouton => {
            bouton.style.display = 'none';
        });
        const inputReponse = document.getElementById("formJeu3");
        inputReponse.style.display = 'none';
    }

/* -------------------------------------- JEUX -------------------------------------------- */

    // Jeu 1
    document.getElementById('btnJeu1').addEventListener('click', function () {
        afficherJeu('jeu1', questionsEtReponsesJeu1);
    });

    // Jeu 2 
    document.getElementById('btnJeu2').addEventListener('click', function () {
        afficherJeu('jeu2', questionsEtReponsesJeu2);
    });
    //Jeu 3
    document.getElementById('btnJeu3').addEventListener('click', function () {
        afficherJeu('jeu3', questionsEtReponsesJeu3);
    });

    document.querySelectorAll('.retourMenuJeu').forEach(button => {
        button.addEventListener('click', function () {
            retourMenu('jeu1');
            retourMenu('jeu2');
            retourMenu('jeu3');
        });
    });
});
