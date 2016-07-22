import React        from 'react';
import Filter       from '../../models/filters/bpm';
import Slider       from '../properties/controls/Slider';
import PropertyState  from '../properties/mixins/PropertyState';

class BPMSlider extends React.Component
{
  constructor() {
    super(...arguments);

    this.sliderProps = {
      property:         Filter,
      store:          this.props.store,
      min:            BPMSlider.BPM_ALL,
      max:            BPMSlider.MAX_BPM,
      numPips:        BPMSlider.BPM_NUM_PIPS,
      steps:          BPMSlider.SLIDER_STEPS,
      density:        BPMSlider.SLIDER_DENSITY,
      debounceDelay:  BPMSlider.DEBOUNCE_APPLY_BPM,
      containerClass: 'bpm-slider-container',
    };
  }

  render() {
    return <Slider {...this.sliderProps} />;
  }
}

Object.assign(BPMSlider,{
  DEBOUNCE_APPLY_BPM: 200,
  MAX_BPM           : 130,
  BPM_ALL           : 55,
  SLIDER_STEPS      : 5,
  SLIDER_DENSITY    : 6,

  BPM_NUM_PIPS      : 4,
  BPM_TAG_RANGE     : 5
});

class BPMDisplay extends PropertyState(React.Component)
{
  render() {
    const { value = 0 } = this.state;
    let text = value ? `${value} - ${value+BPMSlider.BPM_TAG_RANGE}` : 'all';
    return ( 
        <span className="bpm-display">
          <span className="bpm-title">{"bpm "}</span>
          <span className="bpm">{text}</span>
        </span>
      );
  }

}

BPMDisplay.defaultProps = { property: Filter };

module.exports = {
  BPMDisplay,
  BPMSlider,
  Display: BPMDisplay,
  Slider: BPMSlider
};