import { Fraction } from '../lib/numbers'

describe('numbers', () => {
  it('Should construct a simple fraction', () => {
    const f1 = new Fraction(1, 2)
    expect(f1.numerator).toBe(1)
    expect(f1.denominator).toBe(2)
  })

  it('Should simplify.', () => {
    const f1 = new Fraction(2, 4)
    expect(f1.numerator).toBe(1)
    expect(f1.denominator).toBe(2)
  })

  it('should return NaN', () => {
    const f = new Fraction(1, 0)
    expect(f.isNaN()).toBeTruthy()
  })

  it('should return construct fractions of value 1', () => {
    for (let i = 1; i <= 10; ++i) {
      const f = new Fraction(i, i)
      expect(1).toBe(f.numerator)
      expect(1).toBe(f.denominator)
    }
  })

  it('should normalize negatives', () => {
    const f1 = new Fraction(-1, -2)
    expect(f1.numerator).toBe(1)
    expect(f1.denominator).toBe(2)

    const f2 = new Fraction(-1, 2)
    expect(f2.numerator).toBe(-1)
    expect(f2.denominator).toBe(2)

    const f3 = new Fraction(1, -2)
    expect(f3.numerator).toBe(-1)
    expect(f3.denominator).toBe(2)
  })

  it('Should parse', () => {
    expect(Fraction.parse('1').toString()).toBe('1')
    expect(Fraction.parse('1/2').toString()).toBe('1/2')
    expect(Fraction.parse('3 1/2').toString()).toBe('3 1/2')
    expect(Fraction.parse('error').toString()).toBe('NaN')
  })

  it('should print and parse', () => {
    const a1 = new Fraction(3, 2)
    const a2 = a1.toString()
    const a3 = Fraction.parse(a2)
    const a4 = a3.toString()
    expect(a1.eq(a3)).toBeTruthy()
    expect(a2).toBe(a4)

    const b1 = new Fraction(1, 1)
    const b2 = b1.toString()
    const b3 = Fraction.parse(b2)
    const b4 = b3.toString()
    expect(b1.eq(b3)).toBeTruthy()
    expect(b2).toBe(b4)

    const c1 = new Fraction(1, 2)
    const c2 = c1.toString()
    const c3 = Fraction.parse(c2)
    const c4 = c3.toString()
    expect(c1.eq(c3)).toBeTruthy()
    expect(c2).toBe(c4)
  })

  it('Should round fraction to denominator', () => {
    let f1,
      f2,
      adj = new Fraction(1, 100)

    f1 = new Fraction(1, 5)
    f2 = f1.add(adj).roundTo([2, 3, 4, 5])
    expect(f2!.eq(f1)).toBeTruthy()

    f1 = new Fraction(1, 4)
    f2 = f1.add(adj).roundTo([2, 3, 4, 5])
    expect(f2!.eq(f1)).toBeTruthy()

    f1 = new Fraction(1, 3)
    f2 = f1.add(adj).roundTo([2, 3, 4, 5])
    expect(f2!.eq(f1)).toBeTruthy()

    f1 = new Fraction(1, 2)
    f2 = f1.add(adj).roundTo([2, 3, 4, 5])
    expect(f2!.eq(f1)).toBeTruthy()

    f1 = new Fraction(1, 4)
    f2 = f1.add(adj).roundTo([2, 3, 4, 5])
    expect(f2!.eq(f1)).toBeTruthy()
  })
})
