import React            from 'react';
import page             from '../stores/page';


var Page = React.createClass({

  render() {
    var store = this.props.store;
    var html      = { __html: store.html };
    /*eslint "react/no-danger":0 */

    return (
      <div className="container-fluid">
        <div dangerouslySetInnerHTML={html} />
      </div>
    );      
  },

});

Page.title = 'page';
Page.path = '/page/:pagename';

Page.store = function(params) {
  Page.title = params.pagename;
  return page.storeFromPageName(params.pagename);
};

module.exports = Page;

