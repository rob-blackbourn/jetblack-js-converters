import {
  REPOSITORY,
  UnitConverter,
  ConverterRepository,
  Fraction,
  Real
} from '../lib'

describe('typed public API', () => {
  it('preserves exact fractions and accepts numeric operands', () => {
    const half = new Real(new Fraction(1, 2))
    expect(half.add(half).toString()).toBe('1')
    expect(half.add(0.25).valueOf()).toBe(0.75)
    expect(half.mul(Real.parse('1/3')).toString()).toBe('1/6')
    expect(new Real(half).eq(half)).toBe(true)
    expect(new Real(Infinity).eq(Infinity)).toBe(true)
    expect(new Real(NaN).eq(NaN)).toBe(false)
  })

  it('returns undefined for missing units and unregistered domain bridges', () => {
    expect(REPOSITORY.find({ name: 'unknown' })).toBeUndefined()
    const source = new UnitConverter('one', '', '', '', 'source')
    const target = new UnitConverter('two', '', '', '', 'target')
    expect(new ConverterRepository().convert(source, 1, target)).toBeUndefined()
    expect(() => source.convert(1, target)).toThrow('No conversion path')
  })

  it('passes a scalar through mass/volume conversions in both directions', () => {
    const grams = REPOSITORY.find({ name: 'gramme', authority: 'si' })!
    const liters = REPOSITORY.find({ name: 'litre', authority: 'si' })!
    const scalar = new Real(new Fraction(1, 1000))
    expect(REPOSITORY.convert(grams, 1000, liters, scalar)?.valueOf()).toBe(1)
    expect(REPOSITORY.convert(liters, 1, grams, scalar)?.valueOf()).toBe(1000)
    expect(() => REPOSITORY.convert(grams, 1, liters)).toThrow('scalar')
  })
})
