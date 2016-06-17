import querystring  from 'querystring';
import API          from './api';
import ccmixter     from '../../models/ccmixter';
import serialize    from '../../models/serialize';


class Playlists extends API
{
  createDynamic(name,queryParamsString) {
    var q = queryParamsString + '&title=' + name;
    return this.call('playlist/create/dynamic?' + q).then( serialize( ccmixter.Playlist ) );
  }

  createStatic(name,description,track) {
    var q = `name=${name}&cart_description=${description}`;
    return this.call(`playlist/create/${track}?${q}`).then( serialize( ccmixter.Playlist ) );
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

  toggleFeatured(id) {
    return this.call('playlist/feature/' + id);
  }

  update(id,fields) {
    var q = querystring.stringify(fields);
    return this.call('playlist/update/' + id + '?' + q).then( serialize(ccmixter.PlaylistHead) );
  }

  reorder(id,reorderSpec) {
    return this.call('playlist/reorder/' + id + '?' + reorderSpec);
  }
}

module.exports = Playlists;
