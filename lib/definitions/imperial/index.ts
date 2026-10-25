import type { ConverterRepository } from '../../index'
import length from './length'
import mass from './mass'
import volume from './volume'

export default function (repository: ConverterRepository) {
  const system = 'imperial'
  const authority = 'UK'

  length(repository, system, authority)
  mass(repository, system, authority)
  volume(repository, system, authority)
}
