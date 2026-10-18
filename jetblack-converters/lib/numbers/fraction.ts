function tryParseInt(text: string | undefined, defaultValue: number): number {
  return text ? parseInt(text) : defaultValue
}

/**
 * Creates an instance of a Fraction.
 *
 * @constructor
 * @this {Fraction}
 * @param {number} numerator The numerator of the fraction.
 * @param {number} denominator The denominator of the fraction.
 *
 * @property {number} numerator The numerator of the fraction.
 */
export class Fraction {
  private _numerator: number
  private _denominator: number
  constructor(
    numerator: number = Number.NaN,
    denominator: number = Number.NaN
  ) {
    if (Number.isInteger(numerator) && Number.isInteger(denominator)) {
      this._numerator = numerator
      this._denominator = denominator
      Fraction.simplify(this)
    } else {
      this._numerator = 1
      this._denominator = 0
    }
  }

  get numerator() {
    return this._numerator
  }

  get denominator() {
    return this._denominator
  }

  static gcd(a: number, b: number): number {
    if (b == 0) {
      return a
    } else {
      return Fraction.gcd(b, a % b)
    }
  }

  static simplify(fraction: Fraction) {
    if (fraction._denominator == 0) {
      fraction._numerator = 1
      fraction._denominator = 0
    } else if (fraction._numerator === 0) {
      fraction._denominator = 1
    } else {
      const factor = Fraction.gcd(fraction._numerator, fraction._denominator)
      fraction._numerator /= factor
      fraction._denominator /= factor

      if (fraction._denominator < 0) {
        fraction._numerator = -fraction.numerator
        fraction._denominator = -fraction.denominator
      }
    }
  }

  static PATTERN =
    /^\s*(?<sign>-)?(?:(?<whole>[1-9]\d*)(?:\s+|$))?((?<numerator>[1-9]\d*)\s*\/\s*(?<denominator>[1-9]\d*))?\s*$/

  static parse(text: string): Fraction {
    let matches = text.match(Fraction.PATTERN)
    if (!matches || !matches.groups) {
      return new Fraction(0, 0)
    } else {
      const whole = tryParseInt(matches.groups.whole, 0)
      const numerator = tryParseInt(matches.groups.numerator, 0)
      const denominator = tryParseInt(matches.groups.denominator, 1)
      return new Fraction(numerator + whole * denominator, denominator)
    }
  }

  toString(): string {
    if (this._denominator == 0) {
      return Number.NaN.toString()
    }

    const whole = Math.trunc(this._numerator / this._denominator)
    if (whole) {
      const numerator = this._numerator - whole * this._denominator
      if (numerator == 0) {
        return whole.toString()
      } else {
        return whole + ' ' + numerator + '/' + this._denominator
      }
    } else {
      return this._numerator + '/' + this._denominator
    }
  }

  valueOf() {
    return this._denominator === 0
      ? Number.NaN
      : this._numerator / this._denominator
  }

  cmp(value: Fraction) {
    return (
      this._numerator * value.denominator - value.numerator * this._denominator
    )
  }

  eq(value: Fraction) {
    return this.cmp(value) === 0
  }

  ne(value: Fraction) {
    return !this.eq(value)
  }

  lt(value: Fraction) {
    return this.cmp(value) < 0
  }

  le(value: Fraction) {
    return this.cmp(value) <= 0
  }

  gt(value: Fraction) {
    return this.cmp(value) > 0
  }

  ge(value: Fraction) {
    return this.cmp(value) >= 0
  }

  add(value: Fraction) {
    return new Fraction(
      this._numerator * value.denominator + value.numerator * this._denominator,
      this._denominator * value.denominator
    )
  }

  sub(value: Fraction) {
    return new Fraction(
      this._numerator * value.denominator - value.numerator * this._denominator,
      this._denominator * value.denominator
    )
  }

  mul(value: Fraction) {
    return new Fraction(
      this._numerator * value.numerator,
      this._denominator * value.denominator
    )
  }

  div(value: Fraction) {
    return new Fraction(
      this._numerator * value.denominator,
      this._denominator * value.numerator
    )
  }

  abs() {
    if (this._numerator >= 0) {
      return this
    } else {
      return new Fraction(-this._numerator, this._denominator)
    }
  }

  isNaN() {
    return this._denominator == 0
  }

  static fromFloat(x: number, tolerance?: number) {
    if (!tolerance) tolerance = 1.0e-6

    let h1 = 1,
      h2 = 0,
      k1 = 0,
      k2 = 1
    let b = x
    do {
      const a = Math.floor(b)
      let aux = h1
      h1 = a * h1 + h2
      h2 = aux
      aux = k1
      k1 = a * k1 + k2
      k2 = aux
      b = 1 / (b - a)
    } while (Math.abs(x - h1 / k1) > x * tolerance)

    return new Fraction(Math.trunc(h1), Math.trunc(k1))
  }

  roundTo(denominators: readonly number[]): Fraction | null {
    let min = new Fraction(1, 1)
    let best: Fraction | null = null
    for (let denominator of denominators) {
      const a = this.numerator * denominator
      const b = this.denominator * denominator
      const c = Math.round(a / this.denominator)
      const f = new Fraction(c, denominator)
      const error = f.sub(this).abs()
      if (error.lt(min)) {
        best = f
        min = error
      }
    }
    return best
  }
}
