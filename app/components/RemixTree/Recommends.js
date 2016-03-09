import React               from 'react';
import { AccordianPanel }  from '../Accordian';
import Ratings             from '../../stores/ratings';


var Recommends = React.createClass({

  getInitialState() {
    return { model: null };
  },

  componentWillMount() {
    this.fetchRecommends(this.props.model.id);
  },

  componentWillReceiveProps(nextProps) {
    this.fetchRecommends(nextProps.model.id);
  },

  fetchRecommends(id) {
    if( !this.ratings ) {
      this.ratings = new Ratings();
    }
    this.ratings.recommendedBy(id).then( model => this.setState( { model }) );
  },

  render() {
    if( !this.state.model ) {
      return null;
    }
    var model = this.state.model;
    var title = `Recommends (${this.props.numRecommends})`;
    return (
      <AccordianPanel title={title} icon="thumbs-o-up" id="recc">
        <ul className="recommends-list">{model.map( (t,i) => <li key={i}>{t.name}</li> )}</ul>
      </AccordianPanel>
      );
  }
});

module.exports = Recommends;

//