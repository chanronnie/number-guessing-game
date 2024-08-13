"use script";

// STATE VARIABLES
let setup = document.querySelector(".container").classList;
let chances = Number(document.querySelector(".chances").textContent);
let secretNumber;

// BUTTON VARIABLES
const btnCheck = document.querySelector(".check");

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

    // Player's guess is correct
  } else if (guess === secretNumber) {
    displayMessage("Correct guess - Congratulations!");
    setup.replace("default-setup", "winner-setup");

    // Player's guess is too high
  } else if (guess > secretNumber) {
    updateGameWithMessage("Too high...");

    // Player's guess is too low
  } else if (guess < secretNumber) {
    updateGameWithMessage("Too low...");
  }
};

// ------------------------------ //
// EVENT HANDLERS

// Start the game with a secret number
generateSecretNumber();

// Handle button events
btnCheck.addEventListener("click", checkGuess);
