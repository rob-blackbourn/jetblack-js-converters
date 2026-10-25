import type { ConverterRepository } from '../../index'
import { Fraction, Real, UnitConverter } from '../../index'
import type { Unit } from '../types'

export default function (
  repository: ConverterRepository,
  system: string,
  authority: string
) {
  const domain = 'length'

  const meterConverter = repository.find({ name: 'meter' })

  const meterScalar = new Real(new Fraction(3048, 10000))
  const feetConverter = repository.add(
    new UnitConverter(
      domain,
      system,
      authority,
      'ft',
      'feet',
      0,
      true,
      meterConverter,
      value => value.mul(meterScalar),
      value => value.div(meterScalar)
    )
  )

  const units: Unit[] = [
    {
      name: 'thou',
      symbol: 'th',
      scalar: new Real(new Fraction(1, 12000)),
      ordinal: -2,
      isMajor: true
    },
    {
      name: 'inch',
      symbol: 'in',
      scalar: new Real(new Fraction(1, 12)),
      ordinal: -1,
      isMajor: true
    },
    {
      name: 'yard',
      symbol: 'yd',
      scalar: new Real(3),
      ordinal: 1,
      isMajor: true
    },
    {
      name: 'chain',
      symbol: 'ch',
      scalar: new Real(66),
      ordinal: 2,
      isMajor: true
    },
    {
      name: 'furlong',
      symbol: 'fur',
      scalar: new Real(660),
      ordinal: 3,
      isMajor: true
    },
    {
      name: 'mile',
      symbol: 'mi',
      scalar: new Real(5280),
      ordinal: 4,
      isMajor: true
    },
    {
      name: 'league',
      symbol: 'lea',
      scalar: new Real(15840),
      ordinal: 5,
      isMajor: true
    }
  ]

  for (const { name, symbol, scalar, ordinal, isMajor } of units) {
    repository.add(
      new UnitConverter(
        domain,
        system,
        authority,
        symbol,
        name,
        ordinal,
        isMajor,
        feetConverter,
        value => value.mul(scalar),
        value => value.div(scalar)
      )
    )
  }
}
