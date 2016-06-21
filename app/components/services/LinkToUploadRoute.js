import React from 'react';
import Link  from './LinkToRoute';


var UploadLink = React.createClass({

  render: function() {

    var model = this.props.model;
    var base  = this.props.base || '/files/';
    var href  = base + model.artist.id + '/' + model.id;
    return (
        <Link href={href} {...this.props}>{model.name}</Link>
      );
  }
});

module.exports = UploadLink;

