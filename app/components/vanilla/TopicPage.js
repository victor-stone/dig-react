import React      from 'react';
import PageHeader from './PageHeader';

class TopicPage extends React.Component
{
  render() {
    return (
        <div className="topic-page">
          <PageHeader title={this.props.title} icon={this.props.icon} />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      );
  }
}

TopicPage.defaultProps = { icon: 'file-text-o' };

module.exports = TopicPage;

