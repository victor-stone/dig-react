import React               from 'react';
import { LazyAccordianPanel }  from '../Accordian';
import Ratings             from '../../stores/ratings';


class Recommends extends LazyAccordianPanel {
  constructor(props) {
    super(props);
    this.title = `Recommends (${props.numRecommends})`;
    this.icon = 'thumbs-o-up';
    this.id = 'recc';
  }

  componentWillReceiveProps(nextProps) {
    this.title = `Recommends (${nextProps.numRecommends})`;
    super.componentWillReceiveProps(...arguments);
  }

  getModel(props) {
    if( !this.ratings ) {
      this.ratings = new Ratings();
    }
    return this.ratings.recommendedBy(props.model.id);
  }

  renderChildren(model) {
    return <ul className="recommends-list">{model.map( (t,i) => <li key={i}>{t.name}</li> )}</ul>;
  }
}

module.exports = Recommends;

//