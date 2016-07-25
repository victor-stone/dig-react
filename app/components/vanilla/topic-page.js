import React      from 'react';
import PageHeader from './page-header';
import { Row,
         FluidContainer,
         Column }     from './grid';

class TopicPage extends React.Component
{
  render() {
    return (
        <div className="topic-page">
          <PageHeader title={this.props.title} icon={this.props.icon} />
          <FluidContainer>
            <Row>
              <Column cols="8" offset="2">
                {this.props.children}
              </Column>
            </Row>
          </FluidContainer>
        </div>
      );
  }
}

TopicPage.defaultProps = { icon: 'file-text-o' };

module.exports = TopicPage;

