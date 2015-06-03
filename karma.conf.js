var babelMoreOptions = { stage: 0 };

module.exports = function (config) {
	config.set({

		// base path, that will be used to resolve files and exclude
		basePath : './',

		// frameworks to use
		frameworks: ['systemjs', 'jasmine'],

		// list of files / patterns to load in the browser
		files: [
			'test/matchers/**/*.js'
		],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor

		preprocessors: {
			'src/*.js': ['coverage']
		},

		reporters: ['dots', 'coverage'],

		coverageReporter: {
			reporters: [
				{type: 'html', dir: 'coverage/'},
				{type: 'text-summary'}
			],

			instrumenters: {isparta: require('isparta')},
			instrumenter: {
				'**/*.js': 'isparta'
			}
		},

		systemjs: {
			configFile: 'test/system.conf.js',
			files: [
				'src/*.js',
				'test/dx.*.unit.spec.js'
			],
			config: {
				transpiler: 'babel'
			},
			testFileSuffix: '.spec.js'
		},

		// list of files to exclude
		exclude: [],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 30000
	});
};
