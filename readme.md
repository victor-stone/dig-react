
NOTE - the current repo is in a major overhaul - very unstable right now.

This project builds web front ends for ccmixter, dig.ccmixter and satellite (landing pages) for stems, playlists and pells.


## Build & Run

### Prerequisites

build and run requires node >= 4

Not totally sure what global command line tools are required !!

### Build

Using gulp for building

To build an app:

```
gulp server-js
gulp --<appname>
```
Note that you only have to build server-js 

where <appname> is either `dig` or `ccmixter` 

it could also be one of the satellites `pells`, `playlists` or `stems`

options:
```
  -v    - verbose
  -p    - production
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
