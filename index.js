const _ = require('lodash')

module.exports = function() {
  return ({ addUtilities, variants }) => {
    const directions = {
      't': 'top',
      'r': 'right',
      'b': 'bottom',
      'l': 'left',
    }

    const styles = [
      'solid',
      'dashed',
      'dotted',
      'double',
      'none',
    ]

    _.each(directions, (value, key) => {
      addUtilities(styles.map(style => {
        let selector = `.border-${key}-${style}`
        let utility = `border-${value}-style`

        return {
          [selector]: {
            [utility]: style
          }
        }
      }), variants('borderStyle'))
    })
  }
}
