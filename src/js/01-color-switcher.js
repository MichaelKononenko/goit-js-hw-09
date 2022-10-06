const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');

startButton.addEventListener('click', doMagic);
stopButton.addEventListener('click', stopMagic);

let intervald;

function doMagic() {
  startButton.style.pointerEvents = 'none';
  intervald = setInterval(
    () => (body.style.backgroundColor = getRandomHexColor()),
    1000
  );
}

function stopMagic() {
  startButton.style.pointerEvents = 'auto';
  clearInterval(intervald);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
