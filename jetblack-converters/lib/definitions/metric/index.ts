import type { ConverterRepository } from '../../index'
import { DomainConverter, Real, UnitConverter } from '../../index'

function createSiConverters(
  repository: ConverterRepository,
  targetConverter: UnitConverter
) {
  const createPrefix = function (
    symbol: string,
    name: string,
    isMultiplier: boolean,
    scalar: Real
  ) {
    return {
      symbol: symbol,
      name: name,
      isMultiplier: isMultiplier,
      scalar: scalar
    }
  }
  const prefixes = [
    createPrefix('y', 'yocto', false, new Real(Math.pow(10, 24))),
    createPrefix('z', 'zepto', false, new Real(Math.pow(10, 21))),
    createPrefix('a', 'atto', false, new Real(Math.pow(10, 18))),
    createPrefix('f', 'femto', false, new Real(Math.pow(10, 15))),
    createPrefix('p', 'pico', false, new Real(Math.pow(10, 12))),
    createPrefix('n', 'nano', false, new Real(Math.pow(10, 9))),
    createPrefix('\u00b5', 'micro', false, new Real(Math.pow(10, 6))),
    createPrefix('m', 'milli', false, new Real(Math.pow(10, 3))),
    createPrefix('c', 'centi', false, new Real(Math.pow(10, 2))),
    createPrefix('d', 'deci', false, new Real(Math.pow(10, 1))),
    createPrefix('da', 'deca', true, new Real(Math.pow(10, 1))),
    createPrefix('h', 'hecto', true, new Real(Math.pow(10, 2))),
    createPrefix('k', 'kilo', true, new Real(Math.pow(10, 3))),
    createPrefix('M', 'mega', true, new Real(Math.pow(10, 6))),
    createPrefix('G', 'giga', true, new Real(Math.pow(10, 9))),
    createPrefix('T', 'tera', true, new Real(Math.pow(10, 12))),
    createPrefix('P', 'peta', true, new Real(Math.pow(10, 15))),
    createPrefix('E', 'exa', true, new Real(Math.pow(10, 18))),
    createPrefix('Z', 'zetta', true, new Real(Math.pow(10, 21))),
    createPrefix('Y', 'yotta', true, new Real(Math.pow(10, 24)))
  ]

  prefixes.map(prefix => {
    repository.add(
      new UnitConverter(
        targetConverter.domain,
        targetConverter.system,
        targetConverter.authority,
        prefix.symbol + targetConverter.symbol,
        prefix.name + targetConverter.name,
        targetConverter,
        prefix.isMultiplier
          ? value => value.mul(prefix.scalar)
          : value => value.div(prefix.scalar),
        prefix.isMultiplier
          ? value => value.div(prefix.scalar)
          : value => value.mul(prefix.scalar)
      )
    )
  })
}

export default function (repository: ConverterRepository) {
  const meterConverter = repository.add(
    new UnitConverter('length', 'metric', 'si', 'm', 'meter', null, null, null)
  )
  createSiConverters(repository, meterConverter)

  const grammeConverter = repository.add(
    new UnitConverter('mass', 'metric', 'si', 'g', 'gramme', null, null, null)
  )
  createSiConverters(repository, grammeConverter)

  const secondConverter = repository.add(
    new UnitConverter(
      'temperature',
      'metric',
      'si',
      's',
      'second',
      null,
      null,
      null
    )
  )
  createSiConverters(repository, secondConverter)

  const litreConverter = repository.add(
    new UnitConverter('volume', 'metric', 'si', 'l', 'litre', null, null, null)
  )
  createSiConverters(repository, litreConverter)

  const kelvinConverter = repository.add(
    new UnitConverter(
      'temperature',
      'metric',
      'si',
      'K',
      'Kelvin',
      null,
      null,
      null
    )
  )
  createSiConverters(repository, kelvinConverter)

  repository.domainConverters.add(
    new DomainConverter(
      grammeConverter,
      litreConverter,
      (value, scalar) => {
        if (!scalar)
          throw new Error('A scalar is required for domain conversion')
        return value.div(scalar)
      },
      (value, scalar) => {
        if (!scalar)
          throw new Error('A scalar is required for domain conversion')
        return value.mul(scalar)
      }
    )
  )
}
