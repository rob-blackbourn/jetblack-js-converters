import { Real, Fraction } from '../lib'
import { IngredientLine, parseIngredientLine } from '../lib/textConverter'

type IngredientLineFixture = {
  text: string
  expected: IngredientLine
}

describe('text conversion', () => {
  it('should convert simple', () => {
    const fixtures: IngredientLineFixture[] = [
      {
        text: '2 400 g tins of plum peeled tomatoes, crushed',
        expected: {
          quantity: new Real(2),
          unit: undefined,
          ingredient: '400 g tins of plum peeled tomatoes',
          treatment: 'crushed'
        }
      },
      {
        text: '3 large eggs, lightly beaten',
        expected: {
          quantity: new Real(3),
          unit: 'large',
          ingredient: 'eggs',
          treatment: 'lightly beaten'
        }
      },
      {
        text: '2 stalks of lemongrass',
        expected: {
          quantity: new Real(2),
          unit: 'stalk',
          ingredient: 'lemongrass',
          treatment: undefined
        }
      },
      {
        text: '2.3e9 grains of pepper',
        expected: {
          quantity: new Real(2.3e9),
          unit: undefined,
          ingredient: 'grains of pepper',
          treatment: undefined
        }
      },
      {
        text: '2 slices of lemon, juice only',
        expected: {
          quantity: new Real(2),
          unit: 'slice',
          ingredient: 'lemon',
          treatment: 'juice only'
        }
      },
      {
        text: '500 g of minced beef',
        expected: {
          quantity: new Real(500),
          unit: 'g',
          ingredient: 'minced beef',
          treatment: undefined
        }
      },
      {
        text: '500g minced beef',
        expected: {
          quantity: new Real(500),
          unit: 'g',
          ingredient: 'minced beef',
          treatment: undefined
        }
      },
      {
        text: '150 ml fish stock',
        expected: {
          quantity: new Real(150),
          unit: 'ml',
          ingredient: 'fish stock',
          treatment: undefined
        }
      },
      {
        text: '1/4 cup fish sauce',
        expected: {
          quantity: Real.parse('1/4'),
          unit: 'cup',
          ingredient: 'fish sauce',
          treatment: undefined
        }
      },
      {
        text: '1 tbsp lime juice',
        expected: {
          quantity: new Real(1),
          unit: 'tbsp',
          ingredient: 'lime juice',
          treatment: undefined
        }
      },
      {
        text: '2 1/2 red onions, finely chopped',
        expected: {
          quantity: Real.parse('2 1/2'),
          unit: undefined,
          ingredient: 'red onions',
          treatment: 'finely chopped'
        }
      },
      {
        text: '1 lime, juice only',
        expected: {
          quantity: new Real(1),
          unit: undefined,
          ingredient: 'lime',
          treatment: 'juice only'
        }
      },
      {
        text: '2.5l milk',
        expected: {
          quantity: new Real(2.5),
          unit: 'l',
          ingredient: 'milk',
          treatment: undefined
        }
      },
      {
        text: 'salt and pepper',
        expected: {
          quantity: undefined,
          unit: undefined,
          ingredient: 'salt and pepper',
          treatment: undefined
        }
      }
    ]

    for (const { text, expected } of fixtures) {
      const actual = parseIngredientLine(text)
      expect(actual).toEqual(expected)
    }
  })
})
