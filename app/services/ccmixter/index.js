import RPCAdapter   from '../rpc-adapter';
import env          from '../env';
import Eventer      from '../eventer';

import Feed      from './feed';
import Playlists from './playlists';
import User      from './user';
import Upload    from './upload';

class CCMixter extends Eventer
{
  constructor() {
    super(...arguments);
    this.adapter = RPCAdapter;

    this.feed = new Feed(this);
    this.playlists = new Playlists(this);
    this.playlist = this.playlists;
    this.user = new User(this);
    this.upload = new Upload(this);
    this.uploads = this.upload;
  }

  _call(cmd) {
    return this.adapter.callOne(cmd).then( result => {
      if( typeof result.status === 'undefined' || result.status === 'error' ) {
        throw new Error('the request did not go through ' + (result.errmsg || 'because error'));
      }
      return (result.data || result);
    }).catch( e => {
      env.alert('danger', 'wups, that didn\'t work so well: ' + e.message );
    });
  }

}

module.exports = new CCMixter();
