// Color Click Game - Fixed Version
let colorScore = 0;
let colorHighScore = localStorage.getItem("colorHighScore") || 0;
document.getElementById("colorHighScore").textContent = colorHighScore;

let colorInterval = null;
let colorGameActive = false;

// Function to generate random color
function getRandomColor() {
  const colors = ["green", "blue", "orange", "purple", "yellow"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Start game function
window.startColorGame = function() {
  if (colorInterval) {
    clearInterval(colorInterval);
  }
  
  colorGameActive = true;
  colorInterval = setInterval(() => {
    document.getElementById("colorBox").style.backgroundColor = getRandomColor();
  }, 500);
};

// Pause game function
window.pauseColorGame = function() {
  colorGameActive = false;
  clearInterval(colorInterval);
  colorInterval = null;
};

// Reset game function
window.resetColorGame = function() {
  pauseColorGame();
  colorScore = 0;
  document.getElementById("colorScore").textContent = colorScore;
  document.getElementById("colorBox").style.backgroundColor = "red";
};

// Add click event to color box
document.getElementById("colorBox").addEventListener("click", function() {
  if (colorGameActive) {
    colorScore++;
    document.getElementById("colorScore").textContent = colorScore;
    if (colorScore > colorHighScore) {
      colorHighScore = colorScore;
      localStorage.setItem("colorHighScore", colorHighScore);
      document.getElementById("colorHighScore").textContent = colorHighScore;
    }
  }
});

// Quotes Slideshow - Fixed Version
const quotes = [
  "“The best way to get started is to quit talking and begin doing.” – Walt Disney",
  "“Don't let yesterday take up too much of today.” – Will Rogers",
  "“It's not whether you get knocked down, it's whether you get up.” – Vince Lombardi",
  "“People who are crazy enough to think they can change the world, are the ones who do.”",
  "“Push yourself, because no one else is going to do it for you.”"
];

function showQuote() {
  const quoteBox = document.getElementById("quoteBox");
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteBox.textContent = randomQuote;
  quoteBox.style.display = "block"; 
}

// Initialize and rotate quotes every 5 seconds
showQuote();
setInterval(showQuote, 5000);

// Dark Mode Toggle - Fixed Version
document.getElementById("darkMode").addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
  // Change button text based on current mode
  if (document.body.classList.contains("dark-mode")) {
    this.textContent = "☀️ Light Mode";
  } else {
    this.textContent = "🌙 Dark Mode";
  }
});