import type { ConverterRepository } from '../../index'
import australia from './Australia'
import canada from './Canada'
import fda from './FDA'
import japan from './Japan'
import uk from './UnitedKingdom'
import us from './UnitedStates'

export default function (repository: ConverterRepository) {
  const domain = 'volume'
  const system = 'utensils'

  australia(repository, domain, system)
  canada(repository, domain, system)
  fda(repository, domain, system)
  japan(repository, domain, system)
  uk(repository, domain, system)
  us(repository, domain, system)
}
