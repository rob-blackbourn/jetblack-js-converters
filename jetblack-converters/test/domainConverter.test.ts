import { REPOSITORY, Fraction, Real } from '../lib'

describe('converter', () => {
  test('Should convert US Cups to grammes', () => {
    const cupConverter = REPOSITORY.find({ name: 'cup', authority: 'US' })!
    const grammeConverter = REPOSITORY.find({
      name: 'gramme',
      authority: 'si'
    })!
    const density = new Real(880) // kg/m3

    const cups = REPOSITORY.convert(
      grammeConverter,
      1000,
      cupConverter,
      density
    )
    expect(cups).toBeDefined()
    expect(cups?.asFraction().roundTo([1, 2, 3, 4, 5, 6, 8])?.toString()).toBe(
      '4 4/5'
    )

    const grammes = REPOSITORY.convert(
      cupConverter,
      cups!,
      grammeConverter,
      density
    )
    expect(grammes?.valueOf()).toBe(1000)
  })
})
