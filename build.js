
var fs         = require("fs");
var browserify = require("browserify");
var babelify   = require("babelify");
var RSVP       = require('rsvp');
var glob       = require('glob');
var del        = require('del');
var argv       = require('minimist')(process.argv.slice(2));

var fopen  = RSVP.denodeify(fs.open);
var fread  = RSVP.denodeify(fs.readFile);

var MODE     = argv.mode || 'dev';
var buildAll = argv.all || false;
var verbose  = argv.verbose || false;

build();

function build() {

  if( buildAll ) {
    var builders = [ 
        bundleVendorJSFiles(), 
        bundleVendorCSSFiles(), 
        publishPublicFiles() 
      ];

    RSVP.all(builders).then( function() {
        publishFontFiles();
        publishSourceMaps();
        bundleAppJSFiles();
      });

  } else {
    bundleAppJSFiles();
  }
}

function publishPublicFiles() {

  copy( 'public/index.html', 'dist/index.html' );  
  mkdir('dist/images');
  glob('public/images/*.*', function(errrrrrr,fnames) {
    fnames.forEach( fname => copy( fname, fname.replace('public/','dist/') ) );
  });
  
  return bundleAppCSSFiles();
}

function bundleAppCSSFiles() {
  var files = [
    'public/main.css',
    'public/audio-player.css'
  ];
  return bundleAppFiles(files,'css')
}

function bundleAppJSFiles() {
  console.log('writing bundle js files');

  var opts = { 
    debug: MODE === 'dev',
  };

  return browserify("app/app.jsx", opts)
    .transform(babelify)
    .bundle()
    .on("error", err)
    .pipe(fs.createWriteStream("dist/js/bundle.js"));
}

function bundleVendorJSFiles() {  
  console.log('writing vendor js files');

  var vendorJSSources = {
    dev: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js'
        ],
    prod: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js'
    ]
  };
  return bundleVendorFiles(vendorJSSources[MODE],'js');
}

function publishFontFiles() {

  console.log('writing vendor font files');

  mkdir('dist/fonts');

  var rootd = 'node_modules/font-awesome/';

  glob( rootd + 'fonts/*.*', function(errrrrrr,fnames) {
    fnames.forEach( fname => copy( fname, fname.replace(rootd,'dist/') ) );
  });
}

function publishSourceMaps() {

  if( MODE === 'dev' ) {

    console.log('writing vendor font files');

    var fromTos = [
      {
        from: 'node_modules/bootstrap/dist/css/bootstrap-theme.css',
        to: 'dist/css/bootstrap-theme.css'
      }
    ];
    fromTos.forEach( ft => copy(ft.from, ft.to) );
  }
}

function bundleVendorCSSFiles() {
  console.log('writing vendor css files');

  var vendorCSSSources = {
    dev: [
      'node_modules/bootstrap/dist/css/bootstrap.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.css',
      'node_modules/font-awesome/css/font-awesome.css',
    ],
    prod: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
      'node_modules/font-awesome/css/font-awesome.min.css',
    ]
  };
  return bundleVendorFiles(vendorCSSSources[MODE],'css');
}

function bundleVendorFiles(arr,outext) {
  var dir = 'dist/' + outext;
  mkdir(dir);
  return bundleFiles(arr, dir + '/vendor.' + outext);
}

function bundleAppFiles(arr,outext) {
  // should be uglify step here
  var dir = 'dist/' + outext;
  mkdir(dir);
  return bundleFiles(arr, dir + '/app.' + outext);
}

function bundleFiles(arr,destination) {
  var fd = null;

  return fopen(destination, 'w')
    .then( function(fileDescriptor) {
        fd = fileDescriptor;
        var promises = arr.map( n => fread(n,'utf8') );
        return RSVP.all(promises);
      })
    .then( function(datas) {
        fs.write(fd,datas.join("\n/* ccmbuildjoint */\n"));
        fs.close(fd);
      })
    .catch( err );
}

function copy(src,dest) {
  if( verbose ) {
    console.log('copying ', dest);
  }
  fs.createReadStream(src)
    .on('error', err )
    .pipe(fs.createWriteStream(dest))
}

function err(err) {
   console.log("Error : " + err.message);
}

function mkdir( dir ) {
  try { fs.mkdirSync(dir); } catch(e) { }
}