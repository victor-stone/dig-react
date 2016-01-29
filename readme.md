

This project builds dig.ccmixter.org, pells.ccmixter.org, stems.ccmixter.org, playlists.ccmixter.org and some admin tools.

## Build & Run

### Prerequisites

build and run requires node >= 4

we're building with command line tools (for now)

required tools for building:

```bash
npm i browserify -g
npm i babel -g 
npm i eslint -g 
npm i eslint-plugin-react -g
npm i uglify -g
```

### Build

```
./build --<appname>
```

where <appname> is either `dig`, `pells`, `playlists` or `stems`

options:
```
  -v    - verbose
  -a    - build all
  -p    - production (implies build all)
  -d    - development (default)
```

example: this builds dig for production

```
./build --dig -vp
```

### Run

```
node dig
```
and 
```
node pells
```

and 
```
node stems
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
