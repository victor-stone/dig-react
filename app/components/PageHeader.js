import React from 'react';
import Glyph from './Glyph';

const PageHeader = React.createClass({

  render: function() {
    var icon      = this.props.icon;
    var subTitle  = this.props.subTitle;
    var title     = this.props.title;

    if( subTitle ) {
      return (
          <div className="page-header"> 
            <h1 className="center-text">
                <small><Glyph icon={icon} /> {subTitle}</small> {title}
            </h1>
          </div>
        );
    } else {
      return (
          <div className="page-header"> 
            <h1 className="center-text">
                <Glyph icon={icon} /> {title}
            </h1>
          </div>
        );
    }
  },
});

module.exports = PageHeader;
