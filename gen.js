var fs   = require('fs');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));


var template = 
"var React = require('react');\n\n"  +

"const {{componentName}} = React.createClass({\n\n"  +

"  render() {\n"  +
"    return  (\n"  +
"      <div>\n"  +
"        <h1>Stuff about {{componentName}}</h1>\n"  +
"        <p>Blbha lblah blah</p>\n"  +
"      </div>\n"  +
"    );\n"  +
"  },\n\n"  +

"});\n\n"  +

"module.exports = {{componentName}};\n\n";

var routeInject = 
"<Route path=\"{{componentName}}\"     component={require('./routes/{{componentName}}')} />\n";

var name = argv.n;

if( argv.r === true ) {

  // Generating a Route

  // make the component file
  var text = template.replace(/\{\{componentName\}\}/g,name);
  var dest = 'app/routes/' + name + '.js';
  fs.writeFileSync( dest, text );
  console.log('created file: ', dest);

  // update the <Router> section in app.jsx if it's not
  // already got this route
  
  var appFile   = 'app/app.jsx';
  var appjsx    = fs.readFileSync( appFile, 'utf-8');
  var routePath = "('./routes/" + name + "')";

  if( appjsx.match(routePath) === null ) {
    text = routeInject.replace(/\{\{componentName\}\}/g,name);
    var marker = '{/* routes */}';
    appjsx = appjsx.replace(marker, "      " + text + marker);
    fs.writeFileSync(appFile,appjsx);  
    console.log('updated ', appFile);
  }
}
