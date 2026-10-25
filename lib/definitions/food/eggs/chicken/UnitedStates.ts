import type { ConverterRepository } from '../../../../index'
import { Fraction, Real, UnitConverter } from '../../../../index'
import { Unit } from '../../../types'

export default function (
  repository: ConverterRepository,
  domain: string,
  system: string
) {
  const authority = 'US'

  const ounceConverter = repository.find({
    authority: authority,
    system: 'customary',
    name: 'ounce'
  })

  const units: Unit[] = [
    {
      name: 'peewee',
      symbol: 'peewee',
      scalar: new Real(new Fraction(5, 4)),
      ordinal: 0,
      isMajor: true
    },
    {
      name: 'small',
      symbol: 'S',
      scalar: new Real(new Fraction(3, 2)),
      ordinal: 1,
      isMajor: true
    },
    {
      name: 'medium',
      symbol: 'M',
      scalar: new Real(new Fraction(7, 4)),
      ordinal: 2,
      isMajor: true
    },
    {
      name: 'large',
      symbol: 'L',
      scalar: new Real(2),
      ordinal: 3,
      isMajor: true
    },
    {
      name: 'very large',
      symbol: 'XL',
      scalar: new Real(new Fraction(9, 4)),
      ordinal: 4,
      isMajor: true
    },
    {
      name: 'jumbo',
      symbol: 'jumbo',
      scalar: new Real(new Fraction(5, 2)),
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
        ounceConverter,
        value => value.mul(scalar),
        value => value.div(scalar)
      )
    )
  }
}
