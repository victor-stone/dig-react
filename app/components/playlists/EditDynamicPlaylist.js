import React             from 'react';
import QueryOptions      from './QueryOptions';

import StaticTrackList   from '../bound/StaticTrackList';

import SaveButton        from '../vanilla/SaveButton';
import PageHeader        from '../vanilla/PageHeader';
import InlineCSS         from '../vanilla/InlineCSS';
import { Row,
         FluidContainer,
         Column }        from '../vanilla/Grid';

import css               from '../filters/style/query-options';
import editCSS           from './style/edit';

import DisableScrollToTop from '../services/DisableScrollToTop';

class DynamicForm extends DisableScrollToTop(React.Component)
{
  render() {
    const { prefix, title, store: {model:{tracks}} } = this.props;
    var cls   = prefix + '-playlist-widget';
    var id    = prefix + '-playlist-css';
    return (
        <div className={cls}>
          <InlineCSS css={css + editCSS} id={id} />
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
                    <StaticTrackList store={tracks} />
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

