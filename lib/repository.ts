import { UnitConverter } from './UnitConverter'
import { DomainConverter } from './DomainConverter'
import type { RealInput } from './numbers/real'
import { Real } from './numbers'

export interface ConverterCriteria {
  domain?: string
  system?: string
  authority?: string
  symbol?: string
  name?: string
}

export class DomainConverterRepository {
  private _domainConverters: DomainConverter[]

  constructor() {
    this._domainConverters = []
  }

  get domainConverters() {
    return this._domainConverters
  }

  add(domainConverter: DomainConverter) {
    this._domainConverters.push(domainConverter)
    return domainConverter
  }

  find(
    sourceDomain: string,
    targetDomain: string
  ): DomainConverter | undefined {
    for (const domainConverter of this._domainConverters) {
      if (
        (sourceDomain == domainConverter.sourceConverter.domain &&
          targetDomain == domainConverter.targetConverter.domain) ||
        (sourceDomain == domainConverter.targetConverter.domain &&
          targetDomain == domainConverter.sourceConverter.domain)
      ) {
        return domainConverter
      }
    }
  }
}

export class ConverterRepository {
  private _converters: UnitConverter[]
  private _domainConverters: DomainConverterRepository

  constructor() {
    this._converters = []
    this._domainConverters = new DomainConverterRepository()
  }

  get converters() {
    return this._converters
  }

  get domainConverters() {
    return this._domainConverters
  }

  add(converter: UnitConverter) {
    this._converters.push(converter)
    return converter
  }

  find(
    criteria: ConverterCriteria,
    preferredSystem?: string,
    preferredAuthority?: string
  ): UnitConverter | undefined {
    let possibles = this.findAll(criteria, preferredSystem, preferredAuthority)

    return possibles.length > 0 ? possibles[0] : undefined
  }

  findAll(
    criteria: ConverterCriteria,
    preferredSystem?: string,
    preferredAuthority?: string
  ): UnitConverter[] {
    let possibles = this._converters
    possibles = ConverterRepository.filter(
      possibles,
      criteria.domain,
      converter => converter.domain
    )
    possibles = ConverterRepository.filter(
      possibles,
      criteria.system,
      converter => converter.system
    )
    possibles = ConverterRepository.filter(
      possibles,
      criteria.authority,
      converter => converter.authority
    )
    possibles = ConverterRepository.filter(
      possibles,
      criteria.symbol,
      converter => converter.symbol
    )
    possibles = ConverterRepository.filter(
      possibles,
      criteria.name,
      converter => converter.name
    )

    possibles = this.filterPossibles(
      possibles,
      preferredSystem,
      preferredAuthority
    )

    return possibles
  }

  private filterPossibles(
    possibles: UnitConverter[],
    preferredSystem?: string,
    preferredAuthority?: string
  ): UnitConverter[] {
    if (possibles.length > 1) {
      const filtered = ConverterRepository.filter(
        possibles,
        preferredSystem,
        converter => converter.system
      )
      if (filtered.length > 0) {
        possibles = filtered
      }
    }

    if (possibles.length > 1) {
      const filtered = ConverterRepository.filter(
        possibles,
        preferredAuthority,
        converter => converter.authority
      )
      if (filtered.length > 0) {
        possibles = filtered
      }
    }

    return possibles
  }

  convert(
    converter: UnitConverter,
    value: RealInput,
    targetConverter: UnitConverter,
    scalar?: Real
  ): Real | undefined {
    if (converter.domain == targetConverter.domain) {
      return converter.convert(value, targetConverter)
    } else {
      const domainConverter = this._domainConverters.find(
        converter.domain,
        targetConverter.domain
      )
      if (domainConverter) {
        return domainConverter.convert(
          value,
          converter,
          targetConverter,
          scalar
        )
      }
    }
  }

  private static filter(
    candidates: UnitConverter[],
    criterium: string | undefined,
    getter: (converter: UnitConverter) => string
  ) {
    if (criterium) {
      const possibles = []
      for (const candidate of candidates) {
        if (getter(candidate) == criterium) {
          possibles.push(candidate)
        }
      }
      return possibles
    } else {
      return candidates
    }
  }

  simplifyInDirection(
    converter: UnitConverter,
    value: Real,
    distanceFromOne: Real,
    converters: UnitConverter[]
  ): [UnitConverter, Real] {
    while (converters.length > 0) {
      const nextConverter = converters.pop()!

      const nextValue = converter.convert(value, nextConverter)
      const nextDistanceFromOne = nextValue.sub(1)
      if (nextDistanceFromOne.abs() > distanceFromOne.abs()) {
        return [converter, value]
      }
      distanceFromOne = nextDistanceFromOne
      converter = nextConverter
      value = nextValue
    }

    return [converter, value]
  }

  simplify(converter: UnitConverter, value: RealInput): [UnitConverter, Real] {
    value = Real.toReal(value)

    const criteria: ConverterCriteria = {
      domain: converter.domain,
      system: converter.system,
      authority: converter.authority
    }
    let converters = this.findAll(criteria)

    const distanceFromOne = value.sub(1)

    if (distanceFromOne.lt(1)) {
      converters = converters
        .filter(c => c.ordinal < converter.ordinal)
        .sort((a, b) => a.ordinal - b.ordinal)
      return this.simplifyInDirection(
        converter,
        value,
        distanceFromOne,
        converters
      )
    } else if (distanceFromOne.gt(1)) {
      converters = converters
        .filter(c => c.ordinal > converter.ordinal)
        .sort((a, b) => b.ordinal - a.ordinal)
      return this.simplifyInDirection(
        converter,
        value,
        distanceFromOne,
        converters
      )
    }

    return [converter, value]
  }
}

export const REPOSITORY = new ConverterRepository()
