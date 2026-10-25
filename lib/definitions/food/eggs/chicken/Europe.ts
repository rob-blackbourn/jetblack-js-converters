import type { ConverterRepository } from '../../../../index'
import { Real, UnitConverter } from '../../../../index'
import { Unit } from '../../../types'

export default function (
  repository: ConverterRepository,
  domain: string,
  system: string
) {
  const authority = 'EU'

  const grammeConverter = repository.find({
    authority: 'si',
    system: 'metric',
    name: 'gramme'
  })

  const units: Unit[] = [
    {
      name: 'small',
      symbol: 'S',
      scalar: new Real(53),
      ordinal: 0,
      isMajor: true
    },
    {
      name: 'medium',
      symbol: 'M',
      scalar: new Real(58),
      ordinal: 1,
      isMajor: true
    },
    {
      name: 'large',
      symbol: 'L',
      scalar: new Real(68),
      ordinal: 2,
      isMajor: true
    },
    {
      name: 'very large',
      symbol: 'XL',
      scalar: new Real(73),
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
        grammeConverter,
        value => value.mul(scalar),
        value => value.div(scalar)
      )
    )
  }
}
