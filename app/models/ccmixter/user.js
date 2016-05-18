import Model          from '../model';
import { TagString }  from '../../unicorns';


class UploadUserBasic extends Model {
  constructor() {
    super(...arguments);
    this.nameBinding = '_bindParent.user_real_name';

    this.getId = function() {
      if( this._bindParent.user_name )
        return this._bindParent.user_name;
      if( this._bindParent.artist_page_url ) {
        return this._bindParent.artist_page_url.match(/\/([^\s\/]+)$/)[1];
      }
    };

  }
}

class UserBasic extends Model {

    constructor() {
     super(...arguments);
     // this.nameBinding = 'user_real_name';
     this.getName = function() {
      return this.user_real_name || this.fancy_user_name;
     };
     // this.idBinding = 'user_name';
     this.getId = function() {
      if( this.user_name ) {
        return this.user_name;
      }
      if( this.rater_page_url ) {
        var match = this.rater_page_url.match( /\/people\/([^\/]+)\/recommends/ );
        if( match ) {
          return match[1];
        }
      }
      return null;
     };
    }
}

class User extends UserBasic {

  constructor() {
    super(...arguments);
    this.avatarURLBinding = 'user_avatar_url';
    this.isAdminBinding = 'is_admin';
    this.isSuperUser = 'is_super';
    
    this.getUrl = function() {
      if( this.artist_page_url ) {
        return this.artist_page_url;
      } else {
        return '/people/' + this.user_name;
      }
    };
    
    this.getHomepage = function() {
      if( this.user_homepage === this.getUrl() ) {
        return null;
      }
      return this.user_homepage;
    };

    this.getFollowsIDs = function() {
      return new TagString(this.user_favorites);
    };
  }

}

class UserProfile extends User {
  constructor() {
    super(...arguments);
    this.joinedBinding = 'user_date_format';
    this.descriptionHTMLBinding = 'user_description_html';
    this.key = 'user_id';
    this.numUploads = 'user_num_uploads';
    this.getTools = function() {
      return new TagString(this.user_whatido);
    };
    this.getFollows = function() {
      var favs = this._getTagLinks().findBy( 'label', 'str_favorites');
      if( favs ) {
        return favs.value.map( f => {
          return {
            name: f.tag.replace(/(&[a-z]+;|\.)/g,' '),
            url: f.tagurl.replace(/http:\/\/ccmixter.org/,'')
          };            
        });
      }
      return [];
    };
  }

  _getTagLinks() {
    if( !this._fectchedTagLinks ) {
      this._tagLinks = this.user_tag_links && Object.keys(this.user_tag_links).map( k => this.user_tag_links[k] );
      this._fectchedTagLinks = true;
    }
    return this._tagLinks || [];
  }

  /*
    "user_num_posts" : "1816",
    "user_num_remixed" : "156",
    "user_num_remixes" : "141",
    "user_num_reviewed" : "961",
    "user_num_reviews" : "1478",
    "user_whatilike" : "soul,bop,post_bop,ambient,Elvis_Costello,Roy_Budd,DJ_Krush,ColdCut"
    "user_favorites" : "clayne,djperegrine,beatgorilla,lisadb,minuskelvin,teru,djlang59,ashwan,cdk,deutscheunschuld,mlinksva,shockshadow,Pitx,kcentric,ditto,omnivista,grapes,waldhorn33,Loveshadow",
  */
}

class DetailUploadUser extends UploadUserBasic {
  constructor() {
    super(...arguments);
    this.avatarURLBinding = '_bindParent.user_avatar_url';
  }
}


module.exports = {
  DetailUploadUser,
  UploadUserBasic,
  User,
  UserBasic,
  UserProfile,
};
