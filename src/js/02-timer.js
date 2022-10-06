import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

startButton.style.pointerEvents = 'none';

startButton.addEventListener('click', doMagic);

let presentTime = new Date().getTime();
let finalDate = 0;
let timeLeft = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    finalDate = selectedDates[0].getTime();
    if (presentTime > finalDate) {
      startButton.style.pointerEvents = 'none';
      alert('Please choose a date in the future');
    } else {
      startButton.style.pointerEvents = 'auto';
    }
  },
};

flatpickr('#datetime-picker', options);

function doMagic() {
  setInterval(() => {
    presentTime = new Date().getTime();
    timeLeft = finalDate - presentTime;
    calculateTime();
  }, 1000);
}

function calculateTime() {
  let days = Math.floor(timeLeft / 1000 / 60 / 60 / 24)
    .toString()
    .padStart(2, '0');
  const hours = (Math.floor(timeLeft / 1000 / 60 / 60) % 24)
    .toString()
    .padStart(2, '0');
  const minutes = (Math.floor(timeLeft / 1000 / 60) % 60)
    .toString()
    .padStart(2, '0');
  const seconds = (Math.floor(timeLeft / 1000) % 60)
    .toString()
    .padStart(2, '0');

  renderTime({ days, hours, minutes, seconds });
}

function renderTime({ days, hours, minutes, seconds }) {
  // console.log(days, ':', hours, ':', minutes, ':', seconds);
  daysSpan.textContent = days;
  hoursSpan.textContent = hours;
  minutesSpan.textContent = minutes;
  secondsSpan.textContent = seconds;
}
