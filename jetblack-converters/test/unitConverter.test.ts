import { REPOSITORY, Fraction, Real } from '../lib'

describe('converter', () => {
  it('Should convert meters to meters.', () => {
    const meterConverter = REPOSITORY.find({ name: 'meter' })!

    const result = meterConverter.convert(1, meterConverter)

    expect(result.valueOf()).toBe(1)
  })

  it('Should convert centimeters to millimeters.', () => {
    const centimeterConverter = REPOSITORY.find({ name: 'centimeter' })!
    const millimeterConverter = REPOSITORY.find({ name: 'millimeter' })!

    const millimeters = centimeterConverter.convert(10, millimeterConverter)
    expect(millimeters.valueOf()).toBe(100)

    const centimeters = millimeterConverter.convert(100, centimeterConverter)
    expect(centimeters.valueOf()).toBe(10)
  })

  it('Should convert inches to millimeters.', () => {
    const millimeterConverter = REPOSITORY.find({ name: 'millimeter' })!
    const inchConverter = REPOSITORY.find({ system: 'imperial', name: 'inch' })!

    const millimeters = inchConverter.convert(1, millimeterConverter)

    expect(millimeters.valueOf()).toBe(25.4)
  })

  it('Should convert millimeters to inches.', () => {
    const millimeterConverter = REPOSITORY.find({ name: 'millimeter' })!
    const inchConverter = REPOSITORY.find({ system: 'imperial', name: 'inch' })!

    const inches = millimeterConverter.convert(25.4, inchConverter)
    expect(Math.abs(inches.valueOf() - 1) <= Number.EPSILON).toBeTruthy()
  })

  it('Should convert fahrenheit to celsius.', () => {
    const fahrenheitConverter = REPOSITORY.find({ name: 'Fahrenheit' })!
    const celsiusConverter = REPOSITORY.find({ name: 'Celsius' })!

    let fahrenheit = celsiusConverter.convert(0, fahrenheitConverter)
    expect(fahrenheit.valueOf()).toBe(32)

    fahrenheit = celsiusConverter.convert(100, fahrenheitConverter)
    expect(fahrenheit.valueOf()).toBe(212)

    let celsius = fahrenheitConverter.convert(32, celsiusConverter)
    expect(celsius.valueOf()).toBe(0)

    celsius = fahrenheitConverter.convert(212, celsiusConverter)
    expect(celsius.valueOf()).toBe(100)

    celsius = fahrenheitConverter.convert(-40, celsiusConverter)
    expect(celsius.valueOf()).toBe(-40)

    fahrenheit = celsiusConverter.convert(-40, fahrenheitConverter)
    expect(fahrenheit.valueOf()).toBe(-40)
  })

  it('Should convert gas mark to celsius.', () => {
    const gasMarkConverter = REPOSITORY.find({ name: 'Gas Mark' })!
    const celsiusConverter = REPOSITORY.find({ name: 'Celsius' })!

    let gasMark = celsiusConverter.convert(135, gasMarkConverter)
    expect(gasMark.valueOf()).toBe(1)

    gasMark = celsiusConverter.convert(247, gasMarkConverter)
    expect(gasMark.valueOf()).toBe(9)

    let celsius = gasMarkConverter.convert(1, celsiusConverter)
    expect(celsius.valueOf()).toBe(135)

    celsius = gasMarkConverter.convert(9, celsiusConverter)
    expect(celsius.valueOf()).toBe(247)

    celsius = gasMarkConverter.convert(new Fraction(1, 4), celsiusConverter)
    expect(celsius.valueOf()).toBe(107)

    celsius = gasMarkConverter.convert(new Fraction(1, 2), celsiusConverter)
    expect(celsius.valueOf()).toBe(121)

    gasMark = celsiusConverter.convert(107, gasMarkConverter)
    expect(gasMark.eq(new Real(new Fraction(1, 4)))).toBeTruthy()

    gasMark = celsiusConverter.convert(121, gasMarkConverter)
    expect(gasMark.eq(new Real(new Fraction(1, 2)))).toBeTruthy()
  })

  it('Should convert gas mark to fahrenheit.', () => {
    const gasMarkConverter = REPOSITORY.find({ name: 'Gas Mark' })!
    const fahrenheitConverter = REPOSITORY.find({ name: 'Fahrenheit' })!

    let gasMark, fahrenheit

    gasMark = fahrenheitConverter.convert(275, gasMarkConverter)
    expect(gasMark.valueOf()).toBe(1)

    gasMark = fahrenheitConverter.convert(475, gasMarkConverter)
    expect(gasMark.valueOf()).toBe(9)

    fahrenheit = gasMarkConverter.convert(1, fahrenheitConverter)
    expect(fahrenheit.valueOf()).toBe(275)

    fahrenheit = gasMarkConverter.convert(9, fahrenheitConverter)
    expect(fahrenheit.valueOf()).toBe(476.6)

    fahrenheit = gasMarkConverter.convert(
      new Fraction(1, 4),
      fahrenheitConverter
    )
    expect(fahrenheit.valueOf()).toBe(224.6)

    fahrenheit = gasMarkConverter.convert(
      new Fraction(1, 2),
      fahrenheitConverter
    )
    expect(fahrenheit.valueOf()).toBe(249.8)

    gasMark = fahrenheitConverter.convert(225, gasMarkConverter)
    expect(gasMark.eq(new Real(new Fraction(1, 4)))).toBeTruthy()

    gasMark = fahrenheitConverter.convert(250, gasMarkConverter)
    expect(gasMark.eq(new Real(new Fraction(1, 2)))).toBeTruthy()
  })

  it('Should convert US spoons to fluid ounces', () => {
    const tspConverter = REPOSITORY.find({ authority: 'US', name: 'teaspoon' })!
    const flozConverter = REPOSITORY.find({
      authority: 'US',
      name: 'fluid ounce'
    })!
    const floz = tspConverter.convert(1, flozConverter)
    expect(floz.asFraction().toString()).toBe('1/6')
  })

  it('Should convert UK cups to millilitres', () => {
    const cupConverter = REPOSITORY.find({ authority: 'UK', name: 'cup' })!
    const millilitreConverter = REPOSITORY.find({ name: 'millilitre' })!

    const millilitres = cupConverter.convert(1, millilitreConverter)
    expect(Math.round(millilitres.valueOf() * 10) / 10).toBe(284.1)
  })

  it('Should convert US fl oz to ml', () => {
    const flozConverter = REPOSITORY.find({
      authority: 'US',
      name: 'fluid ounce'
    })!
    const mlConverter = REPOSITORY.find({ name: 'millilitre' })!

    const ml = flozConverter.convert(10, mlConverter)
    expect(Math.round(ml.valueOf() * 100) / 100).toBe(295.75)
  })

  it('Should convert US cup to ml', () => {
    const cupConverter = REPOSITORY.find({
      authority: 'US',
      name: 'cup'
    })!
    const mlConverter = REPOSITORY.find({ name: 'millilitre' })!

    const ml = cupConverter.convert(10, mlConverter)
    expect(Math.round(ml.valueOf() * 100) / 100).toBe(2366)
  })

  it('Should convert US cups to tbsp', () => {
    const cupConverter = REPOSITORY.find({ authority: 'US', name: 'cup' })!
    const tbspConverter = REPOSITORY.find({
      authority: 'US',
      name: 'tablespoon'
    })!

    const tbsp = cupConverter.convert(1, tbspConverter)
    expect(tbsp.toString()).toBe('16')
  })

  it('Should convert US tbsp to tsp', () => {
    const tbspConverter = REPOSITORY.find({
      authority: 'US',
      name: 'tablespoon'
    })!
    const tspConverter = REPOSITORY.find({ authority: 'US', name: 'teaspoon' })!

    const tbsp = tbspConverter.convert(1, tspConverter)
    expect(tbsp.toString()).toBe('3')
  })
})
