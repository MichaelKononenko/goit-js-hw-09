import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');

const inputs = {
  delay: 0,
  step: 0,
  amount: 0,
  positon: 0,
};

form.addEventListener(
  'input',
  event => (inputs[event.target.name] = +event.target.value)
);

form.addEventListener('submit', startTimer);

function startTimer(event) {
  event.preventDefault();
  let newDelay = inputs.delay;

  for (let i = 0; i < inputs.amount; i++) {
    console.log(newDelay);
    console.log(inputs.delay);
    createPromise(inputs.positon, newDelay);
    inputs.positon += 1;
    newDelay += inputs.step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    const result = {
      position,
      delay,
    };

    if (shouldResolve) {
      resolve(result);
    } else {
      reject(result);
    }
  });

  promise
    .then(({ position, delay }) => {
      setTimeout(
        () => Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`),
        delay
      );
    })
    .catch(({ position, delay }) => {
      setTimeout(
        () => Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`),
        delay
      );
    });
}
