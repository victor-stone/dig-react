import React             from 'react';
import SaveButton        from '../vanilla/SaveButton';
import QueryOptions      from './QueryOptions';

import StaticTrackList   from '../bound/StaticTrackList';

import PageHeader        from '../PageHeader';
import InlineCSS         from '../vanilla/InlineCSS';
import css               from './style/edit';
import DisableAutoScroll from '../services/DisableAutoScroll';

class DynamicForm extends DisableAutoScroll(React.Component)
{
  render() {
    var store = this.props.store;
    var cls   = this.props.prefix + '-playlist-widget';
    var id    = this.props.prefix = '-playlist-css';
    return (
        <div className={cls}>
          <InlineCSS css={css} id={id} />
          <PageHeader icon="edit" title={this.props.title} />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className="row">
                  <div className="col-md-6">
                    <QueryOptions store={store.model.tracks} />
                  </div>
                  <div className="col-md-6">
                    <h3>{"preview"}</h3>
                    <StaticTrackList store={store.model.track} />
                    <SaveButton onSave={this.onSave} />
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

