import type { ConverterRepository } from '../../../../index'
import australia from './Australia'
import canada from './Canada'
import europe from './Europe'
import nz from './NewZealand'
import us from './UnitedStates'

export default function (repository: ConverterRepository) {
  const domain = 'mass'
  const system = 'food/chicken/eggs'

  australia(repository, domain, system)
  canada(repository, domain, system)
  europe(repository, domain, system)
  nz(repository, domain, system)
  us(repository, domain, system)
}
