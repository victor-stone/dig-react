import React             from 'react';
import QueryOptions      from './query-options';

import TrackListPreview  from '../bound/track-list-preview';

import SaveButton        from '../vanilla/save-button';
import PageHeader        from '../vanilla/page-header';
import InlineCss         from '../vanilla/inline-css';
import { Row,
         FluidContainer,
         Column }        from '../vanilla/grid';

import css               from '../filters/style/query-options';
import editCSS           from './style/edit';

import DisableScrollToTop from '../services/disable-scroll-to-top';

class DynamicForm extends DisableScrollToTop(React.Component)
{
  render() {
    const { prefix, title, store: {model:{tracks}} } = this.props;
    var cls   = prefix + '-playlist-widget';
    var id    = prefix + '-playlist-css';
    return (
        <div className={cls}>
          <InlineCss css={css + editCSS} id={id} />
          <PageHeader icon="edit" title={title} />
          <FluidContainer>
            <Row>
              <Column cols="8" offset="2">
                <Row>
                  <Column cols="6">
                    <QueryOptions store={tracks} />
                  </Column>
                  <Column cols="6">
                    <h3>{"preview"}</h3>
                    <TrackListPreview store={tracks} />
                    <SaveButton onSave={this.props.onSave} />
                  </Column>
                </Row>
              </Column>
            </Row>
          </FluidContainer>
        </div>

      );
  }
}


module.exports = DynamicForm;

