import { Real } from './numbers'

export type IngredientLine = {
  quantity?: Real
  unit?: string
  ingredient?: string
  treatment?: string
}

const FRACTION_PATTERN = '(?:-?(?:[1-9]\\d*\\s+)?[1-9]\\d*\\s*\\/\\s*[1-9]\\d*)'
const REAL_PATTERN = '(?:(?:-?[1-9]\\d*(?:\\.\\d+)?|\\.\\d+)(?:[eE][+-]?\\d+)?)'
const EGG_UNITS = 'peewee|small|medium|large|very large|jumbo'
const SI_UNITS = 'g|kg|ml|l'
const US_UNITS = 'oz|lb|fl oz|pt'
const UTENSILS_UNITS = 'tsp|dstspn|tbsp|cup'
const PIECE_UNITS = 'slice|stalk|stick|bulb|clove'
const UNIT_PATTERN = `${EGG_UNITS}|${SI_UNITS}|${US_UNITS}|${PIECE_UNITS}|${UTENSILS_UNITS}`
const PATTERN = new RegExp(
  `^(?<quantity>-?${FRACTION_PATTERN}|${REAL_PATTERN}|0)?\\s*(?:(?<unit>${UNIT_PATTERN})s?(\\s+of)?\\s)?\\s*(?<ingredient>[^,]*)(?:\\s*,\\s*(?<treatment>.*))?$`
)

function tryParseReal(text?: string): Real | undefined {
  if (!text) {
    return undefined
  } else {
    return Real.parse(text)
  }
}

export function parseIngredientLine(text: string): IngredientLine {
  const matches = text.match(PATTERN)
  return {
    quantity: tryParseReal(matches?.groups?.quantity),
    unit: matches?.groups?.unit,
    ingredient: matches?.groups?.ingredient,
    treatment: matches?.groups?.treatment
  }
}

export function scaleIngredientLine(
  ingredientLine: IngredientLine,
  scalar: Real
): IngredientLine {
  let { quantity } = ingredientLine
  if (quantity instanceof Real) {
    quantity = quantity.mul(scalar)
  }
  return { ...ingredientLine, quantity }
}
