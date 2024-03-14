document.addEventListener('DOMContentLoaded', function () {

    let score = 0;
    let questionIndex = 0;
    let intervaltemps;
    const chronometreElement = document.getElementById('chronometre');
    const scoreElement = document.getElementById('score');
    let tempsRestant = 20;

    
    //question et leurs reponses pour jeu1
    const questionsEtReponses = [
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

    // le chronometre du jeu
    function demarrerChronometre() {
        intervaltemps = setInterval(() => {
            tempsRestant--;
            chronometreElement.textContent = tempsRestant;

            if (tempsRestant <= 0) { //temps est fini on passe a la question suivante 
                passerALaQuestionSuivante();
            }
        }, 1000);
    }

    function initialiserJeu() {
        clearInterval(intervaltemps);
        tempsRestant = 20;
        score = 0;
        questionIndex = 0;
        scoreElement.textContent = '0';
        chronometreElement.textContent = '20';
        document.getElementById('feedback').textContent = '';
    }

    // on passe a la question suivante si il y'a plus de question fin du jeu
    function passerALaQuestionSuivante() {
        clearInterval(intervaltemps);
        questionIndex++;
        if (questionIndex < questionsEtReponses.length) {
            reinitialiserPourQuestionSuivante();
            poserQuestion();
        } else {
            finDuJeu();
        }
    }
    // on initielise le temps a chaque fois qu'une question est poser
    function reinitialiserPourQuestionSuivante() {
        tempsRestant = 21;
        boutonsDesactiver();
        chronometreElement.textContent = '20';
        demarrerChronometre();
    }

    //on demarre le jeu1
    function demarrerJeu1() {
        initialiserJeu();
        poserQuestion();
        demarrerChronometre();
    }
    //pour afficher le jeu 1 une fois qu'on clique sur le button du jeu1 
    document.getElementById('btnJeu1').addEventListener('click', function () {
        document.getElementById('selection-jeu').style.display = 'none';
        document.getElementById('jeu1').style.display = 'block';
        demarrerJeu1();
    });

        //pour afficher le jeu 1 une fois qu'on clique sur le button du jeu1 
    document.getElementById('retourMenuJeu1').addEventListener('click', function () {
        document.getElementById('selection-jeu').style.display = 'block';
        document.getElementById('jeu1').style.display = 'none';
        reinitialiserBoutonsReponse();
        initialiserJeu();

    });

    // les question demander pour le jeu1
    function poserQuestion() {
        if (questionIndex < questionsEtReponses.length) {
            const questionCourante = questionsEtReponses[questionIndex];
            document.getElementById('question').textContent = questionCourante.question;
            questionCourante.reponses.forEach((reponse, index) => {
                let boutonReponse;
                switch (index) {
                    case 0:
                        boutonReponse = document.getElementById('reponseA');
                        break;
                    case 1:
                        boutonReponse = document.getElementById('reponseB');
                        break;
                    case 2:
                        boutonReponse = document.getElementById('reponseC');
                        break;
                    case 3:
                        boutonReponse = document.getElementById('reponseD');
                        break;
                }
                boutonReponse.textContent = reponse;
                boutonReponse.disabled = false;

                boutonReponse.onclick = function () {
                    if (index === questionCourante.correcte) {
                        score += 1;
                        document.getElementById('feedback').textContent = 'Correct!';
                    } else {
                        document.getElementById('feedback').textContent = 'Incorrect.';
                    }
                    scoreElement.textContent = score;
                    boutonsDesactiver();
                    questionIndex++;
                    tempsRestant = 21;
                    if (questionIndex < questionsEtReponses.length) {
                        setTimeout(poserQuestion, 1000);
                    } else {
                        setTimeout(finDuJeu, 1000);
                    }
                };
            });
        }
    }
    // désactive les boutons de réponse pour éviter des réponses multiples
    function boutonsDesactiver() {
        for (let i = 0; i < 4; i++) {
            let boutonId;
            switch (i) {
                case 0:
                    boutonId = 'reponseA';
                    break;
                case 1:
                    boutonId = 'reponseB';
                    break;
                case 2:
                    boutonId = 'reponseC';
                    break;
                case 3:
                    boutonId = 'reponseD';
                    break;
            }
            document.getElementById(boutonId).disabled = true;
        }
    }

    function reinitialiserBoutonsReponse() {
        for (let i = 0; i < 4; i++) {
            let boutonId;
            switch (i) {
                case 0:
                    boutonId = 'reponseA';
                    break;
                case 1:
                    boutonId = 'reponseB';
                    break;
                case 2:
                    boutonId = 'reponseC';
                    break;
                case 3:
                    boutonId = 'reponseD';
                    break;
            }
            let bouton = document.getElementById(boutonId);
            bouton.style.display = 'inline-block';
            bouton.disabled = false;
        }
    }
    // on affiche le score et enleve les buttonns 
    function finDuJeu() {
        clearInterval(intervaltemps);
        document.getElementById('feedback').textContent = `Le jeu est terminé. Score final : ${score}`;
        for (let i = 0; i < 4; i++) {
            let boutonId;
            switch (i) {
                case 0:
                    boutonId = 'reponseA';
                    break;
                case 1:
                    boutonId = 'reponseB';
                    break;
                case 2:
                    boutonId = 'reponseC';
                    break;
                case 3:
                    boutonId = 'reponseD';
                    break;
            }
            document.getElementById(boutonId).style.display = 'none';
        }
    }

    // Jeu 2 ( il resye a rajouter le chronomettre et score et aussi regler le retour au menu comme dans le jeu 1)
    document.getElementById('btnJeu2').addEventListener('click', function () {
        document.getElementById('selection-jeu').style.display = 'none';
        document.getElementById('jeu2').style.display = 'block';
        demarrerJeu2();
    });

    const questionsEtReponsesJeu2 = [
        {
            question: "Quelle est la tonalité mineure de l'image",
            reponses: ["la ♭ mineur", "sol mineur", "ré mineur", "mi mineur"],
            correcte: 0,
            imageSupplementaire: "img-tonalite/7b.svg"
        },
        {
            question: "Quelle est la tonalité majeure de l'image",
            reponses: ["do ♭ majeur", "ré majeur", "sol majeur", "fa majeur"],
            correcte: 3,
            imageSupplementaire: "img-tonalite/1b.svg"
        }
    ];

    function demarrerJeu2() {
        score = 0;
        questionIndex = 0;
        poserQuestionJeu2();
    }

    function poserQuestionJeu2() {
        if (questionIndex < questionsEtReponsesJeu2.length) {
            const questionCourante = questionsEtReponsesJeu2[questionIndex];
            document.getElementById('questionJeu2').textContent = questionCourante.question;
            questionCourante.reponses.forEach((reponse, index) => {
                let boutonReponse = document.getElementById(`reponseJeu2_${index}`);
                boutonReponse.textContent = reponse;
                boutonReponse.onclick = function () {
                    if (index === questionCourante.correcte) {
                        score += 1;
                        document.getElementById('feedbackJeu2').textContent = 'Correct!';
                    } else {
                        document.getElementById('feedbackJeu2').textContent = 'Incorrect.';
                    }
                    questionIndex++;
                    if (questionIndex < questionsEtReponsesJeu2.length) {
                        poserQuestionJeu2();
                    } else {
                        finDuJeuJeu2();
                    }
                };
            });
            document.getElementById('imageSupplementaire').src = questionCourante.imageSupplementaire;
        }
    }

    function finDuJeuJeu2() {
        document.getElementById('feedbackJeu2').textContent = `Le jeu est terminé. Score final : ${score}`;
    }

    document.getElementById('retourMenuJeu2').addEventListener('click', function () {
        document.getElementById('selection-jeu').style.display = 'block';
        document.getElementById('jeu2').style.display = 'none';
    });
});
