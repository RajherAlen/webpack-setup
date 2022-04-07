const paths = require("./config/paths");

module.exports = {
	plugins: [
		require("postcss-import")(
			require("postcss-normalize")().postcssImport({
				path: [paths.appSrc]
			})
		),
		require("postcss-mixins"),
		require("postcss-simple-vars"),
		require("postcss-nested"),
		require("postcss-custom-media"),
		require("postcss-responsive-type"),
		require("postcss-color-function"),
		require("postcss-inline-svg"),
		require("postcss-calc"),
		require("autoprefixer")({
			browserlist: [
				">1%",
				"last 4 versions",
				"Firefox ESR",
				"not ie < 9" // React doesn't support IE8 anyway
			],
			flexbox: "no-2009"
		})
		// require("cssnano")({
		//     preset: [
		//         "default",
		//         {
		//             discardComments: { removeAll: true },
		//             svgo: true,
		//         },
		//     ],
		// }),
	]
};
