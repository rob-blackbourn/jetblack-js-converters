import { Fraction, Real, type RealInput } from './numbers'
import {
  ConverterCriteria,
  REPOSITORY,
  type ConverterOptions
} from './repository'
import { UnitConverter } from './UnitConverter'

export class ConvertibleValue extends Real {
  private options?: ConverterOptions

  constructor(value: number | Fraction | Real, options?: ConverterOptions) {
    super(value)
    this.options = options
  }

  static parse(text: string): Real {
    return Real.parse(text)
  }

  from(unit: UnitConverter | ConverterCriteria, options?: ConverterOptions) {
    const converter = REPOSITORY.toConverter(unit, options ?? this.options)
    return new ConvertibleValueAndUnit(this, converter)
  }
}

export class ConvertibleValueAndUnit extends Real {
  unit: UnitConverter
  private options?: ConverterOptions

  constructor(
    value: number | Fraction | Real,
    unit: UnitConverter,
    options?: ConverterOptions
  ) {
    super(value)
    this.unit = unit
    this.options = options
  }

  toString(): string {
    return `${this.value.toString()} ${this.unit.symbol}`
  }

  to(unit: UnitConverter | ConverterCriteria, options?: ConverterOptions) {
    const converter = REPOSITORY.toConverter(unit, options ?? this.options)
    const value = this.unit.convert(this.value, converter)
    return new ConvertibleValueAndUnit(
      value,
      converter,
      options ?? this.options
    )
  }
}

export function convert(
  value: number | Fraction | Real,
  options?: ConverterOptions
): ConvertibleValue {
  return new ConvertibleValue(value, options)
}
