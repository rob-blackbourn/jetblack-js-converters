import type { ConverterRepository } from '../index'
import metric from './metric'
import imperial from './imperial'
import customary from './customary'
import temperature from './temperature'
import utensils from './utensils'
import food from './food'

export function defineConverters(repository: ConverterRepository) {
  metric(repository)
  imperial(repository)
  customary(repository)
  temperature(repository)
  utensils(repository)
  food(repository)
}
