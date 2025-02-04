const colorCategories = {
    blue: [0, 0, 255],
    red: [255, 0, 0], 
    green: [0, 255, 0], 
    purple: [128, 0, 128], 
    yellow: [255, 255, 0],
    orange: [255, 165, 0],
    pink: [255, 192, 203],
    cyan: [0, 255, 255],
    lime: [0, 255, 127],
    brown: [139, 69, 19]
};

let score = 0;
let correctColor = "";
let correctRGB = [];

const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptionsContainer = document.querySelector(".color-options");
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreDisplay = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');
function generateColorOptions() {
    let colorKeys = Object.keys(colorCategories);
    let selectedColorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
    let baseRGB = colorCategories[selectedColorKey];

    let optionsSet = new Set();
    optionsSet.add(`rgb(${baseRGB[0]}, ${baseRGB[1]}, ${baseRGB[2]})`);

    while (optionsSet.size < 6) {
        let randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
        let randomRGB = colorCategories[randomKey];
        let newColor = `rgb(${randomRGB[0]}, ${randomRGB[1]}, ${randomRGB[2]})`;

        optionsSet.add(newColor);
    }

    let optionsArray = Array.from(optionsSet);
    optionsArray.sort(() => Math.random() - 0.5); 

    correctColor = `rgb(${baseRGB[0]}, ${baseRGB[1]}, ${baseRGB[2]})`;
    correctRGB = baseRGB;

    return optionsArray;
}


function startGame() {
    gameStatus.textContent = "Guess the correct color!";
    gameStatus.style.color = "black";

    let colors = generateColorOptions();

    colorBox.style.backgroundColor = correctColor;
    colorOptionsContainer.innerHTML = "";

    colors.forEach((color) => {
        let button = document.createElement("button");
        button.classList.add("color-option");
        button.style.backgroundColor = color;
        button.setAttribute("data-testid", "colorOption");

        button.addEventListener("click", () => checkGuess(color));
        colorOptionsContainer.appendChild(button);
    });
}

function checkGuess(selectedColor) {
    if (selectedColor === correctColor) {
        gameStatus.textContent = "Correct! You're Amazing!";
        gameStatus.style.color = "green";
        score++;
        scoreDisplay.textContent = score;

        colorBox.style.animation = "correctFlash 0.5s ease-in-out";
        setTimeout(() => {
            colorBox.style.animation = "";
            startGame();
        }, 800);
    } else {
        gameStatus.textContent = "Wrong! Try again.";
        gameStatus.style.color = "red";

        colorBox.style.animation = "shake 0.3s ease-in-out";
        setTimeout(() => colorBox.style.animation = "", 300);
    }
}

newGameButton.addEventListener("click", () => {
    score = 0;
    scoreDisplay.textContent = score;
    startGame();
});

startGame();