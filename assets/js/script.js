var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var submitButton = document.getElementById("submit");
var retryButton = document.getElementById("retryQuiz");
// var highScore = document.getElementById("results");
var highestScore = 0;

//Javascript Questions
var myQuestions = [
  {
    question: "1) Who invented JavaScript ?",
    answers: {
      "a": "Douglas Crockford",
      "b": "Sheryl Sandberg",
      "c": "Brendan Eich"
    },
    correctAnswer: "c"
  },
  {
    question: "2) Which one of these is a JavaScript package manager ?",
    answers: {
      "a": "Node.js",
      "b": "TypeScript",
      "c": "npm"
    },
    correctAnswer: "c"
  },
  {
    question: "3) How do you write 'Hello World' in an alert box ?",
    answers: {
      "a": "msgBox('Hello World');",
      "b": "alertBox('Hello World');",
      "c": "msg('Hello World');",
      "d": "alert('Hello World');"
    },
    correctAnswer: "d"
  },
  {
    question: "4) How do you create a function in JavaScript ?",
    answers: {
      "a": "function myFunction()",
      "b": "function = myFunction()",
      "c": "function:myFunction()",
      "d": "function myFunction[]"
    },
    correctAnswer: "a"
  },
  {
    question: "5) How can you add a comment in a JavaScript ?",
    answers: {
      "a": "//This is a comment",
      "b": "'This is a comment",
      "c": ":This is a comment:"
    },
    correctAnswer: "a"
  },
];

function buildQuiz() {
  // variable to store the HTML output in array
  var output = [];

  // for each question
  myQuestions.forEach((currentQuestion, questionNumber) => {
    // variable to store the list of possible answers in array
    var answers = [];

    // and for each available answer
    for (letter in currentQuestion.answers) {
      // add an HTML radio button
      answers.push(
        `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${currentQuestion.answers[letter]}
          </label>`
      );
    }

    // add this question and its answers to the output
    output.push(
      `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>
        <br\>`
    );
  });

  // combine output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join("");
  submitButton.disabled = false;
}

function showResults() {
  // gather answer containers from quiz
  var answerContainers = quizContainer.querySelectorAll(".answers");

  // track of user's answers
  let numCorrect = 0;

  // find selected answer
  myQuestions.forEach((currentQuestion, questionNumber) => {
    var answerContainer = answerContainers[questionNumber];
    var selector = `input[name=question${questionNumber}]:checked`;
    var userAnswer = (answerContainer.querySelector(selector) || {}).value; 
    // console.log(userAnswer);
    // if the answer is correct
    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
      // color the answers green
      answerContainers[questionNumber].style.color = "green";
    }
    // if answer is wrong or blank
    else {
      // color the answers red and remove 5 seconds from the timer
      answerContainers[questionNumber].style.color = "red";
    }
  });

  // show number of correct answers out of total
  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  if (numCorrect > highestScore) {
    highestScore = numCorrect;
  }
  highestScoreLabel.innerHTML = `${highestScore}`;
  localStorage.setItem("results", numCorrect);

  if (numCorrect === 5) {
    timeleft = 1;
    document.getElementById("submit").disabled = true;
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}. A perfect score!`;
  }
  submitButton.disabled = true;
}



var timeleft = 60;
var downloadTimer = setInterval(function () {
  timeleft--;
  document.getElementById("countdown").textContent = timeleft;
  if (timeleft <= 0) {
    clearInterval(downloadTimer);
    submitButton.disabled = true;
    retryButton.disabled = true;
  }
  
}, 1000);

function refreshPage() {
  window.location.reload();
}


// display quiz right away
buildQuiz();

// on submit, show results
submitButton.addEventListener("click", showResults);
retryButton.addEventListener("click", buildQuiz);


