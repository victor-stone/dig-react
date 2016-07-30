import querystring  from 'querystring';
import API          from './api';
import ccmixter     from '../../models/ccmixter';
import serialize    from '../../models/serialize';


class Playlists extends API
{
 
  create(name,description,track,queryParamsString) {
    let q = '';
    if( queryParamsString ) {
      q = queryParamsString + '&title=' + name;
      return this.call('playlist/create/dynamic?' + q).then( serialize( ccmixter.Playlist.Playlist ) );      
    }
    q = `name=${name}&cart_description=${description}`;
    return this.call(`playlist/create/${track}?${q}`).then( serialize( ccmixter.Playlist.Playlist ) );
  }

  deletePlaylist(id) {
    return this.call('playlist/delete/' + id);
  }

  addTrack(upload,id) {
    return this.call('playlist/addtrack/' + upload + '/' + id);    
  }

  removeTrack(upload,id) {
    return this.call('playlist/removetrack/' + upload + '/' + id);
  }

  updateDynamic(id,props) {
    var q = typeof(props) === 'string' ? props : querystring.stringify(props);
    return this.call('playlist/update/dynamic/' + id + '?' + q);
  }

  update(id,fields) {
    var q = querystring.stringify(fields);
    return this.call('playlist/update/' + id + '?' + q);
  }

  reorder(id,reorderSpec) {
    return this.call('playlist/reorder/' + id + '?' + reorderSpec);
  }
}

module.exports = Playlists;
