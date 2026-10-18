import { Fraction, Real } from '../lib/numbers'

describe('Real', () => {
  it('should construct a Real from a float', () => {
    const r = new Real(1.5)
    expect(r.valueOf()).toBe(1.5)
    expect(r.eq(1.5)).toBeTruthy()
    expect(typeof r.value).toBe('number')
  })

  it('should construct a Real from a string', () => {
    const r = new Real('1.5')
    expect(r.valueOf()).toBe(1.5)
    expect(r.eq(1.5)).toBeTruthy()
    expect(typeof r.value).toBe('number')
  })

  it('should construct a Real from a Fraction', () => {
    const f = new Fraction(3, 2)
    const r = new Real(f)
    expect(r.valueOf()).toBe(1.5)
    expect(r.eq(1.5)).toBeTruthy()
    expect(r.value instanceof Fraction).toBeTruthy()
  })

  it('should construct a Real from another Real', () => {
    const r1 = new Real(1.5)
    const r2 = new Real(r1)
    expect(r2.valueOf()).toBe(1.5)
  })

  it('should construct a Real from an int as a Fraction', () => {
    const r = new Real(1)
    expect(r.valueOf()).toBe(1)
    expect(r.eq(1)).toBeTruthy()
    expect(r.value instanceof Fraction).toBeTruthy()
  })

  it('should maintain a Real as a Fraction', () => {
    const r = new Real(3).add(3).div(6)
    expect(r.valueOf()).toBe(1)
    expect(r.eq(1)).toBeTruthy()
    expect(r.value instanceof Fraction).toBeTruthy()
  })

  it('should handle scientific notation', () => {
    const r1 = new Real('2.3e9')
    const r2 = new Real(2.3e9)
    expect(r1).toEqual(r2)
  })
})
