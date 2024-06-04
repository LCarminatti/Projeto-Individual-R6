const startGameButton = document.querySelector(".start-quiz");
const questionsContainer = document.querySelector(".questions-container");
const answersContainer = document.querySelector(".answers-container");
const questionText = document.querySelector(".question");
const nextQuestionButton = document.querySelector(".next-question");
const container = document.querySelector(".container");
const exitButton = document.querySelector(".exit-button");

startGameButton.addEventListener("click", startGame);
nextQuestionButton.addEventListener("click", displayNextQuestion);

let currentQuestionIndex = 0;
let totalCorrect = 0;

function startGame(params) {
  startGameButton.classList.add("hide");
  questionsContainer.classList.remove("hide");
  exitButton.classList.add("hide");

  displayNextQuestion();
}

function displayNextQuestion(params) {
  resetState();

  if (questions.length == currentQuestionIndex) {
    return finishGame();
  }

  questionText.textContent = questions[currentQuestionIndex].question;
  questions[currentQuestionIndex].answers.forEach((answers) => {
    const newAnswer = document.createElement("button");
    newAnswer.classList.add("button", "answer");
    newAnswer.textContent = answers.text;
    if (answers.correct) {
      newAnswer.dataset.correct = answers.correct;
    }
    answersContainer.appendChild(newAnswer);

    newAnswer.addEventListener("click", selectAnswer);
  });
}

function resetState(params) {
  while (answersContainer.firstChild) {
    answersContainer.removeChild(answersContainer.firstChild);
  }

  document.body.removeAttribute("class");
  nextQuestionButton.classList.add("hide");
}
let contadorPerguntas = 0

let pergunta1 = 0
let pergunta2 = 0
let pergunta3 = 0
let pergunta4 = 0
let pergunta5 = 0
let pergunta6 = 0

function selectAnswer(event) {
  const answerClicked = event.target;
  contadorPerguntas++
  if (answerClicked.dataset.correct) {
    if (contadorPerguntas == 1) {
      pergunta1++
    } else if (contadorPerguntas == 2) {
      pergunta2++
    } else if (contadorPerguntas == 3) {
      pergunta3++
    } else if (contadorPerguntas == 4) {
      pergunta4++
    } else if (contadorPerguntas == 5) {
      pergunta5++
    } else if (contadorPerguntas == 6) {
      pergunta6++
    }
    document.body.classList.add("correct");
    totalCorrect++;
  } else {
    document.body.classList.add("incorrect");
  }

  document.querySelectorAll(".answer").forEach((button) => {
    if (button.dataset.correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }

    button.disabled = true;
  });
  nextQuestionButton.classList.remove("hide");
  currentQuestionIndex++;
}

function finishGame(params) {
  const totalQuestion = questions.length;
  const performance = Math.floor((totalCorrect * 100) / totalQuestion);

  let message = "";

  switch (true) {
    case performance >= 90:
      message = "Excelente :)";
      break;
    case performance >= 70:
      message = "Muito Bom :)";
      break;
    case performance >= 50:
      message = "Bom";
      break;
    default:
      message = "Pode Melhorar :(";
      break;
  }

  questionsContainer.innerHTML = `
  <p>
   Você acertou ${totalCorrect} de ${totalQuestion} questões!
  <span>Resultado: ${message}</span>
    </p>
<button onclick="refazer()" class="button-refazer">Refazer Teste</button>`;
}

function refazer() {
  enviarQuiz()
  window.location.reload()
}


const questions = [
  {
    question: "Qual o maior ranking do R6?",
    answers: [
      { text: "Master", correct: false },
      { text: "Master League", correct: false },
      { text: "Diamante", correct: false },
      { text: "Campeôes", correct: true },
    ],
  },


  {
    question:
      "Quais personagens possuem escudo?",
    answers: [
      { text: "Clash - Blitz - Fuze - Montagne", correct: true },
      { text: "Iana - Ash - Smoke - Lesion", correct: false },
      { text: "Meluse - Castle - Nokk - Ela", correct: false },
      { text: "Mute - Mozzie - Mira - Glaz", correct: false },
    ],
  },
  {
    question: "Quais personagens curam no jogo?",
    answers: [
      { text: "Smoke - Grim - Sledge", correct: false },
      { text: "Recruta - Blitz - Fuze", correct: false },
      { text: "Ela - Ash - Twitch", correct: false },
      { text: "Doc - Thunderbird - Finka", correct: true },
    ],
  },
  {
    question: "Quais personagens dão choque?",
    answers: [
      { text: "Lesion - Solis - Zofia", correct: false },
      { text: "Smoke - Bandit - Sledge - Hibana", correct: false },
      { text: "Clash - Kaid - Bandit - Twitch", correct: true },
      { text: "Ela - Flores - Grim - Gridlock", correct: false },
    ],
  },
  {
    question:
      "Qual é o persongem grátis?",
    answers: [
      { text: "Azami", correct: false },
      { text: "Recruta", correct: true },
      { text: "Clash", correct: false },
      { text: "Bandit", correct: false },
    ],
  },
  {
    question:
      "Dos 4 operadores da Spetsnaz, qual deles possui a opção de trocar a mira no meio da rodada?",
    answers: [
      { text: "Kapkan", correct: false },
      { text: "Glaz", correct: true },
      { text: "Fuze", correct: false },
      { text: "Tachanka", correct: false },
    ],
  },
];





function enviarQuiz() {
  var totalAcertosVar = totalCorrect;
  var idUsuario = sessionStorage.ID_USUARIO

  fetch("/quiz/enviarQuiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({

      totalAcertosServer: totalAcertosVar,
      idUsuarioServer: idUsuario,
      pergunta1Server: pergunta1,
      pergunta2Server: pergunta2,
      pergunta3Server: pergunta3,
      pergunta4Server: pergunta4,
      pergunta5Server: pergunta5,
      pergunta6Server: pergunta6
    }),
  })
} 