'use strict';

/**
  Module exists to normalize the wild & crazy results from the query API.

  These classes are used by ./serialize to convert raw json to pretty JS objects.

  For all models there are some consistent naming (if not always present - sigh):
  
  use .name for printable name
  use .id for Ember model identifying

  This is why for Tag the .id and .name both map to tags_tag
  
  use 'url' for pages that point to ccMixter
  (Except Trackback - the url property points at the original website.)
  
  So all models that represent uploads/media (Upload, Remix, Trackback) have the
  same properties. 
  
  Access properties related to the artist through the artist object on the upload:
  
     upload.name     -> upload_name
     upload.url      -> file_page_url
     upload.artist.name  -> user_real_name
     upload.artist.url   -> artist_page_url
     upload.artist.id  -> user_name
  
  The audio player will add a .media object that needs to have a .name, .artist.name and 
  .artist.id for the player to display. These are added below in a callback from 
  the player.
  
  See ./serialize for naming conventions.

  Because of the way ES6 handles methods vs. properties, the 'get' methods that end
  up in the target JS object must be declared in the ctor as properties. Anything
  outside the ctor is a helper used during serialization then discarded.
  
*/

import Model          from './model';
import LicenseUtils   from './licenses';
import { TagString }  from '../unicorns';

const NOT_FOUND = -1;

class File extends Model {

  constructor() {
    super(...arguments);
    
    this.urlBinding      = 'download_url';
    this.idBinding       = 'file_id';
    this.sizeBinding     = 'file_filesize';
    this.typeBinding     = 'file_extra.type';
    this.uploadBinding   = '_bindParent';
    this.mediaURLBinding = 'download_url';

    this.getExtension = function() {
      return this.local_path.replace(/.*\.([a-z0-9]+)$/,'$1');
    };

    this.getNicName = function() {
      if( this.file_nicname !== this.getExtension() ) {
        return this.file_nicname;
      }
      return this.file_extra.type;
    };

    this.getTags = function() {
      if( 'ccud' in this.file_extra ) {
        return TagString( this.file_extra.ccud );
      }
      return '';
    };

    this.getIsMP3 = function() {
      var ffi = this.file_format_info;
      if( (ffi) && ('format-name' in ffi) ) {
        return ffi['format-name'] === 'audio-mp3-mp3';
      }
      return false;
    };

    this.getWavImageURL = function() {
      var baseURL = 'http://ccmixter.org/waveimage/'; // um, hello ENV?
      return baseURL + this.file_upload + '/' + this.file_id;
    };

    this.getDownloadSize = function() {
      var sz = this.file_filesize;
      return sz ? sz.replace(/\(|\)|\s+/g, '') : '';
    };

    /* required by audio player */
    
    this.getMediaTags = function() {

      var id          = this._bindParent.upload_id;
      var name        = this._bindParent.upload_name;

      var fileID      = this.file_id;
      var wavImageURL = this.getWavImageURL();
      var artist      = {
                     name: this._bindParent.user_real_name,
                     id: this._bindParent.user_name
                   };

      return { name, id, fileID, artist, wavImageURL };

    };
  }

  _hasTag(tag) {
    var tags = this.getTags();
    if( tags ) {
      return tags.contains(tag);
    }
    return false;
  }

}

class UploadUserBasic extends Model {
  constructor() {
    super(...arguments);
    this.nameBinding = '_bindParent.user_real_name';
    this.idBinding = '_bindParent.user_name';
  }
}

class UploadBasic extends Model {

  constructor() {
    super(...arguments);
    this.nameBinding = 'upload_name';
    this.urlBinding = 'file_page_url';
    this.idBinding = 'upload_id';
    this._modelSubtree = {
          artist: UploadUserBasic,
        };
  }

}

class Remix  extends UploadBasic {

  constructor() {
    super(...arguments);

    this.getId = function() {
      if( this.upload_id )
        return this.upload_id;
      if( this.file_page_url ) {
        return this.file_page_url.match(/\/([\d]+)$/)[1];
      }
    };
  }
}

class Source extends UploadBasic { }

class TrackbackUser extends Model {
  constructor() {
    super(...arguments);
    this.nameBinding = '_bindParent.pool_item_artist';
  }
}

class Trackback extends Model {

  constructor() {
    super(...arguments);
    this._modelSubtree = {
        artist: TrackbackUser,
      };
    this.idBinding = 'pool_item_id';
    this.urlBinding = 'pool_item_url';
    this.embedBinding = 'pool_item_extra.embed';
    this.typeBinding = 'pool_item_extra.ttype';

    this.getName = function() {
      var name = this.pool_item_name + '';
      if( name.match(/^watch\?/) !== null ) {
        name = 'You Tube Video';
      }
      return name;
    };
      
  }
}

class Upload extends UploadBasic {

