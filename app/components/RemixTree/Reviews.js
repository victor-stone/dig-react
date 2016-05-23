/*eslint "react/no-danger":0 */
import React               from 'react';
import { LazyAccordianPanel }  from '../Accordian';
import Glyph               from '../Glyph';
import Topics              from '../../stores/topics';

class Reviews extends LazyAccordianPanel {
  constructor(props) {
    super(props);
    this.icon = 'pencil';
    this.id = 'reviews';
    this._setTitle(props);
  }

  componentWillReceiveProps(nextProps) {
    this._setTitle(nextProps);
    super.componentWillReceiveProps(...arguments);
  }

  getModel(props) {
    if( !this.topics ) {
      this.topics = new Topics();
    }
    return this.topics.reviewsFor(props.model.id);    
  }

  _setTitle(props) {
    this.title = `Reviews (${props.numItems})`;
  }
  
  renderChildren(model) {
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
    return reviews;
  }

}

module.exports = Reviews;

//