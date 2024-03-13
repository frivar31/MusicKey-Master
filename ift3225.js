
    document.addEventListener('DOMContentLoaded', function () {

        let score = 0;
    let questionIndex = 0;
    let intervaltemps;
    const chronometreElement = document.getElementById('chronometre');
    const scoreElement = document.getElementById('score');
    let tempsRestant = 20;

    function demarrerChronometre() {
        intervaltemps = setInterval(() => {
            tempsRestant--;
            chronometreElement.textContent = tempsRestant;
            if (tempsRestant <= 0) {
                clearInterval(intervaltemps);
                finDuJeu();
            }
        }, 1000);
            }

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
                },
    ];


    function demarrerJeu1() {
        score = 0;
    questionIndex = 0;
    scoreElement.textContent = '0';
    chronometreElement.textContent = '20';
    poserQuestion();
    demarrerChronometre();
            }
    document.querySelector('.btn-jeu[data-jeu="jeu1"]').addEventListener('click', function () {
        document.getElementById('selection-jeu').style.display = 'none';
    document.getElementById('jeu1').style.display = 'block';
    demarrerJeu1();
            });



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


    //Jeu2
    document.querySelector('.btn-jeu[data-jeu="jeu2"]').addEventListener('click', function () {
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
            },

        ];
    function demarrerJeu2() {
        score = 0;
        questionIndex = 0;
        poserQuestionJeu2();
            }

        function poserQuestionJeu2() {
            if (questionIndex < questionsEtReponsesJeu2.length) {
                const questionCourante = questionsEtReponsesJeu2[questionIndex];
                // Supposons que vous avez des éléments HTML pour la question, les réponses, et un conteneur pour les images
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
     
    });
