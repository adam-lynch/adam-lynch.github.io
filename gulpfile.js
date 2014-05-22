var gulp =  require('gulp');
var $ =     require('gulp-load-plugins')();
var swig =  require('swig');
var path =  require('path');
var es =    require('event-stream');
var args =  require('yargs').argv;

var site = {};
var templates = {};
var isDevMode = args.mode === 'dev';

var paths = {
    output: {}
};
paths.output.devRoot = './dev-mode-output';
paths.output.prodRoot = './';
paths.output.root = isDevMode ? paths.output.devRoot : paths.output.prodRoot;

module.exports = gulp;

gulp.task('default', ['generate']);

gulp.task('clean', function(done){
    var source = null;

    if(isDevMode){
        source = gulp.src(paths.output.root + '**/**');
    }
    else {
        source = gulp.src('./content/**/*.md')
            .pipe($.rename({extname: '.html'}))
            .pipe($.ssg(site))
            .pipe(gulp.dest(paths.output.root));
    }

    source
        .pipe($.clean())
        .on('end', done);
});

gulp.task('generate', ['get-templates'], function(done){

    gulp.src('./content/**/*.md')
        .pipe($.markdown())
        .pipe($.ssg(site))
        .pipe(es.map(function(file, cb) {
            var output = swig.render(templates['index'], {
                locals: {
                    site: site,
                    content: String(file.contents)
                }
            });

            file.contents = new Buffer(output);
            cb(null, file);
        }))
        .pipe($.htmlmin({
            collapseWhitespace: true
        }))
        .pipe($.w3cjs())
        .pipe(es.map(function(file, cb){
            cb(null, file);
            if (!file.w3cjs.success){
                throw new Error('HTML validation error(s) found');
            }
        }))
        .pipe(gulp.dest(paths.output.root))
        .pipe($.sitemap({
            siteUrl: 'http://www.adamlynch.com'
        }))
        .pipe(gulp.dest('./'))
        .on('end', done);
});

gulp.task('get-templates', function(){
    templates = {};

    gulp.src('./templates/**/*')
        .pipe(es.map(function(file){
            var name = path.basename(file.path).split('.')[0];
            templates[name] = String(file.contents);
        }));
});
