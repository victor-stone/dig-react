import React             from 'react';
import { ModelTracker }  from '../../mixins';
import Glyph             from '../vanilla/Glyph';

class RecommendsButton extends ModelTracker.extender(React.Component)
{
  shouldComponentUpdate(nextProps,nextState) {
    return this.state.store.permissions.okToRate !== nextState.store.permissions.okToRate;
  }

  stateFromStore(store) {
    return { id: 'recc_' + store.model.upload.id, store };
  }

  onRecommends() {
    /* globals $ */
    // http://stackoverflow.com/questions/17327668/best-way-to-disable-button-in-twitters-bootstrap
    $('#' + this.state.id).prop({disabled:true}).addClass('btn-disabled');
    this.state.store.recommend();
  }

  render() {
    const { className = '' } = this.props;
    var cls = 'ratings ' + className;
    return (
      this.state.store.permissions.okToRate
        ? <button id={this.state.id} onClick={this.onRecommends} className={cls}><Glyph icon="thumbs-up" /></button>
        : null
    );
  }
}

module.exports = RecommendsButton;

//