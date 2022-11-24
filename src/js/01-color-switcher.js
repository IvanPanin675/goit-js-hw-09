const body = document.querySelector('body');
let timerId = null;

body.addEventListener('click', onBtnClick);

function onBtnClick(e) {
    if (e.target.textContent === 'Start') {
        timerId = setInterval(() => {
            body.style.backgroundColor = `${getRandomHexColor()}`;
        }, 1000);
        e.target.setAttribute('disabled', true);
    }; 
    if (e.target.textContent === 'Stop') {
        clearInterval(timerId); 
        e.target.previousElementSibling.removeAttribute('disabled');
    }; 
    
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};