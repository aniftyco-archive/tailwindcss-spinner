export default ({
  name = 'spinner',
  color = '#dae1e7'
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
      'border': `2px solid ${color}`,
      'border-radius': '290486px',
      'border-right-color': 'transparent',
      'border-top-color': 'transparent',
      'content': '""',
      'display': 'block',
      'width': '1em',
      'height': '1em',
      'left': 'calc(50% - (1em / 2))',
      'top': 'calc(50% - (1em / 2))',
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
