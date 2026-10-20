import type { ConverterRepository } from '../../index'
import { Fraction, Real, UnitConverter } from '../../index'

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

  const units = [
    { name: 'drop', symbol: 'drop', scalar: new Real(new Fraction(1, 576)) },
    { name: 'teaspoon', symbol: 'tsp', scalar: new Real(new Fraction(1, 6)) },
    {
      name: 'tablespoon',
      symbol: 'tbsp',
      scalar: new Real(new Fraction(1, 2))
    },
    { name: 'cup', symbol: 'cup', scalar: new Real(8) }
  ]

  for (const { name, symbol, scalar } of units) {
    repository.add(
      new UnitConverter(
        domain,
        system,
        authority,
        symbol,
        name,
        usaFluidOunceConverter,
        value => value.mul(scalar),
        value => value.div(scalar)
      )
    )
  }
}
