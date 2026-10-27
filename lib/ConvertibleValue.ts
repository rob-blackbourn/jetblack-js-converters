import { Fraction, Real, type RealInput } from './numbers'
import {
  ConverterCriteria,
  REPOSITORY,
  type ConverterOptions
} from './repository'
import { UnitConverter } from './UnitConverter'

export class ConvertibleValue extends Real {
  scalar: Real
  options?: ConverterOptions

  constructor(
    value: number | Fraction | Real,
    scalar: RealInput = 1,
    options?: ConverterOptions
  ) {
    super(value)
    this.scalar = Real.toReal(scalar)
    this.options = options
  }

  static parse(text: string): Real {
    return Real.parse(text)
  }

  of(domainScalarProvider: () => RealInput) {
    return new ConvertibleValue(
      this.value,
      domainScalarProvider(),
      this.options
    )
  }

  from(unit: UnitConverter | ConverterCriteria, options?: ConverterOptions) {
    const converter = REPOSITORY.toConverter(unit, options ?? this.options)
    return new ConvertibleValueAndUnit(this, converter)
  }
}

export class ConvertibleValueAndUnit extends ConvertibleValue {
  unit: UnitConverter

  constructor(value: ConvertibleValue, unit: UnitConverter) {
    super(value, value.scalar, value.options)
    this.unit = unit
  }

  toString(): string {
    return `${this.value.toString()} (${this.scalar}) ${this.unit.symbol}`
  }

  to(unit: UnitConverter | ConverterCriteria, options?: ConverterOptions) {
    const converter = REPOSITORY.toConverter(unit, options ?? this.options)
    const value = REPOSITORY.convert(
      this.unit,
      this.value,
      converter,
      this.scalar
    )
    if (value === undefined) {
      throw new Error('Conversion failed')
    }
    return new ConvertibleValueAndUnit(
      new ConvertibleValue(value, 1, this.options),
      converter
    )
  }
}

export function convert(
  value: RealInput,
  scalar: RealInput = 1,
  options?: ConverterOptions
): ConvertibleValue {
  return new ConvertibleValue(value, scalar, options)
}
