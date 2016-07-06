import React                 from 'react';
import { AccordionPanel }    from '../vanilla/Accordion';
import ReviewsPopup          from '../bound/ReviewsPopup';
import ReviewsPanel          from '../models/ReviewsPanel';
import InlineCSS             from '../vanilla/InlineCSS';
import Topics                from '../../stores/topics';
import { ModelTracker,
        DelayLoadModel }    from '../../mixins';

var Reviews = React.createClass({

  mixins: [ModelTracker,DelayLoadModel],

  getInitialState() {
    return { numItems: this.props.numItems };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({ numItems: nextProps.numItems });
  },

  speakNow(nextProps,nextState) {
    return this.state.numItems !== nextState.numItems;
  },

  stateFromStore(store) {
    return { id: store.model.upload.id };
  },
  
  refreshModel(store) {
    if( !this.topics ) {
      this.topics = new Topics();
    }
    var id = store ? store.model.upload.id : this.state.id;
    return this.topics.reviewsFor(id);
  },

  render() {
    const { numItems, model } = this.state;
    var title = `Reviews (${numItems})`;
    var revButton = <ReviewsPopup store={this.props.store} />;
    return (
        <AccordionPanel 
          disabled={!numItems} 
          headerContent={revButton} 
          title={title} 
          id="reviews" 
          icon="pencil" 
          onOpen={this.onOpen} 
          onClose={this.onClose} 
        >
          <InlineCSS css={ReviewsPanel.css} id="review-panel-css" />
          <ReviewsPanel model={model} />
        </AccordionPanel>
      );
  }

});

module.exports = Reviews;

//