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
import PlaylistModels from './playlist';
import UserModels     from './user';
import TopicModels    from './topic';
import FeedModels     from './feed';
import UploadModels   from './upload';
import TagModels      from './tags';

var Models = {};
[ PlaylistModels, UserModels, TopicModels, FeedModels, UploadModels, TagModels ].forEach( m => Object.keys(m).forEach( k => Models[k] = m[k]) );

module.exports = Models;

