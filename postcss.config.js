const postcssImport = require('postcss-import')
const normalize = require('postcss-normalize')
const postCssMixins = require('postcss-mixins')
const postcssSimpleVars = require('postcss-simple-vars')
const postcssNested = require('postcss-nested')
const postcssCustomMedia = require('postcss-custom-media')
const postcssResponsiveType = require('postcss-responsive-type')
const postcssColorFunction = require('postcss-color-function')
const postcssInlineSvg = require('postcss-inline-svg')
const postcssCalc = require('postcss-calc')
const autoprefixer = require('autoprefixer')
const paths = require('./config/paths')

module.exports = {
    plugins: [
        postcssImport(
            normalize().postcssImport({
                path: [paths.appSrc],
            })
        ),
        postCssMixins,
        postcssSimpleVars,
        postcssNested,
        postcssCustomMedia,
        postcssResponsiveType,
        postcssColorFunction,
        postcssInlineSvg,
        postcssCalc,
        autoprefixer({
            browserlist: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
        }),
        // require("cssnano")({
        //     preset: [
        //         "default",
        //         {
        //             discardComments: { removeAll: true },
        //             svgo: true,
        //         },
        //     ],
        // }),
    ],
}
