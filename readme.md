
NOTE - the current repo is in a major overhaul - somewhat unstable right now. See the `TODO` file for what's going on.

This project builds web front ends for ccmixter, dig.ccmixter and satellite (landing pages) for stems, playlists and pells.


## Build & Run

### Prerequisites

build and run requires node >= 4 and gulp command line.

### Build

See the bash script `build` for full production build.

Recommended: use the `build` bash script to populate the `/dist` directory, then use gulp to repopulate stuff you're working on.

Options to gulp:
```
  --<name>         - app or satellite name (valid names: dig, ccmixter, stems, playlists, pells)
                       Default: ccmixter
  -p               - production build, minifies js/css
                       Default: off
  --apihost=<host> - host domain for Query API. Only applies to apps. 
                       Current default: ccmixter.org
                       Future: api.ccmixter.org
  --sathost=<host> - host domain for links in static landing pages. Only applies to satellites.
  					   Current default: beta.ccmixter.org
  					   Future: ccmixter.org
```               

N.B. The app build will *only* build the browser app. To sync the server JS use:
```
gulp server-js --<appname>
```

See `gulpfile.js` for all possible tasks. It's all very atomic. So for example if you make a change to one of the public css files in ccmixter you can just:
```
gulp browser-css
```
or added an image to dig
```
gulp browser-static --dig
```



### Watch

To rebuild ccmixter on the fly install `watchify` and run
```
gulp watchify 
```
or for dig
```
gulp watchify --dig
```

N.B.: This will watch the `./work/app` directory, not the `./app` source files so as you work in `./app` you'll want to copy what you save to `./work/app`. In order to automate that in Sublime you can set up a build rule that looks like:

```javascript
{
  "shell_cmd":  "cp $file ${file/app\\//work\\/app\\//}",
}
```

### Run

The satellites are static web pages.

`dig` and `ccmixter` run under node


```
node dist/dig
```
and 
```
node dist/ccmixter
```

options:

```
  --port=<port>    - default 3000
  -v               - verbose print outs
  -c               - use node clusters for multithreading
```

examples:

```
  node dig
  node dig --port=4000
  node dig -c
```
  
## Logs

Access logs are written to ./logs. To browse the logs start:

```
  node logger --port:<magic-port-number>
```

Then browse to `http://localhost:<magic-port-number>`

The port is encoded so people can't snoop it. The port number is encoded in an MD5 in logger/index.js

### Love

And boy do we LOVE [Browser Stack](http://browserstack.com)
