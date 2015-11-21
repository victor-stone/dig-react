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

  render: function() {
    var model = this.props.store.model;
    return (
        <div className="topic-page">
          <PageHeader title={model.name} icon="file-text-o" />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <TopicBody store={this.props.store} />
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
