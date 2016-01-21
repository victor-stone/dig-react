import React       from 'react';
import PanelSlider from './PanelSlider';
import {
          ModelTracker
                }  from '../mixins';

import Glyph       from './Glyph';
import Upload      from '../stores/upload';

var SamplesFrom = React.createClass({

  mixins: [ModelTracker],

  stateFromStore(store) {
    return { sources: store.model.sources };
  },

  onClick(model) {
    return () => this.props.transition(model);
  },

  render() {
    return(
        <div>
          <b>{"Samples are used from..."}</b>
            <ul>
              {this.state.sources.map( s => 
                <li key={s.id}><button onClick={this.onClick(s)}>{s.name} {s.artist.name}</button></li>
              )}
            </ul>
        </div>
    );
  }
});

var SamplesUsedIn = React.createClass({

  mixins: [ModelTracker],

  stateFromStore(store) {
    return { remixes: store.model.remixes };
  },

  onClick(model) {
    return () => this.props.transition(model);
  },

  render() {
    return(
        <div>
            <b>{"Samples are used in..."}</b>
            <ul>
              {this.state.remixes.map( s => 
                <li key={s.id}><button onClick={this.onClick(s)}>{s.name} {s.artist.name}</button></li>
              )}
            </ul>
        </div>
    );
  }

});

var MainFile = React.createClass({
  mixins: [ModelTracker],

  stateFromStore(store) {
    return { model: store.model.upload };
  },

  render() {
    var model = this.state.model;
    return(
        <div>
          <h5>{model.artist.name}</h5>
          <button className="btn btn-sm btn-warning">
            <Glyph icon="play" />{" PlayIT"}
          </button>
        </div>
    );
  }
});


var RemixTree = React.createClass({

  onTransition(model) {
    return this.props.store.find( model.id, model.artist.id, Upload.ALL );
  },

  render() {
    var store = this.props.store;
    return( 
      <PanelSlider transition={this.onTransition}>
        <SamplesFrom store={store} />
        <MainFile store={store} />
        <SamplesUsedIn store={store} />
      </PanelSlider>
    );
  }
});

module.exports = RemixTree;

//