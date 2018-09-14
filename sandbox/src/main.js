import Rotator from '../dist/rotator.esm.js';

const tip = document.querySelector('#tip-value');
const protractor = document.querySelector('#protractor');
const r = new Rotator(protractor, {
    onRotate,
});

function onRotate(angle) {
    tip.innerText = `${(360 - angle).toFixed(1)}°`;
}
