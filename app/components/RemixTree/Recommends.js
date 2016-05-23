import React               from 'react';
import { LazyAccordianPanel }  from '../Accordian';
import Ratings             from '../../stores/ratings';


class Recommends extends LazyAccordianPanel {
  constructor(props) {
    super(props);
    this.icon = 'thumbs-o-up';
    this.id = 'recc';
    this._setTitle(props);
  }

  componentWillReceiveProps(nextProps) {
    this._setTitle(nextProps);
    super.componentWillReceiveProps(...arguments);
  }

  _setTitle(props) {
    this.title = `Recommends (${props.numItems})`;
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