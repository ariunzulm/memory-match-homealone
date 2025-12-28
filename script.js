// necessities
const images = [
  { img: "images/1.png" },
  { img: "images/2.png" },
  { img: "images/3.png" },
  { img: "images/4.png" },
  { img: "images/5.png" },
  { img: "images/6.png" },
  { img: "images/7.png" },
  { img: "images/8.png" },
];

let firstCard = "";
let secondCard = "";
let canFlip = false;

let moves = 0;
let matches = 0;

let seconds = 0;
let timerRunning = false;
let timerInterval;

// set up start game

function startGame() {
  document.getElementById("gameBoard").innerHTML = "";

  let cardImages = images.concat(images);
  cardImages.sort(function () {
    return Math.random - 0.5;
  });

  for (let i = 0; i < cardImages.length; i++) {
    const card = document.createElement("div");

    card.className = "card";
    card.innerHTML = `<div class="card-front">
            <img src="images/card-front.png" alt="Kevin front" />
          </div>
          <div class="card-back">
            <img src="${cardImages[i].img}" alt="Other characters" />
          </div>`;
    card.onclick = flipCard;
    card.dataset.image = cardImages[i].img;
    gameBoard.appendChild(card);
  }
  firstCard = "";
  secondCard = "";
  moves = 0;
  matches = 0;
  seconds = 0;
  timerRunning = false;
  clearInterval(timerInterval);
}

startGame();

// turning cards
function flipCard() {
  if (!canFlip) {
    return;
  }
  if (this.classList.contains("flipped")) return;
  if (this.classList.contains("matched")) return;

  if (!timerRunning) {
    startTimer();
  }

  this.classList.add("flipped");
  if (firstCard === null) {
    firstCard = this;
  } else {
    secondCard = this;
    moves++;
    updateStatus();
  }
}
// matches cards
function checkMatch() {
  const match = firstCard.dataset.image === secondCard.dataset.image;
  if (match) {
    setTimeout(() => {
      secondCard.classList.add("matched");
      firstCard.classList.add("matched");
      matches++;
      resetCards();

      if (matches === 8) {
        endGame();
      }
    }, 500);
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      timerRunning = true;
      resetCards();
    }, 1000);
  }
}

// reset hands off
function resetCards() {
  firstCard = "";
  secondCard = "";
  canFlip = true;
}

// score board
function startTimer() {
  timerRunning = true;
  timerInterval = setInterval(() => {
    seconds++;
    updateStats();
  }, 1000);
}
function updateStats() {
  document.getElementById("moves").textContent = moves;
  document.getElementById("matches").textContent = matches + "/8";

  let mins = seconds / 60;
  let secs = seconds % 60;
  if (secs < 10) {
    secs = "0" + secs;
  }
  document.getElementById("time").textContent = mins + ":" + secs;
}

// play again
function endGame() {
  clearInterval(timerInterval);
  document.getElementById("finalMoves").textContent = moves;
  document.getElementById("finalTime").textContent =
    document.getElementById("time").textContent;
  document.getElementById("winModal").classList.add = "show";
  startGame();
}

function newGame() {
  clearInterval(timerInterval);
  document.getElementById("winModal").classList.remove = "show";
  startGame();
}
