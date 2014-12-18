var glob = require('glob'),
	path = require('path'),
	teamcity = require('release-helpers').teamcity,
	release = require('release-helpers').release;



module.exports = function(grunt) {
	'use strict';

	var isDevelopmentRun = !grunt.option('prod'),
		testsReporters = ['coverage'],
		coverageReporters = [
			{type: 'html', dir:'coverage/'}
		],
		pkg = grunt.file.readJSON('package.json');


	function tcSetBuildVersion() {
		teamcity.setBuildVersion();
	}

	function versionBump() {
		var done = this.async(),
			type = grunt.option('type');

		if (teamcity.isCiRun()) {
			type = teamcity.getProperty('release.type');
		}

		release.versionBump(type, done);
		teamcity.setBuildVersion();
	}

	if (!isDevelopmentRun) {
		testsReporters.push('teamcity');
		coverageReporters.push({type: 'teamcity'});


	} else {
		testsReporters.push('dots');
		coverageReporters.push({type: 'text'});
	}

	grunt.initConfig({
		pkg: pkg,
		phantomFolder: function() {
			return path.join(__dirname, glob.sync('coverage/*')[0]);
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			files: ['src/**/*.js']
		},
		clean: {
			install: ['lib/'],
			coverage: ['coverage/'],
			docs: ['docs/']
		},

		karma: {
			options: {
				autoWatch: isDevelopmentRun,
				singleRun: !isDevelopmentRun
			},
			unit: {
				configFile: 'karma.unit.conf.js',
				browsers: ['PhantomJS'],
				reporters: testsReporters,
				coverageReporter: {
					retorters: coverageReporters
				}
			}
		},

		shell: {
			bower_install: {
				command: 'node node_modules/bower/bin/bower install'
			}
		},

		jscs: {
			options: {
				config: '.jscsrc'
			},
			src: 'src/**/*.js'
		},

		copy: {
			coverage:{
				files: [
					{src: ['**'], cwd: '<%= phantomFolder() %>', expand: true, dest: 'coverage'}
				]
			}
		},

		jsdoc: {
			docs: {
				src: ['src/*.js'],
				dest: 'docs'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-interactive-shell');
	grunt.loadNpmTasks('grunt-jscs-checker');
	grunt.loadNpmTasks('grunt-jsdoc');

	grunt.registerTask('version_bump', versionBump);
	grunt.registerTask('tc_set_build_version', tcSetBuildVersion);
	grunt.registerTask('docs', ['clean:docs', 'jsdoc:docs']);
	grunt.registerTask('install', ['clean:install', 'shell:bower_install']);
	grunt.registerTask('check_style', ['jscs', 'jshint']);
	grunt.registerTask('test', ['clean:coverage', 'check_style', 'karma:unit', 'copy:coverage']);
	grunt.registerTask('build', ['tc_set_build_version']);
	grunt.registerTask('default', ['install', 'build', 'test']);
	grunt.registerTask('release', ['version_bump', 'docs'])
};