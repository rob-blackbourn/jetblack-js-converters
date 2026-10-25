import type { ConverterRepository } from '../../index'
import { Fraction, Real, UnitConverter } from '../../index'
import { Unit } from '../types'

export default function (
  repository: ConverterRepository,
  domain: string,
  system: string
) {
  const authority = 'JP'

  const litreConverter = repository.find({ name: 'litre' })

  const units: Unit[] = [
    {
      name: 'go',
      symbol: 'go',
      scalar: new Real(new Fraction(2401, 133100)),
      ordinal: 0,
      isMajor: true
    },
    {
      name: 'cup',
      symbol: 'cup',
      scalar: new Real(new Fraction(200, 1000)),
      ordinal: 1,
      isMajor: false
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
