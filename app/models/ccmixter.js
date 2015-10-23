'use strict';

/**
  Module exists to normalize the wild & crazy results from the query API.
  
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
  
  for UploadDetail there is additionally remixes, sources and trackbacks (added 
  in the store)
  
    upload.remixes[0].name
    upload.remixes[0].artist.name
    
    upload.trackbacks[0].name
  
  The audio player will add a .media object that needs to have a .name, .artist.name and 
  .artist.id for the player to display. These are added below in a callback from 
  the player.
  
*/

import Model from './model';
import LicenseUtils from './licenses';
import TagString from '../unicorns/tagString';

var File = Model.extend({

  urlBinding:      'download_url',
  idBinding:       'file_id',
  sizeBinding:     'file_filesize',
  typeBinding:     'file_extra.type',
  uploadBinding:   '_bindParent',

  getExtension: function() {
    return this.local_path.replace(/.*\.([a-z0-9]+)$/,'$1');
  },

  getNicName: function() {
    if( this.file_nicname !== this.getExtension() ) {
      return this.file_nicname;
    }
    return this.file_extra.type;
  },

  getTags: function() {
    if( 'ccud' in this.file_extra ) {
      return TagString.create( this.file_extra.ccud );
    }
    return '';
  },

  _hasTag: function(tag) {
    var tags = this.getTags();
    if( tags ) {
      return tags.contains(tag);
    }
    return false;
  },

  getIsMP3: function() {
    var ffi = this.file_format_info;
    if( (ffi) && ('format-name' in ffi) ) {
      return ffi['format-name'] === 'audio-mp3-mp3';
    }
    return false;
  },

  getWavImageURL: function() {
    var baseURL = 'http://ccmixter.org/waveimage/'; // um, hello ENV?
    return baseURL + this.file_upload + '/' + this.file_id;
  },

  /* required by audio player */
  mediaURLBinding: 'download_url',
  
  getMediaTags: function() {

    var id          = this._bindParent.upload_id;
    var name        = this._bindParent.upload_name;

    var fileID      = this.file_id;
    var wavImageURL = this.getWavImageURL();
    var artist      = {
                   name: this._bindParent.user_name,
                   id: this._bindParent.user_id
                 };

    return { name, id, fileID, artist, wavImageURL };

  },

});

var UploadUserBasic = Model.extend( {
  nameBinding: '_bindParent.user_real_name',
});

var UploadBasic = Model.extend( {

  nameBinding: 'upload_name',
  urlBinding:  'file_page_url',
  idBinding:   'upload_id',
  
  _modelSubtree: {
    artist: UploadUserBasic,
  },

});

var Remix  = UploadBasic.extend({

  getId: function() {
    if( this.upload_id )
      return this.upload_id;
    if( this.file_page_url ) {
      return this.file_page_url.match(/\/([\d]+)$/)[1];
    }
  }
});

var Source = UploadBasic.extend();

var TrackbackUser = Model.extend({
  nameBinding: '_bindParent.pool_item_artist',
});

var Trackback = Model.extend( {

  _modelSubtree: {
    artist: TrackbackUser,
  },

  getName: function() {
    var name = this.pool_item_name + '';
    if( name.match(/^watch\?/) !== null ) {
      name = 'You Tube Video';
    }
    return name;
  },
  
  idBinding:    'pool_item_id',
  urlBinding:   'pool_item_url',
  embedBinding: 'pool_item_extra.embed',
  typeBinding:  'pool_item_extra.ttype',
  
});

var UploadUser = UploadUserBasic.extend({
  idBinding: '_bindParent.user_name',
});

