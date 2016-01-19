/* globals $ */
import React      from 'react';
import tweenState from 'react-tween-state';
import env        from '../services/env';

import Glyph      from './Glyph';

env.assert(tweenState,`no tweenState`);
env.assert(tweenState.Mixin,`no tweenState`);

function translateXStyle(left, width) {
  return {
    transform: 'translateZ(0) translateX(' + left + 'px)',
    WebkitTransform: 'translateZ(0) translateX(' + left + 'px)',
    width: width
  };
}

var Slider = React.createClass({
  mixins: [tweenState.Mixin],
  
  getInitialState() {
    return {
      leftA: 0,
      widthA: 0,
      };
  },
   componentDidMount() {
    this._doState();
  },

  _doState() {
    var w = $('.col-xs-4').outerWidth(true);
    this.setState( { widthA: w, w: w }/*, function() {
      console.log('set state');
    }*/);
  },

  doSlide() {
    var w = $('.col-xs-4').outerWidth(true);
    this.tweenState('leftA', {
      easing: tweenState.easingTypes.easeInOutQuad,
      stackBehavior: tweenState.stackBehavior.ADDITIVE,
      duration: 1000,
      endValue: this.state.leftA === 0 ? w : 0,
    });
    this.tweenState('widthA', {
      easing: tweenState.easingTypes.easeInOutQuad,
      stackBehavior: tweenState.stackBehavior.ADDITIVE,
      duration: 1000,
      endValue: this.state.widthA === 0 ? w : 0,
    });
  },
  
  render() {
    var leftStyle = translateXStyle( this.getTweeningValue('leftA'),this.getTweeningValue('widthA'));
    
    var children = React.Children.map( this.props.children, child => {
      return (
          <div className="col-xs-4 slider-col">
            <div className="slideable slider-group-1" style={leftStyle}>
              {child}
            </div>
          </div>
        );
      });
      
    return (<div className="container-fluid">
      <div className="row slider-row">
      {children}
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-5">
          <button className="btn btn-success" onClick={this.doSlide}>{"slide"}</button>
        </div>
      </div>
    </div>);
  }
});

var SamplesFrom = React.createClass({
  render() {
    return(
        <div>
          <b>{"Samples are used from..."}</b>
            <ul><li>{"item1"}</li><li>{"item2"}</li></ul>
        </div>
    );
  }
});

var MainFile = React.createClass({
  render() {
    return(
        <div>
          <p>{"\"Hello father\" by Starving Artist"}</p>
          <button className="btn btn-sm btn-warning">
            <Glyph icon="play" />{" PlayIT"}
          </button>
        </div>
    );
  }
});

var SamplesUsedIn = React.createClass({
  render() {
    return(
        <div>
            <b>{"Samples are used in..."}</b>
            <ul><li>{"item1"}</li><li>{"item2"}</li></ul>
        </div>
    );
  }

});

var SliderRow = React.createClass({
  render() {
    return( <Slider>
        <SamplesFrom />
        <MainFile />
        <SamplesUsedIn />
    </Slider>);
  }
});

module.exports = {
  Slider,
  SliderRow
};

//