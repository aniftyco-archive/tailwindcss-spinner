const _ = require('lodash')

const plugin = require('./index.js')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')


expect.extend({ toMatchCss: require('jest-matcher-css') })


// const defaultConfig = require('tailwindcss/defaultConfig')
const generatePluginCss = (testConfig = {}, pluginOptions) => {
  const sandboxConfig = {
    theme: {
      screens: { 'sm': '640px' },
    },
    corePlugins: false,
    plugins: [ plugin(pluginOptions) ],
  }
  const postcssPlugins = [
    tailwindcss(_.merge(sandboxConfig, testConfig)),
  ]

  return postcss(postcssPlugins)
    .process('@tailwind utilities', { from: undefined })
    .then(result => result.css)
}

test('can pass direct require() into tailwind plugin', () => {
  const sandboxConfig = {
    theme: {
      screens: { 'sm': '640px' },
    },
    corePlugins: false,
    plugins: [ require('./index.js') ],
  }
  const postcssPlugins = [
    tailwindcss(sandboxConfig),
  ]

  return postcss(postcssPlugins)
    .process('@tailwind utilities', { from: undefined })
    .then(result => result.css)
    .then(css => expect(css).toEqual(expect.stringContaining('.spinner')))
})

test('generates default utilities and responsive variants', () => {
  const testConfig = {}
  const expectedCss = `
    .spinner {
      position: relative;
      color: transparent !important;
      pointer-events: none;
    }

    .spinner::after {
      content: '';
      position: absolute !important;
      top: calc(50% - (1em / 2));
      left: calc(50% - (1em / 2));
      display: block;
      width: 1em;
      height: 1em;
      border: 2px solid currentColor;
      border-radius: 9999px;
      border-right-color: transparent;
      border-top-color: transparent;
      animation: spinAround 500ms infinite linear;
    }

    @keyframes spinAround {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @media (min-width: 640px) {
      .sm\\:spinner {
        position: relative;
        color: transparent !important;
        pointer-events: none;
      }

      .sm\\:spinner::after {
        content: '';
        position: absolute !important;
        top: calc(50% - (1em / 2));
        left: calc(50% - (1em / 2));
        display: block;
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-radius: 9999px;
        border-right-color: transparent;
        border-top-color: transparent;
        animation: spinAround 500ms infinite linear;
      }
    }
  `

  return generatePluginCss(testConfig).then(css => expect(css).toMatchCss(expectedCss))
})

test('utilities can be customized', () => {
  const testConfig = {
    theme: {
      spinner: {
        default: {
          color: '#dae1e7',
          size: '1em',
          border: '2px',
          speed: '500ms',
        },
        md: {
          color: 'currentColor',
          size: '2em',
          border: '2px',
          speed: '500ms',
        },
      },
    },
  }
  const expectedCss = `
    .spinner {
      position: relative;
      color: transparent !important;
      pointer-events: none;
    }

    .spinner::after {
      content: '';
      position: absolute !important;
      top: calc(50% - (1em / 2));
      left: calc(50% - (1em / 2));
      display: block;
      width: 1em;
      height: 1em;
      border: 2px solid #dae1e7;
      border-radius: 9999px;
      border-right-color: transparent;
      border-top-color: transparent;
      animation: spinAround 500ms infinite linear;
    }

    .spinner-md {
      position: relative;
      color: transparent !important;
      pointer-events: none;
    }

    .spinner-md::after {
      content: '';
      position: absolute !important;
      top: calc(50% - (2em / 2));
      left: calc(50% - (2em / 2));
      display: block;
      width: 2em;
      height: 2em;
      border: 2px solid currentColor;
      border-radius: 9999px;
      border-right-color: transparent;
      border-top-color: transparent;
      animation: spinAround 500ms infinite linear;
    }

    @keyframes spinAround {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @media (min-width: 640px) {
      .sm\\:spinner {
        position: relative;
        color: transparent !important;
        pointer-events: none;
      }

      .sm\\:spinner::after {
        content: '';
        position: absolute !important;
        top: calc(50% - (1em / 2));
        left: calc(50% - (1em / 2));
        display: block;
        width: 1em;
        height: 1em;
        border: 2px solid #dae1e7;
        border-radius: 9999px;
        border-right-color: transparent;
        border-top-color: transparent;
        animation: spinAround 500ms infinite linear;
      }

      .sm\\:spinner-md {
        position: relative;
        color: transparent !important;
        pointer-events: none;
      }

      .sm\\:spinner-md::after {
        content: '';
        position: absolute !important;
        top: calc(50% - (2em / 2));
        left: calc(50% - (2em / 2));
        display: block;
        width: 2em;
        height: 2em;
        border: 2px solid currentColor;
        border-radius: 9999px;
        border-right-color: transparent;
        border-top-color: transparent;
        animation: spinAround 500ms infinite linear;
      }
    }
  `

  return generatePluginCss(testConfig).then(css => expect(css).toMatchCss(expectedCss))
})

test('class name and theme key can be customized', () => {
  const testConfig = {
    theme: {
      customSpinner: {
        default: {
          color: '#dae1e7',
          size: '1em',
          border: '2px',
          speed: '500ms',
        },
        md: {
          color: 'currentColor',
          size: '2em',
          border: '2px',
          speed: '500ms',
        },
      },
    },
  }
  const expectedCss = `
    .my-spinner {
      position: relative;
      color: transparent !important;
      pointer-events: none;
    }

    .my-spinner::after {
      content: '';
      position: absolute !important;
      top: calc(50% - (1em / 2));
      left: calc(50% - (1em / 2));
      display: block;
      width: 1em;
      height: 1em;
      border: 2px solid #dae1e7;
      border-radius: 9999px;
      border-right-color: transparent;
      border-top-color: transparent;
      animation: spinAround 500ms infinite linear;
    }

    .my-spinner-md {
      position: relative;
      color: transparent !important;
      pointer-events: none;
    }

    .my-spinner-md::after {
      content: '';
      position: absolute !important;
      top: calc(50% - (2em / 2));
      left: calc(50% - (2em / 2));
      display: block;
      width: 2em;
      height: 2em;
      border: 2px solid currentColor;
      border-radius: 9999px;
      border-right-color: transparent;
      border-top-color: transparent;
      animation: spinAround 500ms infinite linear;
    }

    @keyframes spinAround {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @media (min-width: 640px) {
      .sm\\:my-spinner {
        position: relative;
        color: transparent !important;
        pointer-events: none;
      }

      .sm\\:my-spinner::after {
        content: '';
        position: absolute !important;
        top: calc(50% - (1em / 2));
        left: calc(50% - (1em / 2));
        display: block;
        width: 1em;
        height: 1em;
        border: 2px solid #dae1e7;
        border-radius: 9999px;
        border-right-color: transparent;
        border-top-color: transparent;
        animation: spinAround 500ms infinite linear;
      }

      .sm\\:my-spinner-md {
        position: relative;
        color: transparent !important;
        pointer-events: none;
      }

      .sm\\:my-spinner-md::after {
        content: '';
        position: absolute !important;
        top: calc(50% - (2em / 2));
        left: calc(50% - (2em / 2));
        display: block;
        width: 2em;
        height: 2em;
        border: 2px solid currentColor;
        border-radius: 9999px;
        border-right-color: transparent;
        border-top-color: transparent;
        animation: spinAround 500ms infinite linear;
      }
    }
  `

  return generatePluginCss(
    testConfig,
    { className: 'my-spinner', themeKey: 'customSpinner' }
  ).then(css => expect(css).toMatchCss(expectedCss))
})
