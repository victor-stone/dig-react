/* eslint no-console:0 */
import { oassign } from '../unicorns';

function set(opts) {
  oassign( env, opts );
}

function assert( truthyTest, msg ) {
  if( env.debugMode ) {
    if( !truthyTest ) {
      console.log('ASSERT FAILED', msg);
    }
  }
}

var env = { set, assert };

module.exports = env;

