import React                 from 'react';
import { AccordionPanel }    from '../vanilla/accordion';
import ReviewsPopup          from '../bound/reviews-popup';
import ReviewsPanel          from '../models/reviews-panel';
import InlineCss             from '../vanilla/inline-css';
import Topics                from '../../stores/topics';
import { ModelTracker,
        DelayLoadModel }    from '../../mixins';

class Reviews extends DelayLoadModel(ModelTracker(React.Component))
{
  constructor() {
    super(...arguments);
    this.state.numItems = this.props.numItems;
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    this.setState({ numItems: nextProps.numItems });
  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.numItems !== nextState.numItems || super.shouldComponentUpdate(nextProps,nextState);
  }

  stateFromStore(store) {
    return { id: store.model.upload.id };
  }
  
  refreshModel(store) {
    if( !this.topics ) {
      this.topics = new Topics();
    }
    var id = store ? store.model.upload.id : this.state.id;
    return this.topics.reviewsFor(id);
  }

  render() {
    const { numItems, model } = this.state;

    const accProps = {
      disabled:      !numItems,
      headerContent: <ReviewsPopup store={this.props.store} />,
      title:         `Reviews (${numItems})`,
      id:            'reviews',
      icon:           'pencil', 
      onOpen:         this.onOpen,
      onClose:        this.onClose
    };

    return (
        <AccordionPanel {...accProps}>
          <InlineCss css={ReviewsPanel.css} id="review-panel-css" />
          <ReviewsPanel model={model} />
        </AccordionPanel>
      );
  }

}

module.exports = Reviews;

//