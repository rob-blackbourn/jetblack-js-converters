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
    scalar: Real,
    ordinal: number,
    isMajor: boolean
  ) {
    return {
      symbol: symbol,
      name: name,
      isMultiplier: isMultiplier,
      scalar: scalar,
      ordinal: ordinal,
      isMajor: isMajor
    }
  }
  const prefixes = [
    createPrefix('y', 'yocto', false, new Real(Math.pow(10, 24)), -10, true),
    createPrefix('z', 'zepto', false, new Real(Math.pow(10, 21)), -9, true),
    createPrefix('a', 'atto', false, new Real(Math.pow(10, 18)), -8, true),
    createPrefix('f', 'femto', false, new Real(Math.pow(10, 15)), -7, true),
    createPrefix('p', 'pico', false, new Real(Math.pow(10, 12)), -6, true),
    createPrefix('n', 'nano', false, new Real(Math.pow(10, 9)), -5, true),
    createPrefix('\u00b5', 'micro', false, new Real(Math.pow(10, 6)), -4, true),
    createPrefix('m', 'milli', false, new Real(Math.pow(10, 3)), -3, true),
    createPrefix('c', 'centi', false, new Real(Math.pow(10, 2)), -2, true),
    createPrefix('d', 'deci', false, new Real(Math.pow(10, 1)), -1, false),
    createPrefix('da', 'deca', true, new Real(Math.pow(10, 1)), 1, false),
    createPrefix('h', 'hecto', true, new Real(Math.pow(10, 2)), 1, false),
    createPrefix('k', 'kilo', true, new Real(Math.pow(10, 3)), 1, true),
    createPrefix('M', 'mega', true, new Real(Math.pow(10, 6)), 1, true),
    createPrefix('G', 'giga', true, new Real(Math.pow(10, 9)), 1, true),
    createPrefix('T', 'tera', true, new Real(Math.pow(10, 12)), 1, true),
    createPrefix('P', 'peta', true, new Real(Math.pow(10, 15)), 1, true),
    createPrefix('E', 'exa', true, new Real(Math.pow(10, 18)), 1, true),
    createPrefix('Z', 'zetta', true, new Real(Math.pow(10, 21)), 1, true),
    createPrefix('Y', 'yotta', true, new Real(Math.pow(10, 24)), 1, true)
  ]

  prefixes.map(prefix => {
    repository.add(
      new UnitConverter(
        targetConverter.domain,
        targetConverter.system,
        targetConverter.authority,
        prefix.symbol + targetConverter.symbol,
        prefix.name + targetConverter.name,
        targetConverter.ordinal,
        targetConverter.isMajor,
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
    new UnitConverter(
      'length',
      'metric',
      'si',
      'm',
      'meter',
      0,
      true,
      null,
      null,
      null
    )
  )
  createSiConverters(repository, meterConverter)

  const grammeConverter = repository.add(
    new UnitConverter(
      'mass',
      'metric',
      'si',
      'g',
      'gramme',
      0,
      true,
      null,
      null,
      null
    )
  )
  createSiConverters(repository, grammeConverter)

  const secondConverter = repository.add(
    new UnitConverter(
      'temperature',
      'metric',
      'si',
      's',
      'second',
      0,
      true,
      null,
      null,
      null
    )
  )
  createSiConverters(repository, secondConverter)

  const litreConverter = repository.add(
    new UnitConverter(
      'volume',
      'metric',
      'si',
      'l',
      'litre',
      0,
      true,
      null,
      null,
      null
    )
  )
  createSiConverters(repository, litreConverter)

  const kelvinConverter = repository.add(
    new UnitConverter(
      'temperature',
      'metric',
      'si',
      'K',
      'Kelvin',
      -1,
      false,
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
