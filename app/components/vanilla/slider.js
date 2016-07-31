/* globals $ */
import React        from 'react';
import { debounce,
         nextId }   from 'unicorns';

const ONE_HUNDRED = 100;

function genPips(numPips) {
  var pips = [ ];
  for( var i = 0; i < numPips; i++ ) {
    pips.push( (ONE_HUNDRED / numPips) * i );
  }
  pips.push( ONE_HUNDRED );
  return pips;
}

class Slider extends React.Component
{
  constructor() {
    super(...arguments);
    
    this.state = { value: this.props.value || this.props.min };
    
    this.id = nextId('_slider_');

    const { debounceDelay = 0 } = this.props;
    
    if( debounceDelay ) {
      this.onSlide = debounce( this.props.onSlide, debounceDelay ); 
    } else {
      this.onSlide = this.props.onSlide;
    }
  }
  
  componentDidMount() {
    const { min, max, numPips, steps, density } = this.props;

    const { value } = this.state;

    var slider = document.getElementById(this.id);

    window.noUiSlider.create(slider, {
      start:    value,
      step:     steps,
      connect: 'lower',
      pips: {
          density,
          mode: 'positions',
          values: genPips(numPips),
        },        
      range: { min, max }
    });      

    slider.noUiSlider.on('slide', this.onSlide );
    slider.noUiSlider.set( value );
    $('.noUi-pips-horizontal div:nth-child(2)').html('all');
  }

  componentWillReceiveProps(props) {
    this.setState( { value: props.value } );
  }

  componentDidUpdate() {
    var nus = document.getElementById(this.id).noUiSlider;
    nus.set( this.state.value );
  }

  componentWillUnmount() {
    var nus = document.getElementById(this.id).noUiSlider;
    nus.off('slide');
    nus.destroy();
  }

  render() {
    const { containerClass } = this.props;

    return <div className={containerClass}><div id={this.id}></div></div>;
  }

}

module.exports = Slider;

