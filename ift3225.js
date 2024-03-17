document.addEventListener('DOMContentLoaded', function () {

    let score = 0;
    let questionIndex = 0;
    let intervaltemps;
    const chronometreElement = document.querySelectorAll('.chronometre');
    const scoreElement = document.querySelectorAll('.score');
    let tempsRestant = 20;
    let ClearFeedback = null;

    /* ---------------------------------- DONNEES DU JEU ----------------------------------------- */

    //question et leurs reponses pour les jeux
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
        {
            question: "Quelle est la tonalité mineure relative de 'la majeur'?",
            reponses: ["mi mineur", "fa ♯ mineur", "la mineur", "do mineur"],
            correcte: 1
        },

    ];

    const questionsEtReponsesJeu2 = [
        {
            question: "Quelle est la tonalité mineure de l'image",
            reponses: ["la ♭ mineur", "sol mineur", "ré mineur", "mi mineur"],
            correcte: 0,
            imgTonalite: "static/7b.svg"
        },
        {
            question: "Quelle est la tonalité majeure de l'image",
            reponses: ["do ♭ majeur", "ré majeur", "sol majeur", "fa majeur"],
            correcte: 3,
            imgTonalite: "static/1b.svg"
        },
        {
            question: "Quelle est la tonalité mineure de l'image",
            reponses: ["la mineur", "fa # mineur", "mi mineur", "do mineur"],
            correcte: 2,
            imgTonalite: "static/1d.svg"
        },
        {
            question: "Quelle est la tonalité majeure de l'image",
            reponses: ["la majeur", "do majeur", "sol majeur", "fa # majeur"],
            correcte: 1,
            imgTonalite: "static/zero.svg"
        },
         {
             question: "Quelle est la tonalité mineure de l'image",
             reponses: ["sol ♯ mineur", "fa # mineur", "si mineur", "si ♭ mineur"],
             correcte: 0,
            imgTonalite: "static/5d.svg"
        }
    ];
    const questionsEtReponsesJeu3 = [
        {
            question: "Combien de dieses y a t-il dans la gamme de ré majeur ?",
            correcte: "4",
        },
        {
            question: "La gamme de si mineur a t-elle 2 ou 3 dieses ? ",
            correcte: "2",
        }
    ];
    const questionsEtReponsesJeu4 = [
        {
            question: "Les altérations de la gamme de \"fa mineur\" sont elles des bemols ou des dieses ?",
            correcte: "bemol",
        },
        {
            question: "Les altérations de la gamme de \"la majeur\" sont elles des bemols ou des dieses ?",
            correcte: "diese",
        },
        {
            question: "Les altérations de la gamme de \"si mineur\" sont elles des bemols ou des dieses ?",
            correcte: "diese",
        },
        {
            question: "Les altérations de la gamme de \"do mineur\" sont elles des bemols ou des dieses ?",
            correcte: "bemol",
        },
        {
            question: "Les altérations de la gamme de \"sol majeur\" sont elles des bemols ou des dieses ?",
            correcte: "diese",
        },
    ];

    /* ----------------------------------- LOGIQUE ------------------------------------ */

    function updateChronometre() {
        chronometreElement.forEach(el => el.textContent = tempsRestant);
    }

    function updateScore() {
        scoreElement.forEach(el => el.textContent = score.toString());
    }

    function updateFeedback(message, messageFinal = false) {
        if (ClearFeedback) {
            clearTimeout(ClearFeedback);
            ClearFeedback = null;
        }

        document.querySelectorAll('.feedback').forEach(el => el.textContent = message);

        if (!messageFinal) {
            ClearFeedback = setTimeout(() => {
                document.querySelectorAll('.feedback').forEach(el => el.textContent = '');
            }, 1000);
        }
    }

    function initialiserJeu() {
        clearInterval(intervaltemps);
        tempsRestant = 20;
        score = 0;
        questionIndex = 0;
        updateScore(); 
        updateChronometre(); 
        updateFeedback('',false);
    }


    // Cette fonction s'occupe du chronometre et tout ce qui est relie au temps de jeux
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
                } 
                else {
                    finDuJeu(jeuId);
                }
            }
        }, 1000);
    }

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

    // Cette fonction gere la logique des questions et des reponses. Elle s'occupe d'afficher les questions
    // et de verifier les reponses en inputs, du score, du chronometre et de la fin du jeu.
    function poserQuestion(questions, jeuId) {
        if (questionIndex < questions.length) {
            tempsRestant = 20;
            updateChronometre();
    
            const questionCourante = questions[questionIndex];
            const questionElement = document.getElementById(`${jeuId}_question`);
            questionElement.textContent = questionCourante.question;
    
            // Si c'est le jeu 3 ou jeu 4, gérer les événements spécifiques

            if (jeuId === 'jeu3') {
                const formJeu = document.getElementById(`formJeu3`);
                formJeu.removeEventListener("submit", GererReponseJeu3); // Détache l'écouteur d'événements existant
                formJeu.addEventListener("submit", GererReponseJeu3); // Ajoute un nouvel écouteur d'événements
            }
            else if (jeuId === 'jeu4') {
                const formJeu = document.getElementById(`formJeu4`);
                formJeu.removeEventListener("submit", GererReponseJeu4);
                formJeu.addEventListener("submit", GererReponseJeu4);
            } 
            // Pour les autres jeux, afficher les boutons de réponse
            else {
                const boutonsReponse = document.querySelectorAll(`#${jeuId} .btn-reponse`);
                boutonsReponse.forEach((bouton, index) => {
                    bouton.textContent = questionCourante.reponses[index];
                    bouton.onclick = function () {
                        clearInterval(intervaltemps);

                        if (index === questionCourante.correcte) {
                            score += 1;
                            updateFeedback('Correct!');
                        } 
                        else {
                            updateFeedback('Incorrect.');
                        }
                        updateScore();
                        questionIndex++;

                        if (questionIndex < questions.length) {
                            setTimeout(() => poserQuestion(questions, jeuId), 1000);
                        } 
                        else {
                            setTimeout(() => finDuJeu(jeuId), 1000);
                        }
                    };
                });
            }
    
            if ('imgTonalite' in questionCourante) {
                document.getElementById('imgTonalite').src = questionCourante.imgTonalite;
            }
            demarrerChronometre(jeuId, questions);
        }
    }
    

    function GererReponseJeu3(event) {
        event.preventDefault();
        inputValue = document.getElementById(`reponseJeu3`).value;
        const questionCourante = questionsEtReponsesJeu3[questionIndex];
        
        if (inputValue === questionCourante.correcte) {
            score += 1;
            updateFeedback('Correct!');
        } 
        else {
            updateFeedback('Incorrect.');
        }

        updateScore();
        questionIndex++;

        document.getElementById(`reponseJeu3`).value = '';

        if (questionIndex < questionsEtReponsesJeu3.length) {
            setTimeout(() => poserQuestion(questionsEtReponsesJeu3, 'jeu3'), 1000);
        } 
        else {
            setTimeout(() => finDuJeu('jeu3'), 1000);
        }
    }

    function GererReponseJeu4(event) {
        event.preventDefault();
        inputValue = document.getElementById(`reponseJeu4`).value;
        const questionCourante = questionsEtReponsesJeu4[questionIndex];

        if (inputValue === questionCourante.correcte) {
            score += 1;
            updateFeedback('Correct!');
        } 
        else {
            updateFeedback('Incorrect.');
        }

        updateScore();
        questionIndex++;

        document.getElementById(`reponseJeu4`).value = '';

        if (questionIndex < questionsEtReponsesJeu4.length) {
            setTimeout(() => poserQuestion(questionsEtReponsesJeu4, 'jeu4'), 1000);
        } 
        else {
            setTimeout(() => finDuJeu('jeu4'), 1000);
        }
    }

    // cette fonction fait en sorte que les boutons et les inputs marches apres la fin de chaque jeu
    function reinitialiserBoutonsReponse(jeuId) {
        const boutonsReponse = document.querySelectorAll(`#${jeuId} .btn-reponse`);

        boutonsReponse.forEach(bouton => {
            bouton.style.display = 'inline-block';
            bouton.disabled = false;
        });

        const inputReponse3 = document.getElementById("formJeu3");
        inputReponse3.style.display = 'block';

        const inputReponse4 = document.getElementById("formJeu4");
        inputReponse4.style.display = 'block';
    }

    
    // Cette fonction s'occupe de la fin du jeu en desactivant les boutons et les inputs
    function finDuJeu(jeuId) {
        clearInterval(intervaltemps);
        updateFeedback("Le jeu est terminé. Score final : " + score, true);
        const boutonsReponse = document.querySelectorAll(`#${jeuId} .btn-reponse`);

        boutonsReponse.forEach(bouton => {
            bouton.style.display = 'none';
        });

        const inputReponse3 = document.getElementById("formJeu3");
        inputReponse3.style.display = 'none';

        const inputReponse4 = document.getElementById("formJeu4");
        inputReponse4.style.display = 'none';
        
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

    //Jeu 4
    document.getElementById('btnJeu4').addEventListener('click', function () {
        afficherJeu('jeu4', questionsEtReponsesJeu4);
    });

    document.querySelectorAll('.retourMenuJeu').forEach(button => {
        button.addEventListener('click', function () {
            retourMenu('jeu1');
            retourMenu('jeu2');
            retourMenu('jeu3');
            retourMenu('jeu4');
        });
    });
});
