/* globals $ */
import env    from 'services/env';
import events from 'models/events';

let alreadySet = false;

// TODO: debounce these events
function SetTrap() {
  if( !global.IS_SERVER_REQUEST  ) {
    if( alreadySet ) {
      return;
    }
    $(document)
      .bind('ajaxSend',     () => env.emit( events.LOADING, true ) )
      .bind('ajaxComplete', () => env.emit( events.LOADING, false ) );
    alreadySet = true;
  }
}

module.exports = SetTrap;