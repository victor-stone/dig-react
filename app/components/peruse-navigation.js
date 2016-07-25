import React       from 'react';
import Glyph       from './vanilla/glyph';
import Link        from './services/link-to-route';
import lookup      from '../services';

import LinkToUpload       from './services/link-to-upload-route';

const NOT_FOUND = -1;

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
    var url = LinkToUpload.url(m);
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
    var url = LinkToUpload.url(m);
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


module.exports = {
  PrevPeruse,
  NextPeruse
};


//