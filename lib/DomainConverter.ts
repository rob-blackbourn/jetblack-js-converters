import { UnitConverter } from './UnitConverter'
import { Real } from './numbers'
import type { RealInput } from './numbers/real'
export type DomainConversion = (value: Real, scalar?: Real) => Real

export class DomainConverter {
  private _sourceConverter: UnitConverter
  private _targetConverter: UnitConverter
  private _convertTo: DomainConversion
  private _convertFrom: DomainConversion

  constructor(
    sourceConverter: UnitConverter,
    targetConverter: UnitConverter,
    convertTo: DomainConversion,
    convertFrom: DomainConversion
  ) {
    this._sourceConverter = sourceConverter
    this._targetConverter = targetConverter
    this._convertTo = convertTo
    this._convertFrom = convertFrom
  }

  get sourceConverter() {
    return this._sourceConverter
  }

  get targetConverter() {
    return this._targetConverter
  }

  get convertTo() {
    return this._convertTo
  }

  get convertFrom() {
    return this._convertFrom
  }

  convert(
    input: RealInput,
    from: UnitConverter,
    to: UnitConverter,
    scalar?: Real
  ): Real | undefined {
    let value = input instanceof Real ? input : new Real(input)
    if (from.domain == this._sourceConverter.domain) {
      value = from.convert(value, this._sourceConverter)
      value = this._convertTo(value, scalar)
      return this._targetConverter.convert(value, to)
    } else if (to.domain == this._sourceConverter.domain) {
      value = from.convert(value, this.targetConverter)
      value = this._convertFrom(value, scalar)
      return this._sourceConverter.convert(value, to)
    }
  }

  toString() {
    return this._sourceConverter.domain + ' to ' + this._targetConverter.domain
  }
}
