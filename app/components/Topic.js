import React from 'react';
import PageHeader from './vanilla/PageHeader';

const TopicBody = React.createClass({

  render: function() {
    var model = this.props.store.model;
    var html = model.html.replace(/(<img.*src=")(\/mixter-files)/g,'$1http://ccmixter.org$2');
    html = html.replace(/http:\/\/ccmixter.org\/files\//g,'/files/');
    /*eslint "react/no-danger":0 */
    var body    = { __html: html};
    return (
          <div className="topic-body" dangerouslySetInnerHTML={body} />
      );
  }

});

const TopicPage = React.createClass({

  getDefaultProps: function() {
    return { icon: 'file-text-o' };
  },

  render: function() {
    return (
        <div className="topic-page">
          <PageHeader title={this.props.title} icon={this.props.icon} />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      );
  }
});

module.exports = {
  TopicBody,
  TopicPage
};
