import flatpickr from "flatpickr";
import Notiflix from 'notiflix';

import "flatpickr/dist/flatpickr.min.css";


let selDate;

const refs = {
  myInput: document.querySelector("input"),
  buttonStart: document.querySelector('[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};

refs.buttonStart.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
   
    selDate = selectedDates[0].getTime();
    
    if (selDate > Date.now()) {
      Notiflix.Notify.success('Click "Start" button', {
        fontSize: '20px',
        timeout: 2000,
      });
      toggleButtonActivation(refs.buttonStart);
    } else {
      Notiflix.Notify.failure('Please choose a date in the future', {
      fontSize: '20px',
      timeout: 2000,
    })
    }
  },
};

flatpickr(refs.myInput, options);

function toggleButtonActivation(buttonEl) {
  if (buttonEl.hasAttribute('disabled')) {
    buttonEl.removeAttribute('disabled');
  } else {
    buttonEl.setAttribute('disabled', 'disabled');
  }
};

refs.buttonStart.addEventListener('click', showMustGoOn);

function showMustGoOn() {
  timer.onClose();
  refs.buttonStart.setAttribute('disabled', true);
};


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const timer = {
  intervalID: null,
  isActive: false,

  onClose() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;

    let lastTime = selDate - Date.now();

    this.intervalID = setInterval(() => {
      lastTime = lastTime -= 1000;
      console.log(lastTime);
      const timerComponents = convertMs(lastTime);
      updateClockFace(timerComponents);
      if (lastTime <= 1000) {
        clearInterval(this.intervalID);
      }
    }, 1000);
  },
};

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = `${days}`;
  refs.hoursEl.textContent = `${days}`;
  refs.minutesEl.textContent = `${minutes}`;
  refs.secondsEl.textContent = `${seconds}`;
};