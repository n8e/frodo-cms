// Karma configuration
// Generated on Thu Jan 07 2016 16:26:21 GMT+0300 (EAT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'public/lib/angular/angular.min.js',
      'public/lib/angular-route/angular-route.js',
      'public/lib/angular-mocks/angular-mocks.js',
      'public/lib/angular-resource/angular-resource.js',
      'public/lib/socket.io-client/socket.io.js',
      'public/lib/classie/classie.js',
      'public/lib/sinonjs/sinon.js',
      'app/scripts/app.routes.js',
      'app/scripts/controllers.js',
      'app/scripts/services.js',
      'app/scripts/directives.js',
      'app/scripts/app.js',
      'tests/unit/client/**/*.js'
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: 
    // https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/scripts/app.js': 'coverage',
      'app/scripts/app.routes.js': 'coverage',
      'app/scripts/controllers.js': 'coverage',
      'app/scripts/services.js': 'coverage',
      'app/scripts/directives.js': 'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['coverage', 'progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || 
    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests 
    // whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: 
    // https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity,
    coverageReporter: {
      reporters: [{
        type: 'html',
        subdir: 'html'
      }, {
        type: 'lcovonly',
        subdir: 'lcov'
      }],
      dir: 'coverage/'
    }
  });
};
