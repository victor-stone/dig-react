import React       from 'react';

import Link        from '../Link';
import InlineCSS   from '../InlineCSS';
import { Accordian,
         AccordianPanel 
               }   from '../Accordian';
import Files       from '../stems/Files';

import { ModelTracker }  from '../../mixins';

import { PlayButton }                 from '../AudioPlayer';
import { SamplesFrom, SamplesUsedIn } from './TreeLinks';
import Recommends  from './Recommends';
import Reviews     from './Reviews';
import Overview    from './Overview';
import Description from './Description';

var css = `
  <style>

    .remix-tree-head {
      margin: 22px;
      padding: 12px;
      border-radius: 15px;
      box-shadow: 2px 2px #2E802F;

      background-image: -webkit-linear-gradient(top, #276C28 0%, #3FB040 100%);
      background-image: -o-linear-gradient(top, #276C28 0%, #3FB040 100%);
      background-image: -webkit-gradient(linear, left top, left bottom, from(#276C28), to(#3FB040));
      background-image: linear-gradient(to bottom, #276C28 0%, #3FB040 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff3FB040', endColorstr='#ff3FB040', GradientType=0);
      filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
      background-repeat: repeat-x;
    }

    .remix-tree-head .img-circle {
        float: left;
        box-shadow: 4px 4px 8px green;  
    }

    .remix-tree-head h3 {
      color: white;
    }

    .remix-tree-description {
      color: yellow;
    }

    .remix-tree-head a.artist {
      color: #DDD;
    }

    #description-more-link {
      color: white;
      text-decoration: none;
    }

    #description-more-link:hover {
      text-decoration: none;
    }
    #description-more-link:hover::after {
      content: ' ↕';
      font-weight: bold;
    }
    
    .remix-tree-head .cc_format_link {
      color: white;
    }

    #description-less {
      font-size: 12px;
      font-style: italic;
    }
    span.ribbon.edpick {
      float: right;
      font-size: 12px;
      position: absolute;
      right: 50px;
      top: 22px;
    }    
    #accordion .form-control {
      height: initial;
    }
    #accordion .tags-list.form-control li {
      float: left;
      margin-left: 8px;
    }
    .edpick-author {
      text-align: right;
      font-style: italic;
    } 
   .panel-offset-1 {
      margin-left: 12px;
    }
    .panel-offset-2 {
      margin-left: 32px;
    }
    .tree-link-head {
      margin-bottom: 0px;
    }
    .tree-link-tail {
      margin-top: 0px;
    }
    .tree-link-more {
      margin-top: 12px;
    }
    .tree-link-name {
      font-style: italic;
    }
    .tree-link-artist {
      color: black;
    }
    #reviews span.quote {
      display: block;
      font-style: italic;
      margin-left: 20px;
    }    
  </style>
      `;

function FileSection(props) {
  var title = `Files (${props.model.files.length})`;
  return ( <AccordianPanel title={title} id="files" icon="files-o" className="stems-browser">
             <Files model={props.model} />
            </AccordianPanel>
        );
}

var RemixTreeHead = React.createClass({
  mixins: [ModelTracker],

  stateFromStore(store) {
    return { 
        store,
        model: store.model.upload };
  },

  render() {
    var model = this.state.model;

    return(
        <div className="remix-tree-head">
          {model.edPick
            ? <span className="ribbon orange edpick">{"\ned\npick\n"}</span>
            : null
          }
          <img className="img-circle" src={model.artist.avatarURL} /> 
          <h3>{model.name}</h3>
          <h4 className="clearfix"><Link className="artist" href={'/people/'+model.artist.id}>{model.artist.name}</Link></h4>
          <Description store={this.state.store} />
          <div className="clearfix" />
        </div>
    );
  }
});

var RemixTree = React.createClass({

  mixins: [ModelTracker],

  stateFromStore(store) {
    return { 
        store,
        upload: store.model.upload };
  },

  render() {
    var store = this.state.store;
    var upload = store.model.upload;

  return( 
      <div className="container-fluid">
        <InlineCSS css={css} />
        <div className="row">  
          <div className="col-md-6 col-md-offset-3">
            <RemixTreeHead store={store} />
            <PlayButton model={upload} className="remix-tree-play-button"/>
          </div>
        </div>
        <div className="row">  
          <div className="col-md-4 col-md-offset-2">
            <SamplesFrom store={store} />
          </div>
          <div className="col-md-4">
            <SamplesUsedIn store={store} />
          </div>
        </div>
        <div className="row">  
          <div className="col-md-6 col-md-offset-3">
            <Accordian>
              <Overview model={upload} />
              <FileSection model={upload} />
              <Recommends model={upload} numRecommends={upload.numRecommends} />
              <Reviews model={upload} numReviews={upload.numReviews} />
            </Accordian>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = RemixTree;

//