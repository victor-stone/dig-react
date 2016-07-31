/*

  This file knows how to build 2 web apps:
    ccmixter.org (front-end)
    dig.ccmixter.org

  It also builds 3 satellite websites:
    pells.ccmixter.org
    stems.ccmixter.org
    playlists.ccmixter.org

  A satellite is a static HTML landling page that has no 
  back-end and links into the main ccmixter.org site

*/

var fs         = require('fs');
var del        = require('del');
var gulp       = require('gulp');
var template   = require('gulp-template');
var rename     = require('gulp-rename');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var browserify = require('browserify');
var watchify   = require('watchify');
var babel      = require('gulp-babel');
var eslint     = require('gulp-eslint');
var concat     = require('gulp-concat');
var chmod      = require('gulp-chmod');
var uglify     = require('gulp-uglify');
var cssmin     = require('gulp-clean-css');
var gutil      = require('gulp-util');
var todo       = require('gulp-todo');
var argv       = require('minimist')(process.argv.slice(2));
var indexJS    = require('./lib/build/index-js');

const DEFAULT_WEB_SHARE = 755;

/************************* 
  COMMAND LINE DEFAULTS
*************************/

/*
  --apihost=<api-query-host-domain> 
      Default: ccmixter.org
      Future: api.ccmixter.org
*/
const QUERY_HOST = 'ccmixter.org'; 


/*
  --sathost=<ccmixter-front-end-domain>
      Default: beta.ccmixter.org
      Future: ccmixter.org
*/
const SATELLITE_HOST = 'beta.ccmixter.org';

/**************************** 
     CONFIG FOR THIS RUN
*****************************/

var apihost = argv.apihost || QUERY_HOST;
var sathost = argv.sathost || SATELLITE_HOST;

var work_target = './work';

var temp_target = './tmp-build';

var target = argv.p ? temp_target : './dist';


var config = {
  debug:          !argv.p,
  apihost:         apihost || 'ccmixter.org',
  satellite_host:  sathost,
  buildDate:       new Date() + '',
  app:            'ccmixter',
  apps:           [ 'ccmixter', 'dig' ],
  satellites:     [ 'pells', 'stems', 'playlists' ],
  target:         target
};

config.apps = config.apps.concat(config.satellites);

config.apps.forEach( a => {
  if( argv[a] ) {
    config.app = a;
  }
});

config.isSatellite = config.satellites.indexOf( config.app ) !== -1;

function showConfig() {
  gutil.log( gutil.colors.white.bgBlack('config:'), '\n', config );
}

showConfig();


/********************** 
    ATOMIC TASKS 
***********************/

function task_lint() {
  return gulp.src('app/**/*.js')
            .pipe(eslint())
            // eslint.format() outputs the lint results to the console. 
            // Alternatively use eslint.formatEach() (see Docs). 
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
}

function task_make_indecies() {

  var dirs = [ 
      './app/components',
      './app/components/dig',
      './app/components/dig/upload',
      './app/components/filters',
      './app/components/playlists/pages',
      './app/components/vanilla',
      './app/mixins',
      './app/models/filters',
      './app/unicorns/browser',
      './app/unicorns/react',
      './app/unicorns/vanilla',
    ];
  return gulp.src(dirs, { base: './' })
          .pipe(indexJS(/unicorns/))
          .pipe(gulp.dest(work_target));
}

function task_work_clean() {
  return del( work_target );
}

function task_browser_clean() {
  return del( `${target}/${config.app}/browser` );
}

function task_server_clean() {
  return del( `${target}/server` );
}

function task_satellite_clean() {
  return del( `${target}/${config.app}` );
}

function task_clean() {
  return del( target );
}

function task_copy_to_work() {
  return gulp.src('app/**/*.js', { base: './' })
              .pipe(gulp.dest(work_target));
}

function task_satellite_stub() {
  return gulp.src(`satellites/${config.app}/index.html`)
          .pipe(template(config))
          .pipe(gulp.dest(`${target}/${config.app}/`));
}

function task_satellite_files() {
  gulp.src( 'node_modules/font-awesome/fonts/*.*' )
    .pipe(gulp.dest(`${target}/${config.app}/fonts`));
  gulp.src( [ `satellites/${config.app}/**/*`, `!satellites/${config.app}/index.html`, `!satellites/${config.app}/**/*.css`] )
    .pipe(gulp.dest(`${target}/${config.app}/`));  
  gulp.src(`satellites/${config.app}/**/*.css`)
    .pipe( cssmin() )
    .pipe(gulp.dest(`${target}/${config.app}/`));  
}

