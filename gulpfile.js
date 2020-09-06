// делаем переменные для каждого плагина
let gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    swiper = require('gulp-swiper');

// new task creation
gulp.task('sass', function () {
  //  путь для scss
  return gulp.src('app/scss/style.scss')                             
    .pipe(sass({ outputStyle: 'expanded' }))  // or compressed                                 
    .pipe(rename({ suffix: '.min' }))  // if compressed
    //  пайп для авторпефиксера,так как мы пишем на sass/scss, добавляем сюда
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions']    
    }))
    // путь для того куда будет отправляться сконвертированый scss.
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

// 
gulp.task('style', function(){
  return gulp.src([
    
    'node_modules/swiper/swiper-bundle.css',
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/magnific-popup/dist/magnific-popup.css'
  ])
    .pipe(concat('libs.min.css'))
    // минифицируем сss с помощью cssmin плагина
    .pipe(cssmin())
    //выкидываем результат в папку css
    .pipe(gulp.dest('app/css'))
});

// конкатинируем оба плагина в одну либу
gulp.task('script', function(){
  return gulp.src([

    'node_modules/swiper/swiper-bundle.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
  ])
    .pipe(concat('libs.min.js'))
    // минифицируем с помощью uglify
    .pipe(uglify())
    // всё это закидываем в нашу js папку
    .pipe(gulp.dest('app/js'))
});

//  таск для всех html файлов,для браузерсинка
gulp.task('html', function(){
  return gulp.src('app/*.html')
  .pipe(browserSync.reload({stream: true}))

});

//  таск для всех js файлов,для браузерсинка
gulp.task('js', function(){
  return gulp.src('app/js/*.js')
  .pipe(browserSync.reload({stream: true}))
});

// таск самого браузерсинка из доки,добавляем свой путь вида "app/"
gulp.task('browser-sync', function(){
  browserSync.init({
      server: {
          baseDir: "app/"
      }
  });
});

// таск для watch, наблюдает за изменениями всех файлов html,js,sass/scss.
gulp.task('watch', function(){
  gulp.watch('app/scss/style.scss', gulp.parallel('sass'))
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('js'))
});
//  объединение в общий таск трёх тасков.
gulp.task('default', gulp.parallel('style', 'sass', 'watch', 'browser-sync', 'script'))