import React     from 'react';
import Glyph     from './Glyph';
import Link      from './Link';

import { oassign }     from '../unicorns';
import PlaylistUpdater from '../mixins/playlist-updater';
import env             from '../services/env';

var LicenseInfoPopup = React.createClass({

  // unfortunately popup is broken from this <ul>
  // not sure why, can't care
  // TODO: care

  render: function() {
    return(
        <Link href="/licenses"><Glyph icon="question-circle" /></Link>
      );
  }
});

const ResetOptionsButton = React.createClass({

  mixins: [PlaylistUpdater],

  stateFromStore: function(store) {
    return { dirty: store.paramsDirty() };
  },

  onReset: function() {
    if( this.state.dirty ) {
      this.props.store.applyOriginalParams();
    }
  },

  render: function() {
    var resetCls = 'btn btn-warning btn-sm' + (this.state.dirty ? '' : ' disabled');

    return <button onClick={this.onReset} className={resetCls}><Glyph icon="power-off" />{" reset"}</button>;
  }

});

const QueryOptions = React.createClass({

  mixins: [PlaylistUpdater],

  handleShowOptions: function(){
    var showOptions = !this.state.showOptions;
    this.setState( { showOptions } );
  },

  genOptions: function() {
    var props = oassign( { handleShowOptions: this.handleShowOptions }, this.props);
    return React.createElement( env.AppQueryOptions, props );
  },

  stateFromStore: function(store) {
    var dirty = this.storeSupportsOptions() && store.paramsDirty();
    return { dirty };
  },

  render: function() {

    if( !this.storeSupportsOptions() ) {
      return null;
    }
    
    var showP       = this.state.showOptions;
    var popup       = showP ? this.genOptions() : null;
    var cls         = 'hidden-xs hidden-sm filter-box' + (showP ? ' open' : '' );
    var buttonColor = this.state.dirty ? { color: 'yellow' } : {};

    return (
      <div className={cls}>
        {showP 
          ? popup 
          : <button className="btn btn-primary" style={buttonColor} onClick={this.handleShowOptions} ><Glyph icon="gear" />{" filters"}</button>
        }
      </div>
    );
  }

});

QueryOptions.ResetOptionsButton = ResetOptionsButton;
QueryOptions.LicenseInfoPopup   = LicenseInfoPopup;

module.exports = QueryOptions;