  constructor() {
    super(...arguments);

    this._modelSubtree = {
      files: File,
      artist: UploadUserBasic,
    };

    this.idBinding = 'upload_id';

    this.getMediaURL = function(target) {
      var f = this.getFileInfo(target);
      return (f && f.mediaURL) || this.fplay_url || this.download_url;
    };
  
    this.getMediaTags = function(target) {
      var f = this.getFileInfo(target);
      return f && f.mediaTags;
    };

    this.getBpm = function() {
      if( this.upload_extra ) {
        var bpm = this.upload_extra.bpm;
        bpm = (bpm + '').match(/^[0-9]+/);
        return (bpm && bpm[0]) || '';
      }
    };

    this.getFileInfo = function(target) {
      return this._findFileInfo( target, f => f.isMP3 );
    };

    this.getWavImageURL = function(target) {
      var f = this.getFileInfo(target);
      return f ? f.wavImageURL : '';
    };

    this.getDownloadSize = function(target) {
      var f = this.getFileInfo(target);
      return f ? f.size.replace(/\(|\)|\s+/g, '') : '';
    };

  }

  _findFileInfo(target,cb) {
    for( var i = 0; i < target.files.length; i++ ) {
      if( cb(target.files[i]) ) {
        return target.files[i];
      }
    }
  }


}

class ACappellaFile extends File {

  constructor() {
    super(...arguments);

    this.getIsPlayablePell = function() {
      return this.getIsMP3() && this._hasTag('acappella');
    };
  }
}

class ACappella extends Upload {

  constructor() {
    super(...arguments);
    this._modelSubtree = {
      files: ACappellaFile,
      artist: UploadUserBasic,
    };

    this.getFileInfo = function(target) {
      return this._findFileInfo( target, f => f.isPlayablePell ) ||
        this._findFileInfo( target, f => f.isMP3 );
    };

  }
}

class UserBasic extends Model {

    constructor() {
     super(...arguments);
     this.nameBinding = 'user_real_name';
      this.idBinding = 'user_name';
    }
}

class User extends UserBasic {

  constructor() {
    super(...arguments);
    this.avatarURLBinding = 'user_avatar_url';

    this.getUrl = function() {
      return this.artist_page_url + '/profile';
    };
    
    this.getHomepage = function() {
      if( this.user_homepage === this.artist_page_url ) {
        return null;
      }
      return this.user_homepage;
    };

  }
}

class DetailUploadUser extends UploadUserBasic {
  constructor() {
    super(...arguments);
    this.avatarURLBinding = '_bindParent.user_avatar_url';
  }
}

class Detail extends Upload {

  constructor() {
    super(...arguments);
    this._modelSubtree = {
      files: File,
      artist: DetailUploadUser,
    };

    this.licenseNameBinding = 'license_name';
    this.licenseURLBinding = 'license_url';
    //this.featuringBinding = 'upload_extra.featuring';

    this.getTags = function() {
      return TagString(this.upload_tags);
    };
    
    this.getUserTags = function() {
      return TagString( this.upload_extra.usertags );
    };
    
    this.getFeaturing = function() {
      var feat = this.upload_extra.featuring;
      return feat;
    };
    
    this.setFeatureSources = function(sources) {
      if( !this.featuring && sources ) {
          var unique = [ ];
          // hello O(n)
          sources.forEach( f => {
            var name = f.artist.name;
            if( unique.indexOf(name) === NOT_FOUND ) {
              unique.push(name);
            }
          });
          this.featuring = unique.join(', ');
        }  
    };

    // License stuff 
    
    this.getIsCCPlus = function() {
      return this._hasTag('ccplus');
    };

    this.getIsOpen = function() {
      return this._hasTag('attribution,cczero,share_alike');
    };
    
    this.getIsSpecialLic = function() {
      return this._tagMatches(/^share_alike$/); 
    };

    this.getLicenseLogoURL = function() {
      return LicenseUtils.logoURLFromName( this.license_name );
    };
    
    this.getLicenseYear = function() {
      return this.year || (this.upload_date || this.upload_date_format).match(/(19|20)[0-9]{2}/)[0];
    };
    
    this.getPurchaseLicenseURL = function() {
      if( this.getIsCCPlus() ) {
        var baseURL = 'http://tunetrack.net/license/';
        return baseURL + this.file_page_url.replace('http://', '');
      }
    };

    this.getPurchaseLogoURL = function() {
      if( this.getIsCCPlus() ) {
        return LicenseUtils.logoURLFromAbbr( 'ccplus' );
      }
    };
    
  }

  _tagMatches(filter) {
    if( !this._tags ) {
      this._tags = this.getTags();
    }
    return this._tags.filter(filter).getLength() > 0;
  }

  _hasTag(tag) {
    if( !this._tags ) {
      this._tags = this.getTags();
    }
    return this._tags.contains(tag);
  }

}

class Tag extends Model {
  constructor() {  
    super(...arguments);
    this.getName = 
    this.getId = function() {
      return this.tags_tag + '';
    };
    this.countBinding = 'tags_count';
  }
}

class Topic extends Model {
  constructor() {
    super(...arguments);
    this.publishedBinding = 'topic_date';
    this.idBinding = 'topic_id';
    this.nameBinding = 'topic_name';
    this.rawBinding = 'topic_text';
    this.htmlBinding = 'topic_text_html';
    this.textBinding = 'topic_text_plain';
  }
}

module.exports = {
  Remix,
  Trackback,
  Detail,
  Upload,
  UploadBasic,
  User,
  Tag,
  UserBasic,
  Source,
  Topic,
  ACappella, 
};
