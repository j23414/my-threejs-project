/**
 * Generate random number between min and max
 */
export function randomRange(min, max) {
    return Math.random() * (max - min) + min
}

/**
 * Convert degrees to radians
 */
export function degToRad(degrees) {
    return degrees * (Math.PI / 180)
}

/**
 * Lerp between two values
 */
export function lerp(start, end, t) {
    return start * (1 - t) + end * t
}