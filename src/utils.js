const TO_DEGREES = 180 / Math.PI;

export const normalizeAngle = angle => {
    const mod = angle % 360;

    return mod < 0 ? 360 + mod : mod;
}

export const getRotationFromCoords = ({ x, y }, rect) => {
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    return Math.atan2(y - cy, x - cx) * TO_DEGREES;
}

export const noop = () => {};
