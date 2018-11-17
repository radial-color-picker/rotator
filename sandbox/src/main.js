import Rotator from '../dist/rotator.esm.js';

const tip = document.querySelector('#tip');
const tipValue = document.querySelector('#tip-value');
const protractor = document.querySelector('#protractor');
const r = new Rotator(protractor, {
    onRotate,
});

function onRotate(angle) {
    tipValue.innerText = `${(360 - angle).toFixed(1)}°`;
}

tip.addEventListener('click', event => {
    r.angle = 0;
    tipValue.innerText = '0°';
});
