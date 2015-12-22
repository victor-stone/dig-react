import React      from 'react';
import Glyph      from '../Glyph';
import EditDiv    from '../EditDiv';

import { PlaylistOwner } from '../../mixins';

var EditableTitle = React.createClass({

  mixins: [ PlaylistOwner ],

  getInitialState: function() {
    var name = this.props.store.model.head.name;
    return { name: name };
  },

  onDone: function(/*name*/) {

  },

  onChange: function(text) {
    this.setState( { name: text } );
  },

  render: function() {

    return (
        <div className="page-header"> 
          <h1 className="center-text">
            <Glyph icon="music" /> 
            {" "}
            <EditDiv id="edit-name" 
                 onDone={this.onDone}
                 onChange={this.onChange}
                 onCancel={this.onChange}
                 enabled={this.state.isOwner}
                 text={this.state.name} 
            />
          </h1>
        </div>
      );
  }
});

module.exports = EditableTitle;

//