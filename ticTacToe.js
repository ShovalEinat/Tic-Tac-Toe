let playerText = document.getElementById('playerText');
let XscoreText = document.getElementById('Xscore');
let OscoreText = document.getElementById('Oscore');
let restartBtn = document.getElementById('restartBtn');
let turnText = document.getElementById('turn');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

let Xscore = 0;
let Oscore = 0;
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
let gameEnded = false;

const questions = [
  { question: '9²', answers: ['81', 'devAns'] },
  { question: '18²', answers: ['324', 'devAns'] },
  { question: '7³', answers: ['343', 'devAns'] },
  { question: '15²', answers: ['225', 'devAns'] },
  { question: '14²', answers: ['196', 'devAns'] },
  { question: '8³', answers: ['512', 'devAns'] },
  { question: '3⁴', answers: ['81', 'devAns'] },
  { question: '20X + 15 = 42 + 3 - 15 + 5x', answers: ['1', 'devAns'] },
  { question: '2X + 70 = 7X + 100', answers: ['-6', 'devAns'] },
  { question: '-2(5X+4) = 30 + 40 - 48', answers: ['-3', 'devAns'] },
  { question: '30X + 60 = -10 + 20 + 5X', answers: ['-2', 'devAns'] },
  { question: 'X = 3(9² - 78)', answers: ['9', 'devAns'] },
];

const startGame = () => {
  boxes.forEach((box) => box.addEventListener('click', boxClicked));
};

function boxClicked(e) {
  if (gameEnded) return;
  const id = e.target.id;

  if (!spaces[id]) {
    const question = askQuestion(currentPlayer);

    if (question) {
      const userAnswer = prompt(question.question);

      if (userAnswer === null || !question.answers.some(answer => userAnswer.trim().toLowerCase() === answer.toLowerCase())) {
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
        turnText.innerText = currentPlayer + "'s turn";
        if (currentPlayer == X_TEXT) {
          turnText.style.color = "red";
        } else {
          turnText.style.color = "yellow";
        }
        askQuestion(currentPlayer);
      } else {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon() !== false) {
          let winning_blocks = playerHasWon();
          var audio = new Audio('congratulations.mp3');
          audio.play();
          if (currentPlayer == X_TEXT) {
            Xscore++;
            XscoreText.innerText = "X's score = " + Xscore;
            playerText.innerText = "X has won!";
            playerText.style.color = "red";
          } else {
            Oscore++;
            OscoreText.innerText = "O's score = " + Oscore;
            playerText.innerText = "O has won!";
            playerText.style.color = "yellow";
          }
          winning_blocks.map((box) => (boxes[box].style.backgroundColor = winnerIndicator));
          gameEnded = true;
          return;
        }

        if (isDraw()) {
          playerText.innerHTML = "It's a draw!";
          playerText.style.color = "orange";
          gameEnded = true;
          return;
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
        turnText.innerText = currentPlayer + "'s turn";
        if (currentPlayer == X_TEXT) {
          turnText.style.color = "red";
        } else {
          turnText.style.color = "yellow";
        }
        askQuestion(currentPlayer);
      }
    }
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

function isDraw() {
  return spaces.every((space) => space !== null);
}

function askQuestion(player) {
  const question = getRandomQuestion();
  const answers = question.answers.map(answer => answer.toLowerCase());

  currentPlayer = player;

  return { question: question.question, answers };
}

function newGame() {
  location.reload();
}

function xIsTheOp() {
  Xscore = 91390924848932;
  XscoreText.innerText = "X's score = " + Xscore;
}

function getRandomQuestion() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}

restartBtn.addEventListener('click', restart);

function restart() {
  spaces.fill(null);

  boxes.forEach((box) => {
    box.innerText = '';
    box.style.backgroundColor = '';
    box.style.color = '';
    box.disabled = false;
  });

  playerText.innerHTML = 'Tic Tac Toe';
  turnText.innerText = "X's turn";
  turnText.style.color = "red";
  playerText.style.color = "white";

  currentPlayer = X_TEXT;
  gameEnded = false;
}

let rickRolledCount = 0;
document.getElementById("playerText").addEventListener("click", function() {
  rickRolledCount++;
  if (rickRolledCount === 5) {
    var neverGonna = new Audio("neverGonna.mp4");
    neverGonna.play();
    let video = document.getElementById("video");
    video.style.display = "block";
    video.requestFullscreen();
    rickRolledCount = 0;

    setTimeout(function() {
      alert("Get rickrolled!");
      video.style.display = "none";
      neverGonna.pause();
    }, 6000);
    
  }
});

startGame();
