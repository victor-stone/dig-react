import React             from 'react';
import { ModelTracker }  from '../../mixins';
import Glyph             from '../vanilla/Glyph';
import { selectors }     from '../../unicorns';

class RecommendsButton extends ModelTracker(React.Component)
{
  constructor() {
    super(...arguments);
    this.onRecommends = this.onRecommends.bind(this);
  }
  
  shouldComponentUpdate(nextProps) {
    return this.state.id !== nextProps.store.model.upload.id || 
            this.state.permissions.okToRate !== nextProps.store.permissions.okToRate;
  }

  stateFromStore(store) {
    const { model: {upload:{id}}, permissions } = store;
    return { domId: 'recc_' + id, id, permissions };
  }

  onRecommends() {
    /* globals $ */
    // http://stackoverflow.com/questions/17327668/best-way-to-disable-button-in-twitters-bootstrap
    $('#' + this.state.domId).prop({disabled:true}).addClass('btn-disabled');
    this.props.store.recommend();
  }

  render() {
    const { store: {permissions:{okToRate=false} = {}}, className = '' } = this.props;
    const { domId } = this.state;

    var cls = selectors('ratings',className);

    return (
      okToRate
        ? <button id={domId} onClick={this.onRecommends} className={cls}><Glyph icon="thumbs-up" /></button>
        : null
    );
  }
}

module.exports = RecommendsButton;

//