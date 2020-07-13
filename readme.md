# Tailwind CSS Spinner
> Spinner utility for Tailwind CSS

## Installation

Add this plugin to your project:

```bash
# Install using pnpm
pnpm install --save-dev tailwindcss-spinner

# Install using npm
npm install --save-dev tailwindcss-spinner

# Install using yarn
yarn add -D tailwindcss-spinner
```

## Usage

```js
// tailwind.config.js
{
  theme: { // defaults to these values
    spinner: (theme) => ({
      default: {
        color: '#dae1e7', // color you want to make the spinner
        size: '1em', // size of the spinner (used for both width and height)
        border: '2px', // border-width of the spinner (shouldn't be bigger than half the spinner's size)
        speed: '500ms', // the speed at which the spinner should rotate
      },
      // md: {
      //   color: theme('colors.red.500', 'red'),
      //   size: '2em',
      //   border: '2px',
      //   speed: '500ms',
      // },
    }),
  },

  variants: { // all the following default to ['responsive']
    spinner: ['responsive'],
  },

  plugins: [
    // optional configuration for resulting class name and/or tailwind theme key
    require('tailwindcss-spinner')({ className: 'spinner', themeKey: 'spinner' }),
  ],
}
```

### Resulting CSS:

```css
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
```

## Example

![](https://i.imgur.com/UbwGglQ.gif)
