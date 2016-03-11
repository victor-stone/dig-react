/*eslint "react/no-danger":0 */
import React               from 'react';
import { AccordianPanel }  from '../Accordian';
import Glyph               from '../Glyph';
import Topics              from '../../stores/topics';

var Reviews = React.createClass({

  getInitialState() {
    return { model: null };
  },

  componentWillMount() {
    this.fetchReviews(this.props.model.id);
  },

  componentWillReceiveProps(nextProps) {
    this.fetchReviews(nextProps.model.id);
  },

  fetchReviews(id) {
    if( !this.topics ) {
      this.topics = new Topics();
    }
   this.topics.reviewsFor(id).then( model => this.setState( { model }) );
  },

  render() {
    if( !this.state.model ) {
      return null;
    }
    var model = this.state.model;
    var reviews = model.map( (r,i) => (
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
      ));
    var title = `Reviews (${this.props.numReviews})`;
    return (
      <AccordianPanel title={title} id="reviews" icon="pencil">
        {reviews}
      </AccordianPanel>
      );
  }
});

module.exports = Reviews;

//