const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

startButton.addEventListener('click', addBcgColor);
stopButton.addEventListener('click', stopBcgColor);
let colorId = null;

function addBcgColor() {
  startButton.disabled = true;
  stopButton.disabled = false;
  colorId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopBcgColor() {
  clearInterval(colorId);
  startButton.disabled = false;
  stopButton.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
