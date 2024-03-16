document.addEventListener('DOMContentLoaded', function () {

    let score = 0;
    let questionIndex = 0;
    let intervaltemps;
    const chronometreElement = document.querySelectorAll('.chronometre');
    const scoreElement = document.querySelectorAll('.score');
    let tempsRestant = 20;


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
        {
            question: "Quelle est la tonalité mineure relative de 'fa majeur'?",
            reponses: ["ré mineur", "la mineur", "si mineur", "do mineur"],
            correcte: 0
        }
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
        }
    ];

    /* ----------------------------------- LOGIQUE ------------------------------------ */

    function updateChronometre() {
        chronometreElement.forEach(el => el.textContent = tempsRestant);
    }

    function updateScore() {
        scoreElement.forEach(el => el.textContent = score.toString());
    }

    function updateFeedback(message) {
        document.querySelectorAll('.feedback').forEach(el => el.textContent = message);
    }

    function initialiserJeu() {
        clearInterval(intervaltemps);
        tempsRestant = 20;
        score = 0;
        questionIndex = 0;
        updateScore(); 
        updateChronometre(); 
        updateFeedback('');
    }

    function demarrerChronometre(jeuId, question) {
        intervaltemps = setInterval(() => {
            tempsRestant--;
            updateChronometre();
    
            if (tempsRestant <= 0) {
                clearInterval(intervaltemps);
                updateFeedback("Temps écoulé");
                passerALaQuestionSuivante(jeuId, question);
            }
        }, 1000);
    }
    
    function passerALaQuestionSuivante(jeuId, question) {
        questionIndex++;
        if (questionIndex < question.length) {
            reinitialiserPourQuestionSuivante();
            poserQuestion(question, jeuId);
        } else {
            finDuJeu(jeuId);
        }
    }
    
    function reinitialiserPourQuestionSuivante() {
        tempsRestant = 20;
        updateChronometre();
        demarrerChronometre();
    }
    

    // le chronometre du jeu
    /* function demarrerChronometre(question, jeuId) {
        intervaltemps = setInterval(() => {
            tempsRestant--;
            updateChronometre();

            if (tempsRestant <= 0) { //temps est fini on passe a la question suivante 
                passerALaQuestionSuivante(question, jeuId);
            }
        }, 1000);
    }

    // on passe a la question suivante si il y'a plus de question fin du jeu
    function passerALaQuestionSuivante(jeuId, question) {
        clearInterval(intervaltemps);
        questionIndex++;
        if (questionIndex < questionsEtReponses.length) {
            reinitialiserPourQuestionSuivante();
            poserQuestion(question, jeuId);
        } else {
            finDuJeu(jeuId);
        }
    }

    // on initielise le temps a chaque fois qu'une question est poser
    function reinitialiserPourQuestionSuivante() {
        tempsRestant = 21;
        updateChronometre();
        demarrerChronometre();
    } */

    //on demarre le jeu
    function demarrerJeu(question, jeuId) {
        initialiserJeu();
        poserQuestion(question, jeuId);
        demarrerChronometre();
    }

    function afficherJeu(jeu, question){
        document.getElementById('selection-jeu').style.display = 'none';
        document.getElementById(jeu).style.display = 'block';
        demarrerJeu(question, jeu);
    }

    function retourMenu(jeu){
        document.getElementById('selection-jeu').style.display = 'block';
        document.getElementById(jeu).style.display = 'none';
        reinitialiserBoutonsReponse(jeu);
        initialiserJeu();
    }

    function poserQuestion(questions, jeuId) {
        if (questionIndex < questions.length) {
            const questionCourante = questions[questionIndex];
            const questionElement = document.getElementById(`${jeuId}_question`);
            questionElement.textContent = questionCourante.question;
    
            const boutonsReponse = document.querySelectorAll(`#${jeuId} .btn-reponse`);
            boutonsReponse.forEach((bouton, index) => {
                bouton.textContent = questionCourante.reponses[index];
                bouton.onclick = function () {
                    if (index === questionCourante.correcte) {
                        score += 1;
                        updateFeedback('Correct!');
                    } else {
                        updateFeedback('Incorrect.');
                    }
                    updateScore();
                    questionIndex++;
                    tempsRestant = 21;
                    if (questionIndex < questions.length) {
                        setTimeout(() => poserQuestion(questions, jeuId), 1000);
                    } else {
                        setTimeout(() => finDuJeu(jeuId), 1000);
                    }
                };
            });
    
            if (jeuId === 'jeu2') {
                document.getElementById('imgTonalite').src = questionCourante.imgTonalite; 
            }
        }
    }

    function reinitialiserBoutonsReponse(jeuId) {
        const boutonsReponse = document.querySelectorAll(`#${jeuId} .btn-reponse`);
        boutonsReponse.forEach(bouton => {
            bouton.style.display = 'inline-block';
            bouton.disabled = false;
        });
    }

    // on affiche le score et enleve les buttonns 
    function finDuJeu(jeuId) {
        clearInterval(intervaltemps);
        updateFeedback(`Le jeu est terminé. Score final : ${score}`);
        const boutonsReponse = document.querySelectorAll(`#${jeuId} .btn-reponse`);
        boutonsReponse.forEach(bouton => {
            bouton.style.display = 'none';
        });
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

    document.querySelectorAll('.retourMenuJeu').forEach(button => {
        button.addEventListener('click', function () {
            retourMenu('jeu1');
            retourMenu('jeu2');
        });
    });
});
