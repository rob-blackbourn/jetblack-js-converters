import type { ConverterRepository } from '../../../../index'
import { Real, UnitConverter } from '../../../../index'
import { Unit } from '../../../types'

export default function (
  repository: ConverterRepository,
  domain: string,
  system: string
) {
  const authority = 'NZ'

  const grammeConverter = repository.find({
    authority: 'si',
    system: 'metric',
    name: 'gramme'
  })

  const units: Unit[] = [
    {
      name: 'small',
      symbol: 'size 4',
      scalar: new Real(35),
      ordinal: 0,
      isMajor: true
    },
    {
      name: 'medium',
      symbol: 'size 5',
      scalar: new Real(44),
      ordinal: 1,
      isMajor: true
    },
    {
      name: 'standard',
      symbol: 'size 6',
      scalar: new Real(53),
      ordinal: 2,
      isMajor: true
    },
    {
      name: 'large',
      symbol: 'size 7',
      scalar: new Real(53),
      ordinal: 3,
      isMajor: true
    },
    {
      name: 'jumbo',
      symbol: 'size 8',
      scalar: new Real(68),
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
        grammeConverter,
        value => value.mul(scalar),
        value => value.div(scalar)
      )
    )
  }
}
