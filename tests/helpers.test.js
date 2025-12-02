import { describe, it, expect } from 'vitest'
import { randomRange, degToRad, lerp } from '../src/utils/helpers.js'

describe('Helper Functions', () => {
    it('randomRange returns value between min and max', () => {
        const value = randomRange(0, 10)
        expect(value).toBeGreaterThanOrEqual(0)
        expect(value).toBeLessThanOrEqual(10)
    })

    it('degToRad converts degrees to radians', () => {
        expect(degToRad(180)).toBeCloseTo(Math.PI)
        expect(degToRad(90)).toBeCloseTo(Math.PI / 2)
        expect(degToRad(0)).toBe(0)
    })

    it('lerp interpolates correctly', () => {
        expect(lerp(0, 10, 0)).toBe(0)
        expect(lerp(0, 10, 1)).toBe(10)
        expect(lerp(0, 10, 0.5)).toBe(5)
    })
})