import React       from 'react';

import Link        from '../Link';
import InlineCSS   from '../InlineCSS';
import { Accordian,
         AccordianPanel 
               }   from '../Accordian';
import Files   from '../stems/Files';

import { ModelTracker }  from '../../mixins';

import { SamplesFrom, SamplesUsedIn } from './TreeLinks';
import Recommends  from './Recommends';
import Reviews     from './Reviews';
import Overview    from './Overview';
import Description from './Description';

var css = `
  <style>
    .remix-tree-head img {
      float: left;
    }
    .remix-tree-head {
      margin: 22px;
      padding: 12px;
      background-color: #C5EF1D;
      border-radius: 15px;
      box-shadow: 2px 2px #2E802F;
    }
    .remix-tree-head .edpick {
      float: right;
    }
    #accordion .form-control {
      height: initial;
    }
    #accordion .tags-list.form-control li {
      float: left;
      margin-left: 8px;
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
  </style>
      `;

function FileSection(props) {
  var title = `Files (${props.model.files.length})`;
  return ( <AccordianPanel title={title} id="files" icon="files-o">
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
            ? <div className="ribbon edpick"><div className="ribbon-stitches-top"></div><strong className="ribbon-content"><h1>{"editorial pick"}</h1></strong><div className="ribbon-stitches-bottom"></div></div>
            : null
          }
          <img className="img-circle" src={model.artist.avatarURL} /> 
          <h3>{model.name}</h3>
          <h4 className="clearfix"><Link className="artist" href={'/people/'+model.artist.id}>{model.artist.name}</Link></h4>
          <Description store={this.state.store} />
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