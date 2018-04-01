import { TO_DEGREES, TO_RADIANS, HALF_DEGREE } from './constants.js';
import { getRotationFromCoords, diffBetweenAngles, normalizeAngle, noop } from './utils.js';

/**
 * Modified version of Denis Radin's
 * {@link https://github.com/PixelsCommander/Propeller Propeller}.
 */
export default class Rotator {
    constructor(element, options) {
        this.last = 0;
        this.cancelRafToken = null;
        this.active = false;
        this._angle = 0;
        this.virtualAngle = 0;
        this.element = element;
        this.element.style.willChange = 'transform';

        this.initOptions(options);
        this.updateCSS();
        this.bindHandlers();
        this.addListeners();
        this.update();
    }

    get angle() {
        return normalizeAngle(this._angle * TO_DEGREES);
    }

    set angle(value) {
        const rads = value * TO_RADIANS;

        this._angle = rads;
        this.virtualAngle = rads;
        this.updateCSS();
    }

    initOptions(options) {
        const defaults = {
            angle: 0,
            speed: 0,
            inertia: 0,
            minimalSpeed: HALF_DEGREE,
            minimalAngleChange: HALF_DEGREE,
        };

        options = options || defaults;

        this.onRotate = options.onRotate || noop;
        this.onStop = options.onStop || noop;
        this.onDragStop = options.onDragStop || noop;
        this.onDragStart = options.onDragStart || noop;

        this.angle = options.angle || defaults.angle;
        this.speed = options.speed * TO_RADIANS || defaults.speed;

        this.inertia = options.inertia || defaults.inertia;
        this.minimalSpeed = options.minimalSpeed || defaults.minimalSpeed;
        this.lastAppliedAngle = this.virtualAngle = this._angle = options.angle * TO_RADIANS || defaults.angle;
        this.minimalAngleChange = options.minimalAngleChange || defaults.minimalAngleChange;
    }

    bindHandlers() {
        this.update = this.update.bind(this);
        this.onRotationStart = this.onRotationStart.bind(this);
        this.onRotationStop = this.onRotationStop.bind(this);
        this.onRotated = this.onRotated.bind(this);
    }

    addListeners() {
        this.element.addEventListener('touchstart', this.onRotationStart, { passive: true });
        this.element.addEventListener('touchmove', this.onRotated);
        this.element.addEventListener('touchend', this.onRotationStop, { passive: true });
        this.element.addEventListener('touchcancel', this.onRotationStop, { passive: true });

        this.element.addEventListener('mousedown', this.onRotationStart, { passive: true });
        this.element.addEventListener('mousemove', this.onRotated);
        this.element.addEventListener('mouseup', this.onRotationStop, { passive: true });
        this.element.addEventListener('mouseleave', this.onRotationStop);
    }

    removeListeners() {
        this.element.removeEventListener('touchstart', this.onRotationStart);
        this.element.removeEventListener('touchmove', this.onRotated);
        this.element.removeEventListener('touchend', this.onRotationStop);
        this.element.removeEventListener('touchcancel', this.onRotationStop);

        this.element.removeEventListener('mousedown', this.onRotationStart);
        this.element.removeEventListener('mousemove', this.onRotated);
        this.element.removeEventListener('mouseup', this.onRotationStop);
        this.element.removeEventListener('mouseleave', this.onRotationStop);
    }

    destroy() {
        this.stop();
        this.removeListeners();
        window.cancelAnimationFrame(this.cancelRafToken);
    };

    stop() {
        this.speed = 0;
        this.onRotationStop();
    };

    onRotationStart(event) {
        this.initDrag();
        this.active = true;
        this.onDragStart(event);
    };

    onRotationStop() {
        if (this.active) {
            this.active = false;
            this.onDragStop();
        }

        this.active = false;
    }

    onRotated(event) {
        event.preventDefault();

        if (this.active) {
            if (event.targetTouches !== undefined && event.targetTouches[0] !== undefined) {
                this.lastMouseEvent = {
                    x: event.targetTouches[0].clientX,
                    y: event.targetTouches[0].clientY,
                };
            } else {
                this.lastMouseEvent = {
                    x: event.clientX,
                    y: event.clientY,
                };
            }
        }
    }

    update(now) {
        // Calculating angle on requestAnimationFrame only for optimisation purposes
        // 8ms is roughly 120fps
        if (!this.last || now - this.last >= 8) {
            this.last = now;

            if (this.lastMouseEvent !== undefined && this.active) {
                this.updateAngleToMouse(this.lastMouseEvent);
            }

            this._angle = this.virtualAngle;
            this.applySpeed();
            this.applyInertia();

            // Update rotation until the angle difference between prev and current angle is lower than the minimal angle change
            if (Math.abs(this.lastAppliedAngle - this._angle) >= this.minimalAngleChange) {
                this.updateCSS();

                if (this.onRotate !== undefined) {
                    this.onRotate(this.angle);
                }

                this.lastAppliedAngle = this._angle;
            }
        }

        this.cancelRafToken = window.requestAnimationFrame(this.update);
    }

    applySpeed() {
        if (this.inertia > 0 && this.speed !== 0 && this.active === false) {
            this.virtualAngle += this.speed;
        }
    }

    applyInertia() {
        if (this.inertia > 0) {
            if (Math.abs(this.speed) >= this.minimalSpeed) {
                this.speed = this.speed * this.inertia;

                // Execute onStop callback when speed is less than the given threshold
                if (this.active === false && Math.abs(this.speed) < this.minimalSpeed) {
                    this.onStop();
                }
            } else {
                // Stop rotation when rotation speed gets below a given threshold
                this.speed = 0;
            }
        }
    }

    setAngleFromEvent(ev) {
        const newAngle = getRotationFromCoords(
            { x: ev.clientX, y: ev.clientY },
            this.element.getBoundingClientRect()
        );

        this.angle = newAngle * TO_DEGREES;
    }

    updateAngleToMouse(newPoint) {
        const rect = this.element.getBoundingClientRect();
        const newMouseAngle = getRotationFromCoords(newPoint, rect);

        if (this.lastMouseAngle === undefined) {
            this.lastElementAngle = this.virtualAngle;
            this.lastMouseAngle = newMouseAngle;
        }

        const oldAngle = this.virtualAngle;
        this.mouseDiff = newMouseAngle - this.lastMouseAngle;
        this.virtualAngle = this.lastElementAngle + this.mouseDiff;
        this.speed = diffBetweenAngles(this.virtualAngle, oldAngle);
    }

    initDrag() {
        this.speed = 0;
        this.lastMouseAngle = undefined;
        this.lastElementAngle = undefined;
        this.lastMouseEvent = undefined;
    }

    updateCSS() {
        this.element.style.transform = `rotate(${this._angle}rad)`;
    }
}
