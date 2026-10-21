import type { ConverterRepository } from '../../index'
import { Fraction, Real, UnitConverter } from '../../index'
import { Unit } from '../types'

export default function (
  repository: ConverterRepository,
  domain: string,
  system: string
) {
  const authority = 'FDA'

  const litreConverter = repository.find({ name: 'litre' })

  const units: Unit[] = [
    {
      name: 'teaspoon',
      symbol: 'tsp',
      scalar: new Real(new Fraction(5, 1000)),
      ordinal: 0,
      isMajor: true
    },
    {
      name: 'tablespoon',
      symbol: 'tbsp',
      scalar: new Real(new Fraction(15, 1000)),
      ordinal: 1,
      isMajor: true
    },
    {
      name: 'cup',
      symbol: 'cup',
      scalar: new Real(new Fraction(240, 1000)),
      ordinal: 2,
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
        litreConverter,
        value => value.mul(scalar),
        value => value.div(scalar)
      )
    )
  }
}
