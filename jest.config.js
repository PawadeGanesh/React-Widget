module.exports = {
	snapshotSerializers: ['enzyme-to-json/serializer'],
	setupFilesAfterEnv: ['<rootDir>/setupEnzyme.js'],
	moduleNameMapper: {
		'^.+\\.(css|less)$': '<rootDir>/config/CSSStub.js'
	},
	modulePathIgnorePatterns: ['helpers'],
	coveragePathIgnorePatterns: [
		'/node_modules/',
		'/src/apiClient/',
		'/src/browserHistory.ts'
	],
	transform: {
		'^.+\\.[t|j]sx?$': 'babel-jest'
	},
	presets: ['@babel/preset-env', '@babel/preset-react'],

};