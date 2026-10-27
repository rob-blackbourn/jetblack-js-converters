import { Fraction, Real, type RealInput } from './numbers'
import {
  ConverterCriteria,
  REPOSITORY,
  type ConverterOptions
} from './repository'
import { UnitConverter } from './UnitConverter'

export class ConvertibleValue extends Real {
  domainScalar: Real
  options?: ConverterOptions

  constructor(
    value: number | Fraction | Real,
    domainScalar: RealInput = 1,
    options?: ConverterOptions
  ) {
    super(value)
    this.domainScalar = Real.toReal(domainScalar)
    this.options = options
  }

  static parse(text: string): Real {
    return Real.parse(text)
  }

  of(domainScalar: RealInput) {
    return new ConvertibleValue(this.value, domainScalar, this.options)
  }

  prefer(options: ConverterOptions) {
    return new ConvertibleValue(this, this.domainScalar, options)
  }

  from(
    unit: string | ConverterCriteria | UnitConverter,
    options?: ConverterOptions
  ) {
    const converter = REPOSITORY.toConverter(unit, options ?? this.options)
    return new ConvertibleValueAndUnit(this, converter)
  }
}

export class ConvertibleValueAndUnit extends ConvertibleValue {
  unit: UnitConverter

  constructor(value: ConvertibleValue, unit: UnitConverter) {
    super(value, value.domainScalar, value.options)
    this.unit = unit
  }

  toString(): string {
    return `${this.value.toString()} (${this.domainScalar}) ${this.unit.symbol}`
  }

  of(domainScalar: RealInput) {
    return new ConvertibleValueAndUnit(
      new ConvertibleValue(this, domainScalar, this.options),
      this.unit
    )
  }

  prefer(options: ConverterOptions) {
    return new ConvertibleValueAndUnit(
      new ConvertibleValue(this, this.domainScalar, options),
      this.unit
    )
  }

  to(
    unit: string | ConverterCriteria | UnitConverter,
    options?: ConverterOptions
  ) {
    const converter = REPOSITORY.toConverter(unit, options ?? this.options)
    const value = REPOSITORY.convert(
      this.unit,
      this.value,
      converter,
      this.domainScalar
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
