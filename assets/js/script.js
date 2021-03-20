var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var submitButton = document.getElementById("submit");
var myQuestions = [
  {
    question: "Who invented JavaScript?",
    answers: {
      a: "Douglas Crockford",
      b: "Sheryl Sandberg",
      c: "Brendan Eich",
    },
    correctAnswer: "c",
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      a: "Node.js",
      b: "TypeScript",
      c: "npm",
    },
    correctAnswer: "c",
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: {
      a: "Angular",
      b: "jQuery",
      c: "RequireJS",
      d: "ESLint",
    },
    correctAnswer: "d",
  },
  {
    question: "Who is poopadoop?",
    answers: {
      a: "Pumpy",
      b: "Boogy",
      c: "Jubuu",
      d: "Poora",
    },
    correctAnswer: "b",
  },
];

function buildQuiz() {
  // variable to store the HTML output
  var output = [];

  // for each question...
  myQuestions.forEach((currentQuestion, questionNumber) => {
    // variable to store the list of possible answers
    var answers = [];

    // and for each available answer...
    for (letter in currentQuestion.answers) {
      // ...add an HTML radio button
      answers.push(
        `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
      );
    }

    // add this question and its answers to the output
    output.push(
      `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
    );
  });

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join("");
}

function showResults() {
  // gather answer containers from our quiz
  var answerContainers = quizContainer.querySelectorAll(".answers");

  // keep track of user's answers
  let numCorrect = 0;

  // for each question...
  myQuestions.forEach((currentQuestion, questionNumber) => {
    // find selected answer
    var answerContainer = answerContainers[questionNumber];
    var selector = `input[name=question${questionNumber}]:checked`;
    var userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if (userAnswer === currentQuestion.correctAnswer) {
      // add to the number of correct answers
      numCorrect++;

      // color the answers green
      answerContainers[questionNumber].style.color = "lightgreen";
    }
    // if answer is wrong or blank
    else {
      // color the answers red
      answerContainers[questionNumber].style.color = "red";
      timeleft = timeleft - 5;
    }
  });

  // show number of correct answers out of total
  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;

  if (numCorrect === 0) {
    timeleft = 1;
    document.getElementById("submit").disabled = true;
    document.getElementById("quiz").disabled = true;
  }
}

var timeleft = 60;
var downloadTimer = setInterval(function () {
  timeleft--;
  document.getElementById("countdown").textContent = timeleft;
  if (timeleft <= 0) clearInterval(downloadTimer);
}, 1000);

function refreshPage() {
  window.location.reload();
}

// display quiz right away
buildQuiz();

// on submit, show results
submitButton.addEventListener("click", showResults);
