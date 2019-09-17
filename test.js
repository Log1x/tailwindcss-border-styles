const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const defaultConfig = require('tailwindcss/defaultConfig');
const borderStylesPlugin = require('./index.js');

const generatePluginCss = (config) => {
  return postcss(
    tailwindcss(
      _.merge({
        theme: {
          colors: {
            white: '#fff',
            gray: {
              100: '#f7fafc',
              500: '#a0aec0',
              900: '#1a202c',
            },
          },
          screens: {
            sm: '640px',
          },
        },
        corePlugins: (() => {
          let disabledCorePlugins = {};
          Object.keys(defaultConfig.variants).forEach(corePlugin => {
            disabledCorePlugins[corePlugin] = false;
          });
          return disabledCorePlugins;
        })(),
        plugins: [
          borderStylesPlugin(),
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

test('the plugin does nothing by default', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`
    `);
  });
});

test('the plugin creates border side styles based on the borderStyles `styles` boolean and default borderStyle variant', () => {
  return generatePluginCss({
    theme: {
      borderStyles: {
        styles: true,
      }
    }
  }).then(css => {
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

test('the plugin creates border side colors based on the borderStyles `colors` boolean and default borderColor variant', () => {
  return generatePluginCss({
    theme: {
      borderStyles: {
        colors: true,
      }
    }
  }).then(css => {
    expect(css).toMatchCss(`
      .border-t-white {
        border-top-color: #fff;
      }

      .border-t-gray-100 {
        border-top-color: #f7fafc;
      }

      .border-t-gray-500 {
        border-top-color: #a0aec0;
      }

      .border-t-gray-900 {
        border-top-color: #1a202c;
      }

      .border-r-white {
        border-right-color: #fff;
      }

      .border-r-gray-100 {
        border-right-color: #f7fafc;
      }

      .border-r-gray-500 {
        border-right-color: #a0aec0;
      }

      .border-r-gray-900 {
        border-right-color: #1a202c;
      }

      .border-b-white {
        border-bottom-color: #fff;
      }

      .border-b-gray-100 {
        border-bottom-color: #f7fafc;
      }

      .border-b-gray-500 {
        border-bottom-color: #a0aec0;
      }

      .border-b-gray-900 {
        border-bottom-color: #1a202c;
      }

      .border-l-white {
        border-left-color: #fff;
      }

      .border-l-gray-100 {
        border-left-color: #f7fafc;
      }

      .border-l-gray-500 {
        border-left-color: #a0aec0;
      }

      .border-l-gray-900 {
        border-left-color: #1a202c;
      }

      @media (min-width: 640px) {
        .sm\\:border-t-white {
          border-top-color: #fff;
        }

        .sm\\:border-t-gray-100 {
          border-top-color: #f7fafc;
        }

        .sm\\:border-t-gray-500 {
          border-top-color: #a0aec0;
        }

        .sm\\:border-t-gray-900 {
          border-top-color: #1a202c;
        }

        .sm\\:border-r-white {
          border-right-color: #fff;
        }

        .sm\\:border-r-gray-100 {
          border-right-color: #f7fafc;
        }

        .sm\\:border-r-gray-500 {
          border-right-color: #a0aec0;
        }

        .sm\\:border-r-gray-900 {
          border-right-color: #1a202c;
        }

        .sm\\:border-b-white {
          border-bottom-color: #fff;
        }

        .sm\\:border-b-gray-100 {
          border-bottom-color: #f7fafc;
        }

        .sm\\:border-b-gray-500 {
          border-bottom-color: #a0aec0;
        }

        .sm\\:border-b-gray-900 {
          border-bottom-color: #1a202c;
        }

        .sm\\:border-l-white {
          border-left-color: #fff;
        }

        .sm\\:border-l-gray-100 {
          border-left-color: #f7fafc;
        }

        .sm\\:border-l-gray-500 {
          border-left-color: #a0aec0;
        }

        .sm\\:border-l-gray-900 {
          border-left-color: #1a202c;
        }
      }
    `);
  });
});
