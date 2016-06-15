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

    this.feed        = new Feed(this);
    this.playlists   = new Playlists(this);
    this.playlist    = this.playlists;
    this.user        = new User(this);
    this.upload      = new Upload(this);
    this.uploads     = this.upload;
  }

  _call_wrap(promise) {
    return promise.then( result=> {
      if( typeof result.status === 'undefined' || result.status === 'error' ) {
        throw new Error(result.errmsg || 'because error');
      }
      return (result.data || result);
    }).catch( e => {
      env.alert('danger', 'wups, that didn\'t work so well: ' + e.message );
    });
  }

  _call(cmd) {
    return this._call_wrap(this.adapter.callOne(cmd));
  }

  _post(cmd,args) {
    return this._call_wrap(this.adapter.post(cmd,args));
  }

  _patch(cmd,args) {
    return this._call_wrap(this.adapter.patch(cmd,args));
  }
}

module.exports = new CCMixter();
