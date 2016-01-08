var ENV = process.env.NODE_ENV || 'development';
if (ENV === 'development') {
  require('dotenv').load();
}
var gulp = require('gulp'),
  less = require('gulp-less'),
  jade = require('gulp-jade'),
  concat = require('gulp-concat'),
  bower = require('gulp-bower'),
  rename = require('gulp-rename'),
  imagemin = require('gulp-imagemin'),
  cache = require('gulp-cache'),
  minifycss = require('gulp-minify-css'),
  gutil = require('gulp-util'),
  uglify = require('gulp-uglify'),
  jshint = require('jshint'),
  plumber = require('gulp-plumber'),
  reporter = require('gulp-codeclimate-reporter'),
  browserify = require('browserify'),
  path = require('path'),
  source = require('vinyl-source-stream'),
  nodemon = require('gulp-nodemon'),
  karma = require('gulp-karma'),
  protractor = require('gulp-protractor').protractor,
  mocha = require('gulp-mocha'),
  buffer = require('vinyl-buffer'),
  browserSync = require('browser-sync'),
  paths = {
    public: 'public/**',
    jade: ['!app/shared/**', 'app/**/*.jade'],
    scripts: 'app/**/*.js',
    staticFiles: [
      '!app/**/*.+(less|css|js|jade)',
      '!app/images/**/*',
      'app/**/*.*'
    ],
    unitTests: [
      'public/lib/angular/angular.min.js',
      'public/lib/angular-ui-router/release/angular-ui-router.min.js',
      'public/js/application.js',
      'tests/unit/**/*.spec.js'
    ],
    serverTests: ['./tests/server/**/*.spec.js'],
    styles: 'app/styles/*.+(less|css)'
  };

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./public"
    }
  });
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

gulp.task('scripts', function() {
  return gulp.src('app/scripts/**/*.js')
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/js/'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('images', function() {
  gulp.src('app/images/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('public/img/'));
});

gulp.task('test:fend', function() {
  // Be sure to return the stream
  return gulp.src(paths.unitTests)
    .pipe(karma({
      configFile: __dirname + '/karma.conf.js',
      // autoWatch: false,
      // singleRun: true
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('test:bend', function() {
  return gulp.src(paths.serverTests)
    .pipe(mocha({
      reporter: 'spec'
    }))
    .once('error', function() {
      process.exit(1);
    })
    .once('end', function() {
      process.exit();
    });
});

gulp.task('jade', function() {
  gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('./public/'));
});

gulp.task('less', function() {
  gulp.src(paths.styles)
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(less())
    .pipe(gulp.dest('public/css/'))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css/'));
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('public/lib/'));
});

gulp.task('lint', function() {
  return gulp.src(['./app/**/*.js', './index.js', +
      './server/**/*.js', './tests/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('static-files', function() {
  return gulp.src(paths.staticFiles)
    .pipe(gulp.dest('public/'));
});

gulp.task('nodemon', function() {
  nodemon({
      script: 'index.js',
      ext: 'js',
      ignore: ['public/lib', 'node_modules/']
    })
    .on('change', ['lint'])
    .on('restart', function() {
      console.log('>> node restart');
    });
});

gulp.task('codeclimate-reporter', ['test:fend', 'test:bend'], function() {
  return gulp.src(['coverage/lcov/lcov.info'], {
      read: false
    })
    .pipe(reporter({
      token: process.env.CODECLIMATE_REPO_TOKEN,
      verbose: true
    }));
});

gulp.task('watch', function() {
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.styles, ['less']);
});

gulp.task('build', ['jade', 'less', 'static-files', 'scripts', 'bower']);
gulp.task('production', ['nodemon', 'build']);
gulp.task('default', ['nodemon', 'watch', 'build', 'images']);
gulp.task('test', ['test:bend', 'test:fend', 'codeclimate-reporter']);
