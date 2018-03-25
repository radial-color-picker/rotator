import { PI_2 } from './constants.js';

export const normalizeAngle = angle => {
    const mod = angle % 360;

    return mod < 0 ? 360 + mod : mod;
}

export const diffBetweenAngles = (newAngle, oldAngle) => {
    const delta = newAngle - oldAngle;
    const radians = Math.atan2(Math.sin(delta), Math.cos(delta));

    return Math.round(radians * 1000) / 1000;
}

export const getRotationFromCoords = ({ x, y }, rect) => {
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // atan2 gives values between -180 to 180 deg
    // offset the angle by 90 degrees so that it's 0 to 360 deg
    return Math.atan2(y - cy, x - cx) + PI_2;
}

export const noop = () => {};
