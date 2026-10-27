import { convert } from '../lib'

describe('convert', () => {
  test('Should convert UK pints to cups', () => {
    const cups = convert(1)
      .from({ authority: 'UK', name: 'pint' })
      .to({ authority: 'UK', name: 'cup' })
    expect(cups.valueOf()).toBe(2)
  })

  test('Should convert grammes to US cups', () => {
    const cups = convert(1000)
      .from({ name: 'gramme' })
      .of(880)
      .to({ name: 'cup', authority: 'US' })
    expect(cups?.asFraction().roundTo([1, 2, 3, 4, 5, 6, 8])?.toString()).toBe(
      '4 4/5'
    )
  })

  test('Should convert grammes to preferred cups', () => {
    const cups = convert(1000)
      .from({ name: 'gramme' })
      .of(880)
      .prefer({ preferredAuthority: 'US' })
      .to({ name: 'cup' })
    expect(cups?.asFraction().roundTo([1, 2, 3, 4, 5, 6, 8])?.toString()).toBe(
      '4 4/5'
    )
  })
})
