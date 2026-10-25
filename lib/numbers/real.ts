import { Fraction } from './fraction'

export type RealInput = number | Fraction | Real
export type RealOperand = number | Fraction | Real

export class Real {
  value: number | Fraction

  constructor(value: number | Fraction | Real) {
    if (value instanceof Real) {
      this.value = value.value
    } else if (typeof value === 'number') {
      this.value = Number.isInteger(value) ? new Fraction(value, 1) : value
    } else if (value instanceof Fraction) {
      this.value = value.isNaN() ? Number.NaN : value
    } else {
      throw Error('Invalid real')
    }
  }

  static parse(text: string): Real {
    if (/^\s*[+-]?\d*\.\d+([Ee][+-]?\d+)?\s*$/.test(text)) {
      const value = parseFloat(text)
      return new Real(Number.isInteger(value) ? new Fraction(value, 1) : value)
    } else {
      const value = Fraction.parse(text)
      return new Real(value.isNaN() ? Number.NaN : value)
    }
  }

  toString(): string {
    return this.value.toString()
  }
  isFloat(): boolean {
    return typeof this.value === 'number'
  }
  valueOf(): number {
    return this.value.valueOf()
  }
  asFraction(tolerance?: number): Fraction {
    return this.value instanceof Fraction
      ? this.value
      : Fraction.fromFloat(this.value, tolerance)
  }

  static toReal(value: RealInput): Real {
    return value instanceof Real ? value : new Real(value)
  }

  private compare(other: RealInput): number {
    const rhs = Real.toReal(other)
    return this.value instanceof Fraction && rhs.value instanceof Fraction
      ? this.value.cmp(rhs.value)
      : this.valueOf() - rhs.valueOf()
  }
  eq(other: RealInput): boolean {
    const rhs = Real.toReal(other)
    return this.value instanceof Fraction && rhs.value instanceof Fraction
      ? this.value.eq(rhs.value)
      : this.valueOf() === rhs.valueOf()
  }
  ne(other: RealInput): boolean {
    return !this.eq(other)
  }
  lt(other: RealInput): boolean {
    return this.compare(other) < 0
  }
  le(other: RealInput): boolean {
    return this.compare(other) <= 0
  }
  gt(other: RealInput): boolean {
    return this.compare(other) > 0
  }
  ge(other: RealInput): boolean {
    return this.compare(other) >= 0
  }

  add(other: RealInput): Real {
    const rhs = Real.toReal(other)
    if (this.value instanceof Fraction && rhs.value instanceof Fraction) {
      return new Real(this.value.add(rhs.value))
    }

    return new Real(this.valueOf() + rhs.valueOf())
  }

  sub(other: RealInput): Real {
    const rhs = Real.toReal(other)
    if (this.value instanceof Fraction && rhs.value instanceof Fraction) {
      return new Real(this.value.sub(rhs.value))
    }

    return new Real(this.valueOf() - rhs.valueOf())
  }

  mul(other: RealInput): Real {
    const rhs = Real.toReal(other)
    if (this.value instanceof Fraction && rhs.value instanceof Fraction) {
      return new Real(this.value.mul(rhs.value))
    }

    return new Real(this.valueOf() * rhs.valueOf())
  }

  div(other: RealInput): Real {
    const rhs = Real.toReal(other)
    if (this.value instanceof Fraction && rhs.value instanceof Fraction) {
      return new Real(this.value.div(rhs.value))
    }

    return new Real(this.valueOf() / rhs.valueOf())
  }

  abs(): Real {
    return new Real(
      this.value instanceof Fraction
        ? this.value.abs()
        : Math.abs(this.valueOf())
    )
  }
}
