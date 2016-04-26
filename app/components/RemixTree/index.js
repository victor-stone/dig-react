import React       from 'react';
import Glyph       from '../Glyph';
import Link        from '../Link';
import InlineCSS   from '../InlineCSS';
import { Accordian,
         AccordianPanel 
               }   from '../Accordian';
import Files       from '../stems/Files';

import { ModelTracker }    from '../../mixins';
import { PlayButton }      from '../AudioPlayer';
import { SamplesFrom, 
         SamplesUsedIn }   from './TreeLinks';

import Recommends  from './Recommends';
import Reviews     from './Reviews';
import Overview    from './Overview';
import Description from './Description';
import css         from './style/tree';

import lookup  from '../../services';

const NOT_FOUND = -1;

function FileSection(props) {
  var title = `Files (${props.model.files.length})`;
  return ( <AccordianPanel title={title} id="files" icon="files-o" className="stems-browser">
             <Files model={props.model} />
            </AccordianPanel>
        );
}

var TreeHead = React.createClass({
  mixins: [ModelTracker],

  stateFromStore(store) {
    return { 
        store,
        model: store.model.upload };
  },

  render() {
    var model = this.state.model;

    return(
        <div className="tree-head">
          {model.edPick
            ? <span className="ribbon orange edpick">{"\ned\npick\n"}</span>
            : null
          }
          <img className="img-circle" src={model.artist.avatarURL} /> 
          <h3>{model.name}</h3>
          <h4 className="clearfix"><Link className="artist" href={'/people/'+model.artist.id}>{model.artist.name}</Link></h4>
          <Description store={this.state.store} />
          <div className="clearfix" />
          <PlayButton model={model} className="tree-play-button"/>
        </div>
    );
  }
});

var NextPeruse = React.createClass({

  getInitialState() {
    return this.getNextTrack(this.props);
  },

  componentWillReceiveProps(props) {
    this.setState( this.getNextTrack(props) );
  },

  getNextTrack(props) {
    var nullState = { model: null };
    var peruseModel = lookup('env').perusingModel;
    if( !peruseModel ) {
      return nullState;
    }
    var index = peruseModel.indexOfElement('id',props.store.model.upload.id);
    if( index === NOT_FOUND || index === peruseModel.length - 1 ) {
      return nullState;
    }
    return { model: peruseModel[index+1] };
  },

  render() {
    var m = this.state.model;
    if( !m ) {
      return null;
    }
    var url = '/files/' + m.artist.id + '/' + m.id;
    return (
      <div className="tree-perusal tree-next">
        <Link href={url}>
          {m.name}
          <Glyph icon="chevron-right" x4 />
        </Link>
      </div>
    );
  }
});

var PrevPeruse = React.createClass({

  getInitialState() {
    return this.getPrevTrack(this.props);
  },

  componentWillReceiveProps(props) {
    this.setState( this.getPrevTrack(props) );
  },

  getPrevTrack(props) {
    var nullState = { model: null };
    var peruseModel = lookup('env').perusingModel;
    if( !peruseModel ) {
      return nullState;
    }
    var index = peruseModel.indexOfElement('id',props.store.model.upload.id);
    if( index === NOT_FOUND || !index ) {
      return nullState;
    }
    return { model: peruseModel[index-1] };
  },

  render() {
    var m = this.state.model;
    if( !m ) {
      return null;
    }
    var url = '/files/' + m.artist.id + '/' + m.id;
    return (
      <div className="tree-perusal tree-prev">
        <Link href={url}>
          {m.name}
          <Glyph icon="chevron-left" x4 />
        </Link>
      </div>
    );
  }
});

var Tree = React.createClass({

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
        <InlineCSS css={css} id="tree"/>
        <div className="row">  
          <div className="col-md-2">
            <PrevPeruse store={store}/>
          </div>
          <div className="col-md-6 col-md-offset-1">
            <TreeHead store={store} />
          </div>
          <div className="col-md-2 col-md-offset-1">
            <NextPeruse store={store}/>
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

module.exports = Tree;

//