function task_satellite_chmod() {
  return gulp.src(`${target}/${config.app}/**/*`)
          .pipe(chmod(DEFAULT_WEB_SHARE))
          .pipe(gulp.dest(`${target}/${config.app}`));
}

function task_browser_stub() {
  return gulp.src('app/browser.template')
          .pipe(template(config))
          .pipe(rename('index.js'))
          .pipe(gulp.dest(`${work_target}/app`));
}

function _b_output() {
  return `${target}/${config.app}/browser/js`;
}

function _b_options(watch) {

  // These are the vanilla options

  const opts = {
    entries: `${work_target}/app/index.js`,
    debug: config.debug,
    noParse: 'http',
    fullPaths: config.debug
  };

  // These are needed for watchify
  
  if( watch ) {
    Object.assign( opts, { 
      cache: {},
      packageCache: {},
      plugin: [watchify]});
  }

  const b = browserify(opts);
  
  if( watch ) {
    b.on('update', () => b.bundle().pipe(fs.createWriteStream(_b_output()+`/${config.app}.js`)) );
    b.on('log', msg => gutil.log(msg) );
  }
  
  // We exclude react b/c we're loading that in a 
  // separate <script> tag.
  //
  // Also exclude server-only node modules
  //
  return b
    .exclude('http')
    .exclude('stream-http')
    .external(['react','react-dom','underscore'])
    .bundle()
    .pipe(source(`${config.app}.js`))
    .pipe(config.debug ? gutil.noop() : buffer()) 
    .pipe(config.debug ? gutil.noop() : uglify())
    .pipe(gulp.dest(_b_output()));
}

function task_browser_js() {
  return _b_options(false);
}

function task_watchify() {
  return _b_options(true);
}

function task_browser_css() {
  return gulp.src( `public/{shared,${config.app}}/css/*.css` )
          .pipe(concat(`${config.app}.css`))
          .pipe(config.debug ? gutil.noop() : cssmin() )
          .pipe(gulp.dest(`${target}/${config.app}/browser/css`));
}

function task_browser_static() {
  return [ 'shared', config.app ].forEach( dir => 
            gulp.src( `public/${dir}/{*.html,*.ico,*.xml,*.txt,*.png,images/*.*}`)
                .pipe(  gulp.dest( `${target}/${config.app}/browser` ) )
            );
}

function task_server_stub() {
  return gulp.src('app/server.template')
          .pipe(template(config))
          .pipe(rename('index.js'))
          .pipe(gulp.dest(`${target}/${config.app}`)); 
}

function task_server_js() {
  return gulp.src(`${work_target}/app/**/*.js`)
          .pipe(babel())
          .pipe(gulp.dest(`${target}/server`));
}

gulp.task( 'lib', function() {
  return gulp.src( 'lib/unicorns/**/*.js', { base: './' })
           .pipe(babel())
           .pipe(gulp.dest('dist'));
});


function task_vendor_static() {
  gulp.src( 'node_modules/font-awesome/fonts/*.*' )
    .pipe(gulp.dest(`${target}/${config.app}/browser/fonts`));
  gulp.src( 'node_modules/soundmanager2/swf/soundmanager2{_flash9.swf,.swf}' )
    .pipe(gulp.dest(`${target}/${config.app}/browser/swf`));  
}

function task_vendor_css() {
  var vendorCSSSources = {
    dev: [
      'node_modules/bootstrap/dist/css/bootstrap.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.css',
      'node_modules/font-awesome/css/font-awesome.css',
      'node_modules/nouislider/distribute/nouislider.min.css', /* sic-min */
      'vendor/jquery-ui-1.11.4.custom/jquery-ui.css',
      'vendor/jquery-ui-1.11.4.custom/jquery-ui.structure.css'
    ],
    prod: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
      'node_modules/font-awesome/css/font-awesome.min.css',
      'node_modules/nouislider/distribute/nouislider.min.css',
      'vendor/jquery-ui-1.11.4.custom/jquery-ui.min.css',
      'vendor/jquery-ui-1.11.4.custom/jquery-ui.structure.min.css'
    ]
  };
  
  var mode = config.debug && !config.isSatellite ? 'dev' : 'prod';
  var dest = `${target}/${config.app}/` + (config.isSatellite ? `${config.app}_files` : '/browser/css');

  return gulp.src( vendorCSSSources[mode] )
            .pipe(concat('vendor.css'))
            .pipe(gulp.dest(dest));  
}

