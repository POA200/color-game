
const colorCategories = {
    blue: [0, 0, 255],
    red: [255, 0, 0], 
    green: [0, 255, 0], 
    purple: [128, 0, 128], 
};


let score = 0;
let correctColor = "";
let correctRGB = [];


const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptionsContainer = document.querySelector(".color-options");
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreDisplay = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');


function generateColorShades(baseRGB) {
    let shades = [];
    let correctIndex = Math.floor(Math.random() * 6);

    for (let i = 0; i < 6; i++) {
        let variation = Math.floor(Math.random() * 80) - 40;
        let newColor = `rgb(${Math.min(255, Math.max(0, baseRGB[0] + variation))}, 
                            ${Math.min(255, Math.max(0, baseRGB[1] + variation))}, 
                            ${Math.min(255, Math.max(0, baseRGB[2] + variation))})`;
        shades.push(newColor);
    }

   
    shades[correctIndex] = `rgb(${baseRGB[0]}, ${baseRGB[1]}, ${baseRGB[2]})`;
    correctColor = shades[correctIndex];
    correctRGB = baseRGB;

    return shades;
}



function startGame() {
    gameStatus.textContent = "Guess the correct color!";
    gameStatus.style.color = "black";

 
    let colorKeys = Object.keys(colorCategories);
    let selectedColorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
    let baseRGB = colorCategories[selectedColorKey];

   
    let shades = generateColorShades(baseRGB);

    
    colorBox.style.backgroundColor = correctColor;

  
    colorOptionsContainer.innerHTML = "";

 
    shades.forEach((color) => {
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
        gameStatus.textContent = "Correct!";
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