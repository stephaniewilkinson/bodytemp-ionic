var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
gulp.task('js', function () {
    var src = [
        './src/js/lib/_motion.js',
        './src/js/lib/_ink.js'
    ];
    var js = gulp.src(src)
        .pipe(concat('ionic.material.js'))
        .pipe(gulp.dest(distPath));

    if (minify) {
        js.pipe(uglify())
            .pipe(rename('ionic.material.min.js'))
            .pipe(gulp.dest(distPath))
    }
    return js;
});

gulp.task('serve', function(){
    return connect.server();
});


gulp.task('webpack', function(){
    var webpackConfig = require('./webpack.config.js');
    var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
        sourcemaps: false
    });

    var minifiedConfig = _.cloneDeep(webpackConfig);
    if(!minifiedConfig.plugins || _.isEmpty(minifiedConfig.plugins)){
        minifiedConfig.plugins = [];
    }
    minifiedConfig.plugins.push(uglifyPlugin);
    minifiedConfig.output.filename = 'ionic.material.min.js';

    return gulp.src('src/ionic-material.js')
      .pipe(gulpWebpack(webpackConfig))
      .pipe(gulp.dest(distPath))
      .pipe(rename('ionic.material.js'))
      .pipe(gulp.src('src/ionic-material.js')) // dunno if this is needed, just getting unminified src again
      .pipe(gulpWebpack(minifiedConfig))
      .pipe(gulp.dest(distPath))
      .pipe(rename('ionic.material.min.js'));
});

gulp.task('styles', function () {
    var src = './src/scss/index.scss';

    var scss = gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('ionic.material.css'));


    if (minify) {
        scss.pipe(gulp.dest(distPath)).pipe(rename({
            suffix: '.min'
        }))
            .pipe(minifycss())
            .pipe(rename('ionic.material.min.css'))
            .pipe(sourcemaps.write()).pipe(gulp.dest(distPath));
    } else {
        scss.pipe(sourcemaps.write()).pipe(gulp.dest(distPath));
    }

    return scss;
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['./*.js', '!./src/js/'], ['webpack']);
    gulp.watch('./*.scss', ['styles']);
});

gulp.task('build', function () {
    minify = true;
    return gulp.start(['webpack', 'styles']);
})
