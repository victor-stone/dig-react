import React from 'react';
import PageHeader from './PageHeader';

const TopicBody = React.createClass({

  render: function() {
    var model = this.props.store.model;
    /*eslint "react/no-danger":0 */
    var body    = { __html: model.html};
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
