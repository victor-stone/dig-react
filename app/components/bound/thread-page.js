import React          from 'react';
import PageHeader     from '../vanilla/page-header';
import InlineCss      from '../vanilla/inline-css';
import { Row,
         FluidContainer,
         Column }     from '../vanilla/grid';
import ThreadPanel    from '../models/thread-panel';

class ThreadPage extends React.Component
{
  constructor() {
    super(...arguments);
  }

  render() {
    const { model:{head:{forum,name},items} } = this.props.store;

    return(
        <FluidContainer>
          <InlineCss css={ThreadPanel.css} id="thread-panel-css" />
          <PageHeader title={name} subTitle={forum.name} icon="comments" />
          <Row>
            <Column cols="10" offset="1">
              <ThreadPanel model={items} />
            </Column>
          </Row>
        </FluidContainer>
      );
  }
}

module.exports = ThreadPage;