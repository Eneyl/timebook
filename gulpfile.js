let gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer')

gulp.task('clean', async function(){
  del.sync('dist')
})

gulp.task('pug', function() {
  return gulp.src(['app/pug/**/*.pug', '!app/pug/**/_*.pug'])
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    //.pipe(sass({ includePaths : ['app/scss/template/'] }))
    .pipe(autoprefixer({
      browsers: ['last 8 versions']
    }))

    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function() {
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
   
  ])
  .pipe(concat('_libs.scss'))
  .pipe(gulp.dest('app/scss'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function() {
  return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function() {
  return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream: true}))
});

// gulp.task('js', function () {
//   return gulp.src([
    
   
//   ])
//     .pipe(concat('libs.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('app/js'))
//     .pipe(browserSync.reload({stream: true}))
// });

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  })
});

gulp.task('export', function() {
  let buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));

  let buildCss = gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('dist/css'));

  let buildJs = gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/js'));
  
  let buildFonts = gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));

  let buildImg = gulp.src('app/img/**/*.*')
    .pipe(gulp.dest('dist/img'));
})

gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'))
  gulp.watch(['app/pug/**/*.pug','app/pug/*.pug'], gulp.parallel('pug'))
  gulp.watch('app/js/*.js', gulp.parallel('script'))
});

gulp.task('build', gulp.series('clean', 'export'))

gulp.task('default', gulp.parallel('css', 'sass', 'browser-sync','pug', 'watch'));
