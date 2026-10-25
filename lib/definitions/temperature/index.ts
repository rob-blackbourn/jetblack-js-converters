import type { ConverterRepository } from '../../index'
import { Fraction, Real, UnitConverter } from '../../index'

export default function (repository: ConverterRepository) {
  const kelvinConverter = repository.find({ name: 'Kelvin' })

  const celsiusOffset = new Real(new Fraction(27315, 100))
  const celsiusConverter = repository.add(
    new UnitConverter(
      'temperature',
      'metric',
      'si',
      '\u00b0C',
      'Celsius',
      1,
      true,
      kelvinConverter,
      celsius => celsius.add(celsiusOffset),
      kelvin => kelvin.sub(celsiusOffset)
    )
  )

  const fahrenheitOffset = new Real(32)
  const fahrenheitScalar = new Real(new Fraction(9, 5))
  repository.add(
    new UnitConverter(
      'temperature',
      'imperial',
      'UK',
      '\u00b0F',
      'Fahrenheit',
      0,
      true,
      celsiusConverter,
      fahrenheit => fahrenheit.sub(fahrenheitOffset).div(fahrenheitScalar),
      celsius => celsius.mul(fahrenheitScalar).add(fahrenheitOffset)
    )
  )

  const gasMarkScalar = new Real(14)
  const gasMarkOffset = new Real(121)
  repository.add(
    new UnitConverter(
      'temperature',
      'imperial',
      'UK',
      'GM',
      'Gas Mark',
      0,
      true,
      celsiusConverter,
      gasMark => {
        if (gasMark.lt(new Real(new Fraction(3, 8)))) {
          return new Real(107)
        } else if (gasMark.lt(new Real(new Fraction(3, 4)))) {
          return new Real(121)
        } else {
          gasMark = new Real(Math.round(gasMark.valueOf()))
          return gasMark.mul(gasMarkScalar).add(gasMarkOffset)
        }
      },
      celsius => {
        if (celsius.lt(new Real(114))) {
          return new Real(new Fraction(1, 4))
        } else if (celsius.lt(new Real(128))) {
          return new Real(new Fraction(1, 2))
        } else {
          const gasMark = celsius.sub(gasMarkOffset).div(gasMarkScalar)
          return new Real(Math.round(gasMark.valueOf()))
        }
      }
    )
  )
}
