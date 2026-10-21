import type { ConverterRepository } from '../../index'
import { Fraction, Real, UnitConverter } from '../../index'
import { Unit } from '../types'

export default function (
  repository: ConverterRepository,
  system: string,
  authority: string
) {
  const domain = 'volume'

  const litreConverter = repository.find({ name: 'litre' })
  const litreScalar = new Real(new Fraction(56826125, 100000000))
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
      ordinal: -5,
      isMajor: false
    },
    {
      name: 'fluid scruple',
      symbol: 'fl scruple',
      scalar: new Real(new Fraction(1, 480)),
      ordinal: -4,
      isMajor: false
    },
    {
      name: 'fluid drachm',
      symbol: 'fl dr',
      scalar: new Real(new Fraction(1, 160)),
      ordinal: -3,
      isMajor: false
    },
    {
      name: 'fluid ounce',
      symbol: 'fl oz',
      scalar: new Real(new Fraction(1, 20)),
      ordinal: -2,
      isMajor: true
    },
    {
      name: 'gill',
      symbol: 'gl',
      scalar: new Real(new Fraction(1, 4)),
      ordinal: -1,
      isMajor: false
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
