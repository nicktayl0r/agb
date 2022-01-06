module.exports = {
	moduleFileExtensions: ["ts", "js", "json", "vue", "jsx", "tsx"],
	transform: {
		"^.+\\.vue$": "vue-jest",
		".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
			"jest-transform-stub",
		"^.+\\.(t|j)sx?$": "ts-jest"
	},
	testRegex: "((?<!snap)\.test).(js|jsx|(?<!d\.)ts|tsx)?$",
	testPathIgnorePatterns: ["/node_modules/", "/__snapshots__/"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1"
	},
	snapshotSerializers: ["jest-serializer-vue"],
	globals: {
		"ts-jest": {
			diagnostics: {
				warnOnly: true
			},
			"vue-jest": {
				babelConfig: false
			}
		}
	},
	collectCoverage: false,
	collectCoverageFrom: [
		"src/**/*.{ts,vue}",
		"!**/node_modules/**",
		"!src/tests/**",
		"!**/*.d.ts"
	],
	setupFiles: ["jest-canvas-mock"]
};
