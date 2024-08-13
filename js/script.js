"use script";

// STATE VARIABLES
let setup = document.querySelector(".container").classList;
let chances = Number(document.querySelector(".chances").textContent);
let secretNumber;

// BUTTON VARIABLES
const btnCheck = document.querySelector(".check");
const btnRestart = document.querySelector(".restart");

// ------------------------------ //
// GAME LOGIC FUNCTIONS
const generateSecretNumber = function () {
  secretNumber = Math.trunc(Math.random() * 20 + 1);
};

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

const displayChancesLeft = function (chances) {
  const chancesArray = document.querySelectorAll(".chances");
  for (let i = 0; i < chancesArray.length; i++) {
    chancesArray[i].textContent = chances;
  }
};

const endGame = function () {
  displayMessage("Game over.");
  displayChancesLeft(0);
  setup.replace("default-setup", "game-over-setup");
};

const updateGameWithMessage = function (message) {
  if (chances > 1) {
    chances--;
    displayMessage(message);
    displayChancesLeft(chances);
  } else {
    endGame();
  }
};

const checkGuess = function () {
  const guess = Number(document.querySelector(".guess").value);

  // Invalid input
  if (guess <= 0 || guess > 20) {
    displayMessage("Invalid - Please give a valid number");

    // When player wins
  } else if (guess === secretNumber) {
    displayMessage("Correct guess - Congratulations!");
    setup.replace("default-setup", "winner-setup");

    // When player's guess is too high
  } else if (guess > secretNumber) {
    updateGameWithMessage("Too high...");

    // When player's guess is too low
  } else if (guess < secretNumber) {
    updateGameWithMessage("Too low...");
  }
};

const restartGame = function () {
  // Reset state variables with a new secret number
  generateSecretNumber();
  chances = 10;

  // Reset to initial state
  document.querySelector(".guess").value = "";
  displayMessage("Start guessing...");
  displayChancesLeft(chances);

  if (setup[1] !== "default-setup") {
    const currentSetup = setup[1];
    setup.replace(currentSetup, "default-setup");
  }
};

// ------------------------------ //
// EVENT HANDLERS

// Start the game with a secret number
generateSecretNumber();

// Handle button events
btnCheck.addEventListener("click", checkGuess);
btnRestart.addEventListener("click", restartGame);
