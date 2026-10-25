import { Real } from './numbers'
import type { RealInput } from './numbers/real'
export type Conversion = (value: Real) => Real

export class UnitConverter {
  private _domain: string
  private _system: string
  private _authority: string
  private _symbol: string
  private _name: string
  private _ordinal: number
  private _isMajor: boolean
  private _targetConverter: UnitConverter | null | undefined
  private _toTarget: Conversion | null
  private _fromTarget: Conversion | null

  constructor(
    domain: string,
    system: string,
    authority: string,
    symbol: string,
    name: string,
    ordinal: number,
    isMajor: boolean,
    targetConverter: UnitConverter | null | undefined = null,
    toTarget: Conversion | null = null,
    fromTarget: Conversion | null = null
  ) {
    this._domain = domain
    this._system = system
    this._authority = authority
    this._symbol = symbol
    this._name = name
    this._ordinal = ordinal
    this._isMajor = isMajor
    this._targetConverter = targetConverter
    this._toTarget = toTarget
    this._fromTarget = fromTarget
  }

  get domain() {
    return this._domain
  }

  get system() {
    return this._system
  }

  get authority() {
    return this._authority
  }

  get symbol() {
    return this._symbol
  }

  get name() {
    return this._name
  }

  get ordinal() {
    return this._ordinal
  }

  get isMajor() {
    return this._isMajor
  }

  get targetConverter() {
    return this._targetConverter
  }

  get toTarget() {
    return this._toTarget
  }

  get fromTarget() {
    return this._fromTarget
  }

  toString() {
    return `domain: ${this.domain}, system: ${this.system}, authority: ${this.authority}, symbol: ${this.symbol}, name: ${this.name}`
  }

  convert(input: RealInput, to: UnitConverter): Real {
    let value = input instanceof Real ? input : new Real(input)

    if (this === to) {
      return value
    }

    const converters = UnitConverter.prepareConverters(this, to)
    if (!converters) throw new Error('No conversion path between units')

    for (let converter of converters.from) {
      if (converter.toTarget) {
        value = converter.toTarget(value)
      }
    }

    for (let converter of converters.to) {
      if (converter.fromTarget) {
        value = converter.fromTarget(value)
      }
    }

    return value
  }

  simplify(
    value: RealInput,
    lowerThreshold: RealInput,
    upperThreshold: RealInput
  ): Real {
    value = Real.toReal(value)
    lowerThreshold = Real.toReal(lowerThreshold)
    upperThreshold = Real.toReal(upperThreshold)

    return value
  }

  static prepareConverters(
    fromConverter: UnitConverter | null | undefined,
    toConverter: UnitConverter | null | undefined
  ): { from: UnitConverter[]; to: UnitConverter[] } | null {
    let fromConverters: UnitConverter[] = []
    while (fromConverter) {
      fromConverters.push(fromConverter)
      fromConverter = fromConverter.targetConverter
    }

    let toConverters: UnitConverter[] = []
    while (toConverter) {
      const index = fromConverters.indexOf(toConverter)
      if (index != -1) {
        return { from: fromConverters.slice(0, index), to: toConverters }
      }
      toConverters.push(toConverter)
      toConverter = toConverter.targetConverter
    }

    return null
  }
}