function task_vendor_js() {
  var vendorJSSources = {
    dev: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/soundmanager2/script/soundmanager2.js',
        'node_modules/react/dist/react.js',
        'node_modules/react-dom/dist/react-dom.js',
        'node_modules/nouislider/distribute/nouislider.js',
        'node_modules/underscore/underscore.js',
        'vendor/jquery-ui-1.11.4.custom/jquery-ui.js',
        ],
    prod: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/soundmanager2/script/soundmanager2-nodebug-jsmin.js',
        'node_modules/react/dist/react.min.js',
        'node_modules/react-dom/dist/react-dom.min.js',
        'node_modules/nouislider/distribute/nouislider.min.js',
        'node_modules/underscore/underscore-min.js',
        'vendor/jquery-ui-1.11.4.custom/jquery-ui.min.js',
    ]
  };

  /*
  if( config.app === 'stems') {
    vendorJSSources.dev .push( 'vendor/flacplayer/aurora/aurora.js');
    vendorJSSources.prod.push( 'vendor/flacplayer/aurora/aurora.min.js');
    vendorJSSources.dev .push( 'vendor/flacplayer/flac/flac.js');
    vendorJSSources.prod.push( 'vendor/flacplayer/flac/flac.min.js');    
  }
  */

  var mode = config.debug && !config.isSatellite ? 'dev' : 'prod';
  var dest = `${target}/${config.app}/` + (config.isSatellite ? `${config.app}_files` : '/browser/js');

  return gulp.src( vendorJSSources[mode] )
          .pipe(concat('vendor.js'))
          .pipe(gulp.dest(dest));
}

/********************** 
    DEPENDENCIES
***********************/

gulp.task('todo', function() {
    gulp.src('app/**/*.js', { base: './' })
        .pipe(todo())
        .pipe(gulp.dest('./'));
});

gulp.task('publish', function(){
  gulp.src([`${temp_target}/**/*.*`])
  .pipe(gulp.dest('dist'));
});

gulp.task('lint', task_lint );

gulp.task('copy-to-work', ['work-clean'], task_copy_to_work);

gulp.task('make-indecies', ['copy-to-work'], task_make_indecies );

gulp.task('vendor-css',    task_vendor_css );
gulp.task('vendor-js',     task_vendor_js );
gulp.task('vendor-static', task_vendor_static );

gulp.task('work-clean',     task_work_clean);
gulp.task('browser-clean',  task_browser_clean );
gulp.task('server-clean',   task_server_clean );
gulp.task('clean',          ['work-clean'], task_clean );

gulp.task('satellite-clean', task_satellite_clean );
gulp.task('satellite-stub',  task_satellite_stub );
gulp.task('satellite-files', task_satellite_files );
gulp.task('satellite',       ['satellite-stub','satellite-files','vendor-css', 'vendor-js'], task_satellite_chmod );

gulp.task('server-stub', task_server_stub);

gulp.task('-server-prep-2',   ['server-clean'] );
gulp.task('-server-prep-1',   ['-server-prep-2','make-indecies'] );
gulp.task('server-js',        ['-server-prep-1'], task_server_js );

gulp.task('browser-stub',   ['copy-to-work'], task_browser_stub );
gulp.task('browser-js',     ['make-indecies','browser-stub'], task_browser_js );
gulp.task('watchify',       ['make-indecies','browser-stub'], task_watchify );
gulp.task('browser-static', task_browser_static);
gulp.task('browser-css',    task_browser_css );

gulp.task('browser-app',    ['browser-js','browser-css','browser-static' ]);
gulp.task('vendor',         ['vendor-js', 'vendor-css','vendor-static']);
gulp.task('browser',        ['browser-app','vendor']);
gulp.task('app',            ['server-stub','browser']);

var defTask = config.isSatellite ? 'satellite' : 'app';

gulp.task('default', [defTask]);



