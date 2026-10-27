import { convert } from '../lib'

describe('convert', () => {
  it('Should convert UK pints to cups', () => {
    const cups = convert(1)
      .from({ authority: 'UK', name: 'pint' })
      .to({ authority: 'UK', name: 'cup' })
    expect(cups.valueOf()).toBe(2)
  })
})
