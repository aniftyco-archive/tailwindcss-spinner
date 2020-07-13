const _ = require('lodash')
const flatten = require('flat')
const plugin = require('tailwindcss/plugin')


const FLATTEN_CONFIG = { delimiter: '-', maxDepth: 2 }
const handleName = (name, className) => {
  const split = name.split(`${className}-`)
  const prefixedName = `${split[0]}${prefixNegativeModifiers(className, split[1])}`

  return prefixedName.split('-default').join('')
}
const prefixNegativeModifiers = function(base, modifier) {
  return _.startsWith(modifier, '-')
    ? `-${base}-${modifier.slice(1)}`
    : `${base}-${modifier}`
}


function pluginFactory(spinnerConfig = {}) {
  return function ({
    addUtilities, addComponents, addBase, addVariant,
    e, prefix, theme, variants, config,
  }) {
    const buildConfig = (themeKey, ...fallbackKeys) => {
      return buildConfigFromTheme(themeKey, ...fallbackKeys) || buildConfigFromArray(themeKey)
    }
    const buildConfigFromTheme = (themeKey, ...fallbackKeys) => {
      const buildObject = ([ modifier, value ]) => [ modifier, { [themeKey]: value } ]
      const getThemeSettings = (themeKey, fallbackKeys) => {
        const [newThemeKey, ...newFallbackKeys] = fallbackKeys || []

        return theme(themeKey, false) || (fallbackKeys.length && getThemeSettings(newThemeKey, [...newFallbackKeys]))
      }

      const themeSettings = getThemeSettings(themeKey, fallbackKeys)
      const themeObject = _.isArray(themeSettings) ? _.zipObject(themeSettings, themeSettings) : themeSettings
      const themeEntries = themeSettings && Object
        .entries(flatten(themeObject, FLATTEN_CONFIG))
        .map(entry => buildObject(entry))

      return themeSettings ? _.fromPairs(themeEntries) : false
    }
    const buildConfigFromArray = (property) => {
      const defaultSettings = defaultValues[property]
      const defaultEntries = defaultSettings && defaultSettings
        .map(value => ([value, { [property]: value }]))

      return defaultSettings ? _.fromPairs(defaultEntries) : false
    }

    const buildPluginUtilityObject = ({ color, size, border, speed }) => {
      return {
        'position': 'relative',
        'color': 'transparent !important',
        'pointer-events': 'none',

        '&::after': {
          'content': `''`,

          'position': 'absolute !important',
          'top': `calc(50% - (${size} / 2))`,
          'left': `calc(50% - (${size} / 2))`,

          'display': 'block',
          'width': size,
          'height': size,

          'border': `${border} solid ${color}`,
          'border-radius': '9999px',
          'border-right-color': 'transparent',
          'border-top-color': 'transparent',

          'animation': `spinAround ${speed} infinite linear`,
        },
      }
    }

    const buildDefaultValuesObject = (defaultConfig, themeKey, ...fallbackKeys) => {
      const defaultEntries = Object.entries(theme(themeKey, { default: defaultConfig }))
        .map(([ modifier, config ]) => [ modifier, buildPluginUtilityObject({ ...defaultConfig, ...config }) ])

      return _.fromPairs(defaultEntries)
    }

    const defaultValues = {}
    const defaultConfig = {
      color: 'currentColor',
      size: '1em',
      border: '2px',
      speed: '500ms',
    }

    const baseClassName = spinnerConfig.className || 'spinner'
    const themeKey = spinnerConfig.themeKey || 'spinner'

    const pluginUtilities = {
      [baseClassName]: buildDefaultValuesObject(defaultConfig, themeKey),
    }

    Object.entries(pluginUtilities)
      .filter(([ modifier, values ]) => !_.isEmpty(values))
      .forEach(([ modifier, values ]) => {
        const className = _.kebabCase(modifier)
        const variantName = Object.keys(Object.entries(values)[0][1])[0]
        const utilities = flatten({ [`.${e(`${className}`)}`]: values }, FLATTEN_CONFIG)

        addUtilities(
          _.mapKeys(utilities, (value, key) => handleName(key, className)),
          variants(variantName, ['responsive'])
        )
      })

    addUtilities({
      '@keyframes spinAround': {
        'from': { 'transform': 'rotate(0deg)' },
        'to': { 'transform': 'rotate(360deg)' },
      },
    })
  }
}

module.exports = plugin.withOptions(pluginFactory)
