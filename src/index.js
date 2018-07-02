export default ({
  name = 'spinner',
  color = '#dae1e7',
  size = '1em',
  border = '2px',
} = {}) => ({
  addUtilities,
  config
}) => addUtilities({
  [`.${name}`]: {
    'color': 'transparent !important',
    'pointer-events': 'none',
    'position': 'relative',
    '&:after': {
      'animation': 'spinAround 500ms infinite linear',
      'border': `${border} solid ${color}`,
      'border-radius': '290486px',
      'border-right-color': 'transparent',
      'border-top-color': 'transparent',
      'content': '""',
      'display': 'block',
      'width': size,
      'height': size,
      'left': `calc(50% - (${size} / 2))`,
      'top': `calc(50% - (${size} / 2))`,
      'position': 'absolute !important',
    },
  },
  '@keyframes spinAround': {
    'from': {
      'transform': 'rotate(0deg)',
    },
    'to': {
      'transform': 'rotate(359deg)',
    },
  },
});
