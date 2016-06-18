import React         from 'react';
import T             from '../../components/TagEditor';
import InlineCSS     from '../../components/InlineCSS';

import Upload from '../../stores/upload';
import Remixes from '../../stores/remixes';
import Playlist from '../../stores/playlist';

var wbCss = `

.workbench .col-md-2 > div,
.workbench .col-md-3 > div,
.workbench .col-md-4 > div {
  background-color: whitesmoke;
  border: 1px solid black;
  margin: 2px;
  padding: 2px;
}

`;

/* eslint no-magic-numbers:"off"*/

var upload = null;
var remixes  = null;
var playlist = null;
var dynplaylist = null; // 36954

/*
    QueryBasic
      | -  Query
      |     |-- QueryWithTags
      |     |      | -- Acappella
      |     |      | -- Remixes
      |     |      |    |-- User
      |     |      | -- Samples
      |     |      |-- Playlists
      |     | -- PlaylistTracks
      |     |-- Ratings
      |     |-- Tags
      |     |-- Topics
      |     |-- UserFeed
      | =  Playist
      | =  Upload

*/

var workbench = React.createClass({

  getInitialState() {
    return { };
  },

  componentDidMount() {
    Upload.storeFromQuery(52185).then( store => {
      upload = store; 
      this.fooler({loadedState: true});
    });
    Remixes.storeFromQuery({tags:'ambient'}).then( store => {
      remixes = store;
      this.fooler({loadedDyn: true});
      });
    Playlist.storeFromQuery(5973).then( store => {
      playlist = store;
      this.fooler({loadedPl: true});
    });
    Playlist.storeFromQuery(36954).then( store => {
      dynplaylist = store;
      this.fooler({loadedDynPl: true});
    });
  },

  fooler(obj) {
    this.setState(obj);
  },
  

  render() {
    var ok = this.state.loadedDyn && 
             this.state.loadedState && 
             this.state.loadedDynPl &&
             this.state.loadedPl;

    if( !ok ) {
      return (<h1>{"waiting"}</h1>);
    }
    var cats = T.BoundCategoryTagBox.categories;
    return ( 
      <div className="container-fluid workbench">
        <InlineCSS css={wbCss} id="wbCss" /> 
        <div className="row">
          <div className="col-md-6  col-md-offset-1" >
            <form className="form-horizontal">
                <div className="form-group">
                  <T.EditableTagsField store={upload} />
                </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2  col-md-offset-1" >
            <div>
              <h4> {"playlist (static)"}</h4>
              <div><b>{playlist.model.head.name}</b></div>
              <T.BoundStaticTagList store={playlist} />
              <div><b>{"(end-float)"}</b></div>
            </div>
          </div>
          <div className="col-md-2" >
            <div>
              <h4>{"genre - playlist"}</h4>
              <T.BoundCategoryTagBox category={cats.GENRE} store={playlist} />
            </div>
          </div>
          <div className="col-md-2" >
            <div>
              <h4> {"playlist (dyn)"}</h4>
              <div><b>{dynplaylist.model.head.name}</b></div>
              <T.BoundStaticTagList store={dynplaylist} />
            </div>
          </div>
          <div className="col-md-2" >
            <div>
              <h4>{"genre - dynplaylist"}</h4>
              <T.BoundCategoryTagBox category={cats.GENRE} store={dynplaylist} />
            </div>
          </div>
          <div className="col-md-3" >
            <div>
              <h4>{"admin - dynplaylist"}</h4>
              <T.BoundCategoryTagBox category={cats.types.SYSTEM} store={dynplaylist} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2  col-md-offset-1" >
            <div>
              <h4> {"static upload"}</h4>
              <div><b>{"(start-float)"}</b></div>
              <T.BoundStaticTagList store={upload} />
              <div><b>{"(end-float)"}</b></div>
            </div>
          </div>
          <div className="col-md-3" >
            <div>
            <h4>{"instrument - upload"}</h4>
            <T.BoundCategoryTagBox category={cats.INSTRUMENT} store={upload} />
            </div>
          </div>
        </div> 
        <div className="row">
          <div className="col-md-3  col-md-offset-1" >
            <div>
              <h4>{"genre - remixes"}</h4>
              <T.BoundCategoryTagBox category={cats.GENRE} store={remixes} />
            </div>
          </div>
          <div className="col-md-3" >
            <div>
            <h4>{"mood - remixes"}</h4>
            <p>{"instrument"}</p>
            <T.BoundCategoryTagBox category={cats.MOOD} store={remixes} />
            </div>
          </div>
          <div className="col-md-2" >
            <div>
              <h4> {"static remixes"}</h4>
              <p>{"select from BoundCategoryTagBox"}</p>
              <T.BoundStaticTagList store={remixes} />
            </div>
            <div>
              <h4> {"selected - remixes (query)"}</h4>
              <T.BoundSelectedTagList store={remixes} />
            </div>
          </div>
        </div>
      </div>
      );
  }  
});

workbench.title = 'Victor\'s workbench';


module.exports = workbench;

