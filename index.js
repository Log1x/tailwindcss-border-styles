const _ = require('lodash')

const flattenColorPalette = (colors) => {
  return _(colors)
    .flatMap((color, name) => {
      if (!_.isPlainObject(color)) {
        return [[name, color]]
      }

      return _.map(color, (value, key) => {
        const suffix = key === 'default' ? '' : `-${key}`
        return [`${name}${suffix}`, value]
      })
    })
    .fromPairs()
    .value()
}

module.exports = () => {
  return ({ theme, addUtilities, variants }) => {
    const config = theme('borderStyles', {
      'styles': false,
      'colors': false,
    })

    const colors = flattenColorPalette(
      theme('borderColor')
    )

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

    if (config.styles) {
      _.each(directions, (value, key) => {
        addUtilities(styles.map(modifier => {
          let selector = `.border-${key}-${modifier}`
          let utility = `border-${value}-style`

          return {
            [selector]: {
              [utility]: modifier
            }
          }
        }), variants('borderStyle'))
      })
    }

    if (config.colors) {
      _.each(directions, (value, key) => {
        let utilities = _.fromPairs(
          _.map(_.omit(colors, 'default'), (color, modifier) => {
            let selector = `.border-${key}-${modifier}`
            let utility = `border-${value}-color`

            return [
              [selector], {
                [utility]: color
              }
            ]
          })
        )

        addUtilities(utilities, variants('borderStyle'))
      })
    }
  }
}
