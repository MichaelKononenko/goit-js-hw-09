import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delayInput = document.querySelector('input[name=delay]');
const stepInput = document.querySelector('input[name=step]');
const amountInput = document.querySelector('input[name=amount]');
const submitButton = document.querySelector('button[type=submit]');

const inputs = {
  delay: 0,
  step: 0,
  amount: 0,
  positon: 0,
};

delayInput.addEventListener(
  'input',
  () => (inputs.delay = Number(delayInput.value))
);
stepInput.addEventListener(
  'input',
  () => (inputs.step = Number(stepInput.value))
);
amountInput.addEventListener(
  'input',
  () => (inputs.amount = Number(amountInput.value))
);
submitButton.addEventListener('click', event => {
  event.preventDefault();
  let newDelay = inputs.delay;

  for (let i = 0; i < inputs.amount; i++) {
    console.log(newDelay);
    console.log(inputs.delay);
    createPromise(inputs.positon, newDelay);
    inputs.positon += 1;
    newDelay += inputs.step;
  }
});

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
