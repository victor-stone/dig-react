/*eslint "react/no-danger":0 */
import React                 from 'react';
import { AccordianPanel }    from '../vanilla/Accordian';
import Glyph                 from '../vanilla/Glyph';
import ReviewsPopup          from '../bound/ReviewsPopup';
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

  // TODO: bug: indenting isn't working
  _renderReview(r,i) {
    return (
        <div key={i} className={'panel panel-info panel-offset-' + r.indent}>
          <div className="panel-heading">
            <h3 className="panel-title">
              {r.indent 
                ? <span><Glyph icon="arrow-circle-right" />{' ' + r.author.name}</span>
                : <span><img src={r.author.avatarURL} />{' ' + r.author.name}</span>
              }
            </h3>
          </div>
          <div className="panel-body" dangerouslySetInnerHTML={{__html: r.html}} />
          <div className="panel-footer">{r.date}</div>
        </div>
      );
  },

  render() {
    const { numItems, model } = this.state;
    var title = `Reviews (${numItems})`;
    var revButton = <ReviewsPopup store={this.props.store} />;
    return (
        <AccordianPanel 
          disabled={!numItems} 
          headerContent={revButton} 
          title={title} 
          id="reviews" 
          icon="pencil" 
          onOpen={this.onOpen} 
          onClose={this.onClose} 
        >
          {model && model.map( this._renderReview )}
        </AccordianPanel>
      );
  }

});

module.exports = Reviews;

//