import type { ConverterRepository } from '../../index'
import { Fraction, Real, UnitConverter } from '../../index'
import type { Unit } from '../types'

export default function (
  repository: ConverterRepository,
  system: string,
  authority: string
) {
  const domain = 'volume'

  const litreConverter = repository.find({ name: 'litre' })
  const litreScalar = new Real(new Fraction(4732, 10000))
  const pintConverter = repository.add(
    new UnitConverter(
      domain,
      system,
      authority,
      'pt',
      'pint',
      0,
      true,
      litreConverter,
      pint => pint.mul(litreScalar),
      litre => litre.div(litreScalar)
    )
  )

  const units: Unit[] = [
    {
      name: 'minim',
      symbol: 'min',
      scalar: new Real(new Fraction(1, 9600)),
      ordinal: -3,
      isMajor: true
    },
    {
      name: 'fluid dram',
      symbol: 'fl dr',
      scalar: new Real(new Fraction(1, 160)),
      ordinal: -2,
      isMajor: true
    },
    {
      name: 'fluid ounce',
      symbol: 'fl oz',
      scalar: new Real(new Fraction(1, 16)),
      ordinal: -1,
      isMajor: true
    },
    {
      name: 'quart',
      symbol: 'qt',
      scalar: new Real(2),
      ordinal: 1,
      isMajor: true
    },
    {
      name: 'gallon',
      symbol: 'gal',
      scalar: new Real(8),
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
        pintConverter,
        value => value.mul(scalar),
        value => value.div(scalar)
      )
    )
  }
}
