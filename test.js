const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const defaultConfig = require('tailwindcss/defaultConfig');
const borderStylesPlugin = require('./index.js');

const generatePluginCss = (config, pluginOptions = {}) => {
  return postcss(
    tailwindcss(
      _.merge({
        theme: {
          screens: {
            sm: '640px',
          },
        },
        corePlugins: (function() {
          let disabledCorePlugins = {};
          Object.keys(defaultConfig.variants).forEach(corePlugin => {
            disabledCorePlugins[corePlugin] = false;
          });
          return disabledCorePlugins;
        })(),
        plugins: [
          borderStylesPlugin(pluginOptions),
        ],
      }, config)
    )
  )
  .process('@tailwind utilities;', {
    from: undefined,
  })
  .then(result => {
    return result.css;
  });
};

expect.extend({
  toMatchCss: cssMatcher,
});

test('the plugin creates border side styles based on the default borderStyle variant', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`
      .border-t-solid {
        border-top-style: solid;
      }

      .border-t-dashed {
        border-top-style: dashed;
      }

      .border-t-dotted {
        border-top-style: dotted;
      }

      .border-t-double {
        border-top-style: double;
      }

      .border-t-none {
        border-top-style: none;
      }

      .border-r-solid {
        border-right-style: solid;
      }

      .border-r-dashed {
        border-right-style: dashed;
      }

      .border-r-dotted {
        border-right-style: dotted;
      }

      .border-r-double {
        border-right-style: double;
      }

      .border-r-none {
        border-right-style: none;
      }

      .border-b-solid {
        border-bottom-style: solid;
      }

      .border-b-dashed {
        border-bottom-style: dashed;
      }

      .border-b-dotted {
        border-bottom-style: dotted;
      }

      .border-b-double {
        border-bottom-style: double;
      }

      .border-b-none {
        border-bottom-style: none;
      }

      .border-l-solid {
        border-left-style: solid;
      }

      .border-l-dashed {
        border-left-style: dashed;
      }

      .border-l-dotted {
        border-left-style: dotted;
      }

      .border-l-double {
        border-left-style: double;
      }

      .border-l-none {
        border-left-style: none;
      }

      @media (min-width: 640px) {
        .sm\\:border-t-solid {
          border-top-style: solid;
        }

        .sm\\:border-t-dashed {
          border-top-style: dashed;
        }

        .sm\\:border-t-dotted {
          border-top-style: dotted;
        }

        .sm\\:border-t-double {
          border-top-style: double;
        }

        .sm\\:border-t-none {
          border-top-style: none;
        }

        .sm\\:border-r-solid {
          border-right-style: solid;
        }

        .sm\\:border-r-dashed {
          border-right-style: dashed;
        }

        .sm\\:border-r-dotted {
          border-right-style: dotted;
        }

        .sm\\:border-r-double {
          border-right-style: double;
        }

        .sm\\:border-r-none {
          border-right-style: none;
        }

        .sm\\:border-b-solid {
          border-bottom-style: solid;
        }

        .sm\\:border-b-dashed {
          border-bottom-style: dashed;
        }

        .sm\\:border-b-dotted {
          border-bottom-style: dotted;
        }

        .sm\\:border-b-double {
          border-bottom-style: double;
        }

        .sm\\:border-b-none {
          border-bottom-style: none;
        }

        .sm\\:border-l-solid {
          border-left-style: solid;
        }

        .sm\\:border-l-dashed {
          border-left-style: dashed;
        }

        .sm\\:border-l-dotted {
          border-left-style: dotted;
        }

        .sm\\:border-l-double {
          border-left-style: double;
        }

        .sm\\:border-l-none {
          border-left-style: none;
        }
      }
    `);
  });
});
