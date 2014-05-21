var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var swig = require('swig');
var path = require('path');
var es = require('event-stream');
var site = {};
var templates = {};

module.exports = gulp;

gulp.task('default', ['generate']);

gulp.task('generate', ['get-templates'], function(){

    gulp.src('./content/**/*.md')
        .pipe($.marked())
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
        .pipe(gulp.dest('./'))
        .pipe($.sitemap({
            siteUrl: 'http://www.adamlynch.com'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('get-templates', function(){
    templates = {};

    gulp.src('./templates/**/*')
        .pipe(es.map(function(file){
            var name = path.basename(file.path).split('.')[0];
            templates[name] = String(file.contents);
        }));
});
