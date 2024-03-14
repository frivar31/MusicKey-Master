document.addEventListener('DOMContentLoaded', function () {

    let score = 0;
    let questionIndex = 0;
    let intervaltemps;
    const chronometreElement = document.querySelectorAll('.chronometre');
    const scoreElement = document.querySelectorAll('.score');
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
    function updateChronometre() {
        chronometreElement.forEach(el => el.textContent = tempsRestant);
    }

    function updateScore() {
        scoreElement.forEach(el => el.textContent = score.toString());
    }

    function updateFeedback(message) {
        document.querySelectorAll('.feedback').forEach(el => el.textContent = message);
    }
    // le chronometre du jeu
    function demarrerChronometre() {
        intervaltemps = setInterval(() => {
            tempsRestant--;
            updateChronometre();

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
        updateScore(); 
        updateChronometre(); 
        updateFeedback('');
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
        updateChronometre();
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
    document.querySelectorAll('.retourMenuJeu').forEach(button => {
        button.addEventListener('click', function () {
        document.getElementById('selection-jeu').style.display = 'block';
        document.getElementById('jeu1').style.display = 'none';
        reinitialiserBoutonsReponse();
        initialiserJeu();
        });
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
                        updateFeedback('Correct!');
                    } else {
                        updateFeedback('Incorrect.');
                    }
                    updateScore();
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
        updateFeedback(`Le jeu est terminé. Score final : ${score}`);
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

    // Jeu 2 
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
            imgTonalite: "img-tonalite/7b.svg"
        },
        {
            question: "Quelle est la tonalité majeure de l'image",
            reponses: ["do ♭ majeur", "ré majeur", "sol majeur", "fa majeur"],
            correcte: 3,
            imgTonalite: "img-tonalite/1b.svg"
        }
    ];

    function demarrerJeu2() {
        initialiserJeu();
        poserQuestionJeu2();
        demarrerChronometre();
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
                        updateFeedback('Correct!');
                    } else {
                        updateFeedback('Incorrect.');
                    }
                    updateScore();
                    questionIndex++;
                    tempsRestant = 21;
                    if (questionIndex < questionsEtReponsesJeu2.length) {
                        setTimeout(() => poserQuestionJeu2(), 1000);
                    } else {
                        setTimeout(finDuJeu2, 1000);
                    }
                };
            });
            document.getElementById('imgTonalite').src = questionCourante.imgTonalite; 
        }
    }

    function finDuJeu2() {     
            clearInterval(intervaltemps);
            updateFeedback(`Le jeu est terminé. Score final : ${score}`);
            for (let i = 0; i < 4; i++) {
                let boutonId;
                switch (i) {
                    case 0:
                        boutonId = 'reponseJeu2_0';
                        break;
                    case 1:
                        boutonId = 'reponseJeu2_1';
                        break;
                    case 2:
                        boutonId = 'reponseJeu2_2';
                        break;
                    case 3:
                        boutonId = 'reponseJeu2_3';
                        break;
                }
                document.getElementById(boutonId).style.display = 'none';
            }
       
    }

    document.querySelectorAll('.retourMenuJeu').forEach(button => {
        button.addEventListener('click', function () {
        document.getElementById('selection-jeu').style.display = 'block';
            document.getElementById('jeu2').style.display = 'none';
        });
    });
});
