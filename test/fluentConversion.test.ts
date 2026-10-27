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
    expect(cups?.asFraction().roundTo([1, 2, 3, 4])?.toString()).toBe('4 3/4')
  })

  test('Should convert grammes to preferred cups', () => {
    const cups = convert(1000)
      .from({ name: 'gramme' })
      .of(880)
      .prefer({ authority: 'US' })
      .to({ name: 'cup' })
    expect(cups?.asFraction().roundTo([1, 2, 3, 4])?.toString()).toBe('4 3/4')
  })
})
