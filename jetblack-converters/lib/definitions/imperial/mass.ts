import type { ConverterRepository } from '../../index'
import { Fraction, Real, UnitConverter } from '../../index'
import { Unit } from '../types'

export default function (
  repository: ConverterRepository,
  system: string,
  authority: string
) {
  const domain = 'mass'

  const grammeConverter = repository.find({ name: 'gramme' })
  const grammeScalar = new Real(new Fraction(45359237, 100000))
  const poundConverter = repository.add(
    new UnitConverter(
      domain,
      system,
      authority,
      'lb',
      'pound',
      0,
      true,
      grammeConverter,
      pound => pound.mul(grammeScalar),
      gramme => gramme.div(grammeScalar)
    )
  )

  const units: Unit[] = [
    {
      name: 'grain',
      symbol: 'gr',
      scalar: new Real(new Fraction(1, 7000)),
      ordinal: -3,
      isMajor: true
    },
    {
      name: 'drachm',
      symbol: 'dr',
      scalar: new Real(new Fraction(1, 256)),
      ordinal: -2,
      isMajor: true
    },
    {
      name: 'ounce',
      symbol: 'oz',
      scalar: new Real(new Fraction(1, 16)),
      ordinal: -1,
      isMajor: true
    },
    {
      name: 'stone',
      symbol: 'st',
      scalar: new Real(14),
      ordinal: 1,
      isMajor: true
    },
    {
      name: 'quarter',
      symbol: 'qtr',
      scalar: new Real(28),
      ordinal: 2,
      isMajor: true
    },
    {
      name: 'hundredweight',
      symbol: 'cwt',
      scalar: new Real(112),
      ordinal: 3,
      isMajor: true
    },
    {
      name: 'ton',
      symbol: 'tn',
      scalar: new Real(2240),
      ordinal: 4,
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
        poundConverter,
        value => value.mul(scalar),
        value => value.div(scalar)
      )
    )
  }
}
