import React from 'react';

var CloseButton = React.createClass({

  render: function() {
    /*eslint "react/no-danger":0 */
    var times    = { __html: '&times;'};

    return (
        <button type="button" {...this.props} className="close" aria-label="Close"><span aria-hidden="true" dangerouslySetInnerHTML={times} /></button>
      );
  }
});

module.exports = CloseButton;

