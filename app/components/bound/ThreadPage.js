import React          from 'react';
import PageHeader     from '../vanilla/PageHeader';
import InlineCSS      from '../vanilla/InlineCSS';
import { Row,
         FluidContainer,
         Column }     from '../vanilla/Grid';
import ThreadPanel    from '../models/ThreadPanel';

class ThreadPage extends React.Component
{
  constructor() {
    super(...arguments);
  }

  render() {
    const { model:{head:{forum,name},items} } = this.props.store;

    return(
        <FluidContainer>
          <InlineCSS css={ThreadPanel.css} id="thread-panel-css" />
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