import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

startButton.addEventListener('click', handleClick);

function handleClick() {
  timer.start();
}

const timer = {
  intervalId: null,
  isActive: false,

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = new Date();
      const time = datePicker.selectedDates[0] - currentTime;
      const timeComponents = convertMs(time);
      updateClockFace(timeComponents, time);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },
};

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();

    ifDateInPast(selectedDates[0], currentDate);
  },
};

const datePicker = flatpickr('#datetime-picker', options);

function ifDateInPast(selectedDate, currentDate) {
  if (selectedDate < currentDate) {
    alert('Please choose a date in the future');
    return;
  }
  startButton.disabled = false;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateClockFace({ days, hours, minutes, seconds }, time) {
  if (time <= 0) {
    timer.stop();
    return;
  }
  dataDays.textContent = days;
  dataHours.textContent = hours;
  dataMinutes.textContent = minutes;
  dataSeconds.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
