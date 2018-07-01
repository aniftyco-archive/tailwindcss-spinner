# Tailwind CSS Spinner
> Spinner utility for Tailwind CSS

## Installation

You can install it with yarn

```bash
yarn add tailwindcss-spinner
```

## Usage

To get started using the plugin, you can require it into your Tailwind CSS config file

```js
plugins: [
  // Other plugins…
  require('tailwindcss-spinner')(),
],
```

Now you will have a `.spinner` class available in your CSS.

If you want to customize the spinner, you can pass any combination of the following options (shown with default values).

```js
plugins: [
  // Other plugins…
  require('tailwindcss-spinner')({
    name: 'spinner', // change class name
    color: 'grey-light', // color from config to make it
    size: '1em', // size of the spinner (used for both width and height)
    border: '2px', // border-width of the spinner (shouldn't be bigger than half the spinner's size)
  }),
],
```

## Example

![](https://i.imgur.com/UbwGglQ.gif)
