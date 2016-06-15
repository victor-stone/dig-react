import React            from 'react';
import T       from '../../components/TagEditor';
import InlineCSS from '../../components/InlineCSS';
import { TagString } from '../../unicorns';
import Eventer from '../../services/eventer';
import events from '../../models/events';

var FIVE = 5;
//var FIFTY = 50;

var wbCss = `

.col-md-2,.col-md-3,.col-md-4 {
  background-color: pink;
  border: 1px solid red;
}

`;

/* eslint no-magic-numbers:"off"*/

class Store extends Eventer {
  constructor() {
    super(...arguments);
    this.model2 = [];
    for( var i = 0; i < FIVE; i++ ) {
      this.model2.push( { id: 'my_tag_' + i } );
    }
    this.model3 = new TagString( this.model2.map(t => t.id));
    this.selected = new TagString();
  }

  toggleSelected(tag,toggle) {
    this.selected.toggle(tag,toggle);
    this.emit(events.MODEL_UPDATED);
  }

  removeSelected(tag) {
    this.selected.remove(tag);
    this.emit(events.MODEL_UPDATED);
  }
}


var store = new Store();

var UsesCheckableTagList = React.createClass({

  getInitialState() {
    return { model: this.props.model,
             selected: store.selected };
  },

  componentDidMount() {
    store.on(events.MODEL_UPDATED, this.onModelUpdated );
  },

  onModelUpdated() {
    this.setState( {selected: new TagString(store.selected)} );
  },

  onSelected(tag,toggle) {
    store.toggleSelected(tag,toggle);
  },

  render() {
    return(
        <T.CheckableTagsList model={this.props.model} selected={this.state.selected} onSelected={this.onSelected} />
      );
  }
});

var UsesSelectedTagList = React.createClass({

  getInitialState() {
    return { model: store.selected };
  },

  componentDidMount() {
    store.on(events.MODEL_UPDATED, this.onModelUpdated );
  },

  onModelUpdated() {
    this.setState( {model: new TagString(store.selected)} );
  },

  onRemove(tag) {
    store.removeSelected(tag);
  },

  render() {
    return ( <T.SelectedTagList model={this.state.model} onRemove={this.onRemove} />);
  }
});

var workbench = React.createClass({

  render() {
    return ( 
      <div className="container-fluid">
        <InlineCSS css={wbCss} id="wbCss" /> 
        <div className="row">
          <div className="col-md-2  col-md-offset-1" >
            <h4> {"StaticTagsList"}</h4>
            <div><b>{"(start-float)"}</b></div>
            <T.StaticTagsList model={store.model3} />
            <div><b>{"(end-float)"}</b></div>
          </div>
          <div className="col-md-2" >
            <h4> {"CheckableTagsList"}</h4>
            <UsesCheckableTagList model={store.model2} />
          </div>
          <div className="col-md-4" >
            <h4> {"SelectedTagList"}</h4>
            <p>{"select from CheckableTagsList"}</p>
            <UsesSelectedTagList />
          </div>
        </div>
      </div>
      );
  }  
});

workbench.title = 'Victor\'s workbench';


module.exports = workbench;

