/* xglobals $ */
import React      from 'react';
//import rsvp       from 'rsvp';
//import tweenState from 'react-tween-state';

var PanelSlider = React.createClass({

  render() {

    var children = React.Children.map( this.props.children, child => {
      return (
          <div className="col-xs-4 slider-col">
            <div className="slideable slider-group-1" >
              {React.cloneElement(child,{ transition: this.props.transition })}
            </div>
          </div>
        );
      });
      
    return (<div className="container-fluid">
      <div className="row slider-row">
      {children}
      </div>
    </div>);
  }
});


/*
function translateXStyle(left, width) {
  return {
    transform: 'translateZ(0) translateX(' + left + 'px)',
    WebkitTransform: 'translateZ(0) translateX(' + left + 'px)',
    width,
  };
}

var PanelSlider = React.createClass({
  mixins: [tweenState.Mixin],
  
  getInitialState() {
    return {
      leftA: 0,
      widthA: 0,
      direction: 'right'
      };
  },

   componentDidMount() {
    this._doState();
  },

  _doState() {
    var w = $('.col-xs-4').outerWidth(true);
    var s = { widthA: w, w: w };
    this._setState( s );
  },

  _setState(state) {
    var _this;
    return new rsvp.Promise(function(success) {
      _this.setState( state, success );
    });
  },

  transition(direction,model) {    
    return () =>
      this._setState( { direction } )
        .then( () => this.doSlide() )
        .then( () => this.props.transition(model) )      
        .then( () => this.doSlide() );
  },

  doSlide() {
    return new rsvp.Promise( function(success) {
      var w = $('.col-xs-4').outerWidth(true);
      var leftTarget = ( this.state.direction === 'right') ? w : -w;
      this.tweenState('leftA', {
        easing: tweenState.easingTypes.easeInOutQuad,
        stackBehavior: tweenState.stackBehavior.ADDITIVE,
        duration: 1000,
        endValue: this.state.leftA === 0 ? leftTarget : 0,
      });
      this.tweenState('widthA', {
        easing: tweenState.easingTypes.easeInOutQuad,
        stackBehavior: tweenState.stackBehavior.ADDITIVE,
        duration: 1000,
        endValue: this.state.widthA === 0 ? w : 0,
        onEnd: success
      });
    });
  },
  
  render() {
    var leftStyle = translateXStyle( this.getTweeningValue('leftA'),
                                     this.getTweeningValue('widthA'));
    
    var children = React.Children.map( this.props.children, child => {
      return (
          <div className="col-xs-4 slider-col">
            <div className="slideable slider-group-1" style={leftStyle}>
              {React.cloneElement(child,{ transition: this.transition })}
            </div>
          </div>
        );
      });
      
      // onClick={this.doSlide('left')}
      // 
    return (<div className="container-fluid">
      <div className="row slider-row">
      {children}
      </div>
    </div>);
  }
});

*/

module.exports = PanelSlider;

//