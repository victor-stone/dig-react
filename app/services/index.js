
/*
  There are several cases during boot up that
  causes recursion, esp with the router that
  loads all the potential route modules.

  This allows for code to invoke services (like
  the router) when needed and not imported at
  the top of the file.
*/
function lookup(serviceName) {
  if( serviceName === 'router') {
    return require('./router');
  } else if( serviceName === 'env') {
    return require('services/env');
  } else if( serviceName === 'audioPlayer') {
    return require( './audio-player');
  }
}

module.exports = lookup;
