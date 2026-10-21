import type { ConverterRepository } from '../../../../index'
import { Real, UnitConverter } from '../../../../index'
import { Unit } from '../../../types'

export default function (
  repository: ConverterRepository,
  domain: string,
  system: string
) {
  const authority = 'CA'

  const grammeConverter = repository.find({
    authority: 'si',
    system: 'metric',
    name: 'gramme'
  })

  const units: Unit[] = [
    {
      name: 'peewee',
      symbol: 'peewee',
      scalar: new Real(41),
      ordinal: 0,
      isMajor: true
    },
    {
      name: 'small',
      symbol: 'S',
      scalar: new Real(45),
      ordinal: 1,
      isMajor: true
    },
    {
      name: 'medium',
      symbol: 'M',
      scalar: new Real(52),
      ordinal: 2,
      isMajor: true
    },
    {
      name: 'large',
      symbol: 'L',
      scalar: new Real(59),
      ordinal: 3,
      isMajor: true
    },
    {
      name: 'very large',
      symbol: 'XL',
      scalar: new Real(66),
      ordinal: 4,
      isMajor: true
    },
    {
      name: 'jumbo',
      symbol: 'jumbo',
      scalar: new Real(70),
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
        grammeConverter,
        value => value.mul(scalar),
        value => value.div(scalar)
      )
    )
  }
}