var Upload = UploadBasic.extend({

  _modelSubtree: {
    files: File,
    artist: UploadUser,
  },

  idBinding: 'upload_id',
  
  getBpm: function() {
    if( this.upload_extra ) {
      var bpm = this.upload_extra.bpm;
      if(  (bpm + '').match(/[^0-9]/) === null ) {
        return bpm;
      }
    }
  },

  _findFileInfo: function(target,cb) {
    for( var i = 0; i < target.files.length; i++ ) {
      if( cb(target.files[i]) ) {
        return target.files[i];
      }
    }
  },

  getFileInfo: function(target) {
    return this._findFileInfo( target, f => f.isMP3 );
  },

  getWavImageURL: function(target) {
    var f = this.getFileInfo(target);
    return f ? f.wavImageURL : '';
  },

  getDownloadSize: function(target) {
    var f = this.getFileInfo(target);
    return f ? f.size.replace(/\(|\)|\s+/g, '') : '';
  },

  /* required by audio player */
  getMediaURL: function(target) {
    var f = this.getFileInfo(target);
    return (f && f.mediaURL) || this.fplay_url || this.download_url;
  },
  
  getMediaTags: function(target) {
    var f = this.getFileInfo(target);
    return f && f.mediaTags;
  },
    
});

var ACappellaFile = File.extend({
  getIsPlayablePell: function() {
    return this.getIsMP3() && this._hasTag('acappella');
  },

});

var ACappella = Upload.extend( {

  _modelSubtree: {
    files: ACappellaFile,
    artist: UploadUser,
  },

  getFileInfo: function(target) {
    return this._findFileInfo( target, f => f.isPlayablePell ) ||
      this._findFileInfo( target, f => f.isMP3 );
  },

});

var UserBasic = Model.extend( {
  nameBinding: 'user_real_name',
  idBinding:   'user_name',
});

var User = UserBasic.extend( {
  avatarURLBinding: 'user_avatar_url',

  getUrl: function() {
    return this.artist_page_url + '/profile';
  },
  
  getHomepage: function() {
    if( this.user_homepage === this.artist_page_url ) {
      return null;
    }
    return this.user_homepage;
  },

});

var DetailUser = UploadUser.extend( {
  avatarURLBinding: '_bindParent.user_avatar_url',
});

var Detail = Upload.extend( {

  _modelSubtree: {
    files: File,
    artist: DetailUser,
  },

  getTags: function() {
    return new TagString(this.upload_tags);
  },
  
  getUserTags: function() {
    return new TagString( this.upload_extra.usertags );
  },
  
  _hasTag: function(tag) {
    return this.getTags().contains(tag);
  },

  featuringBinding: 'upload_extra.featuring',

  getFeaturing: function() {
    var feat = this.upload_extra.featuring;
    return feat;
  },
  
  setFeatureSources: function(sources) {
    if( !this.featuring && sources ) {
        var unique = [ ];
        // hello O(n)
        sources.forEach( f => {
          var name = f.user_name;
          if( unique.indexOf(name) === -1 ) {
            unique.push(name);
          }
        });
        this.featuring = unique.join(', ');
      }  
  },

  // License stuff 
  
  licenseNameBinding: 'license_name',
  licenseURLBinding: 'license_url',
  
  getIsCCPlus: function() {
    return this._hasTag('ccplus');
  },

  getIsOpen: function() {
    return this._hasTag('attribution,cczero');
  },
  
  getLicenseLogoURL: function() {
    return LicenseUtils.logoURLFromName( this.license_name );
  },
  
  getLicenseYear: function() {
    return this.year || (this.upload_date || this.upload_date_format).match(/(19|20)[0-9]{2}/)[0];
  },
  
  getPurchaseLicenseURL: function() {
    if( this.getIsCCPlus() ) {
      var baseURL = 'http://tunetrack.net/license/';
      return baseURL + this.file_page_url.replace('http://', '');
    }
  },

  getPurchaseLogoURL: function() {
    if( this.getIsCCPlus() ) {
      return LicenseUtils.logoURLFromAbbr( 'ccplus' );
    }
  },
  
});

var Tag = Model.extend( {
  idBinding:    'tags_tag',
  nameBinding:  'tags_tag',
  countBinding: 'tags_count'
});

var Topic = Model.extend({
  publishedBinding: 'topic_date',
  idBinding:        'topic_id',
  nameBinding:      'topic_name',
  rawBinding:       'topic_text',
  htmlBinding:      'topic_text_html',
  textBinding:      'topic_text_plain',
});

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
