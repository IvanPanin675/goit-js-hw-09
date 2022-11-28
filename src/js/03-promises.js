import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } 
        reject({ position, delay });
    }, delay);
  });
};

const refs = {
  form: document.querySelector('.form'),
  delayEl: document.querySelector('input[name = "delay"]'),
  stepEl: document.querySelector('input[name = "step"]'),
  amountEl: document.querySelector('input[name = "amount"]')
};

refs.form.addEventListener('submit', onClick);

function onClick(e) {
  e.preventDefault();

  for (let i = 0; i < Number(refs.amountEl.value); i ++) {
    createPromise(i + 1, i * Number(refs.stepEl.value) + Number(refs.delayEl.value))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  e.target.reset();
};


console.log(refs.delayEl);
console.log(refs.stepEl);
console.log(refs.amountEl);