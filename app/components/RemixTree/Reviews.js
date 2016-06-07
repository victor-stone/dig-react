/*eslint "react/no-danger":0 */
import React               from 'react';
import { AccordianPanel }  from '../Accordian';
import Glyph               from '../Glyph';
import Topics              from '../../stores/topics';
import { ModelTracker,
        CollapsingModel }    from '../../mixins';

var  Reviews = React.createClass({

  mixins: [ModelTracker,CollapsingModel],

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
  
  refreshModel(props) {
    if( !this.topics ) {
      this.topics = new Topics();
    }
    var id = props ? props.store.model.upload.id : this.state.id;
    return this.topics.reviewsFor(id);
  },

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
    var title = `Reviews (${this.state.numItems})`;
    return (
        <AccordianPanel title={title} id="reviews" icon="pencil" onOpen={this.onOpen} onClose={this.onClose} >
        {this.state.model 
          ? this.state.model.map( this._renderReview )
          : null
        }
        </AccordianPanel>
      );
  }

});

module.exports = Reviews;

//