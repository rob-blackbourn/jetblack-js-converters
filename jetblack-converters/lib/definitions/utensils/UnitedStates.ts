import type { ConverterRepository } from '../../index'
import { Fraction, Real, UnitConverter } from '../../index'
import { Unit } from '../types'

export default function (
  repository: ConverterRepository,
  domain: string,
  system: string
) {
  const authority = 'US'

  const usaFluidOunceConverter = repository.find({
    authority: authority,
    name: 'fluid ounce'
  })

  const units: Unit[] = [
    {
      name: 'drop',
      symbol: 'drop',
      scalar: new Real(new Fraction(1, 576)),
      ordinal: 0,
      isMajor: false
    },
    {
      name: 'teaspoon',
      symbol: 'tsp',
      scalar: new Real(new Fraction(1, 6)),
      ordinal: 1,
      isMajor: false
    },
    {
      name: 'tablespoon',
      symbol: 'tbsp',
      scalar: new Real(new Fraction(1, 2)),
      ordinal: 2,
      isMajor: true
    },
    {
      name: 'cup',
      symbol: 'cup',
      scalar: new Real(8),
      ordinal: 3,
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
        usaFluidOunceConverter,
        value => value.mul(scalar),
        value => value.div(scalar)
      )
    )
  }
}
