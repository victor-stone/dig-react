import React             from 'react';
import QueryOptions      from './QueryOptions';

import StaticTrackList   from '../bound/StaticTrackList';

import SaveButton        from '../vanilla/SaveButton';
import PageHeader        from '../vanilla/PageHeader';
import InlineCSS         from '../vanilla/InlineCSS';

import css               from './style/edit';

import DisableScrollToTop from '../services/DisableScrollToTop';

class DynamicForm extends DisableScrollToTop(React.Component)
{
  render() {
    const { prefix, title, store: {model:{tracks}} } = this.props;
    var cls   = prefix + '-playlist-widget';
    var id    = prefix + '-playlist-css';
    return (
        <div className={cls}>
          <InlineCSS css={css} id={id} />
          <PageHeader icon="edit" title={title} />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className="row">
                  <div className="col-md-6">
                    <QueryOptions store={tracks} />
                  </div>
                  <div className="col-md-6">
                    <h3>{"preview"}</h3>
                    <StaticTrackList store={tracks} />
                    <SaveButton onSave={this.props.onSave} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      );
  }
}


module.exports = DynamicForm;

