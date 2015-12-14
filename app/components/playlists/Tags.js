import React  from 'react';
import Glyph  from '../Glyph';
import Link   from '../Link';

var Tags = React.createClass({

  render: function() {
    var tags = this.props.model.toArray();
    if( !tags.length ) {
      return null;
    }
    return (
        <div className="playlist-tags">
          <Glyph icon="tags" />
          {tags.map( t => {
              return(<Link key={t} className="playlist-tag" href={'/tags/' + t}>{t}</Link>);
          })}
        </div>
      );
  }
});

module.exports = Tags;

//