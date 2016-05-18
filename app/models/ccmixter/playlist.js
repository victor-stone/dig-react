import Model          from '../model';
import querystring    from 'querystring';
import { TagString }  from '../../unicorns';
import { Upload }     from './upload';

class PlaylistCurator extends Model {
  constructor() {
    super(...arguments);
    this.nameBinding = '_bindParent.user_real_name';
    this.idBinding   = '_bindParent.user_name';
    this.avatarURLBinding = '_bindParent.user_avatar_url';
  }
}

class PlaylistTrack extends Upload {
  constructor() {
    super(...arguments);
    this.numPlaylistsBinding = 'upload_num_playlists';
  }
}

class Playlist extends Model {
  constructor() {
    super(...arguments);
    this._modelSubtree = {
      curator: PlaylistCurator
    };
    this.idBinding = 'cart_id';
    this.nameBinding = 'cart_name';
    this.date = 'cart_date_format';
    this.getIsDynamic = function() {
      return !!this.cart_dynamic;
    };
    this.getQueryParams = function() {
      return querystring.parse(this.cart_dynamic);
    };
    this.getCount = function() {
      return this.cart_dynamic ? 'dynamic' : this.cart_num_items || 0;
    };
    this.getTags = function() {
      return new TagString(this.cart_tags);
    };
  }
}

class PlaylistHead extends Playlist {
  constructor() {
    super(...arguments);
    this.subTypeBinding = 'cart_subtype';
    this.descriptionBinding = 'cart_desc_html';
    this.descriptionRawBinding = 'cart_description';
    this.getIsFeatured = function() {
      return this.cart_subtype === 'featured';
    };
  }
}

module.exports = {
  Playlist,
  PlaylistHead,
  PlaylistTrack,
};
