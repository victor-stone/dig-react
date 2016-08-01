/* globals $ */
import env    from './env';
import events from '../models/events';

let alreadySet = false;

// TODO: debounce these events
function SetTrap() {
  if( !global.IS_SERVER_REQUEST || alreadySet ) {
    $(document)
      .bind('ajaxSend',     () => env.emit( events.LOADING, true ) )
      .bind('ajaxComplete', () => env.emit( events.LOADING, false ) );
    alreadySet = true;
  }
}

module.exports = SetTrap;