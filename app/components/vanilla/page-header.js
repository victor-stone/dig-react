import React from 'react';
import Glyph from './glyph';

const PageHeader = React.createClass({

  render: function() {
    var icon      = this.props.icon;
    var subTitle  = this.props.subTitle;
    var title     = this.props.title;

    if( subTitle ) {
      return (
          <div className="page-header"> 
            <h1 className="center-text">
                <small><Glyph icon={icon} /> {subTitle}</small> <span>{title}</span>
            </h1>
          </div>
        );
    } else {
      return (
          <div className="page-header"> 
            <h1 className="center-text">
                <Glyph icon={icon} /> <span>{title}</span>
            </h1>
          </div>
        );
    }
  },
});

module.exports = PageHeader;
