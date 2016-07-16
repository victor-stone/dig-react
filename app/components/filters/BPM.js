import React        from 'react';
import Filter       from '../../models/filters/bpm';
import Slider       from './controls/Slider';
import DisplayOnly  from './controls/DisplayOnly';

const DEBOUNCE_APPLY_BPM = 200;
const MAX_BPM            = 130;
const BPM_ALL            = 55;
const SLIDER_STEPS       = 5;
const SLIDER_DENSITY     = 6;

const BPM_NUM_PIPS       = 4;
const BPM_TAG_RANGE      = 5;

class BPMSlider extends React.Component
{
  constructor() {
    super(...arguments);
    this.sliderProps = {
      filter: Filter,
      store: this.props.store,
      min: BPM_ALL,
      max: MAX_BPM,
      numPips: BPM_NUM_PIPS,
      steps: SLIDER_STEPS,
      density: SLIDER_DENSITY,
      debounceDelay: DEBOUNCE_APPLY_BPM,
      containerClass: 'bpm-slider-container',
    };
  }
  render() {
    return <Slider {...this.sliderProps} />;
  }

}

class BPMDisplay extends DisplayOnly(React.Component)
{
  get filterComponent() {
    return Filter;
  }

  render() {
    const { value = 0 } = this.state;
    let text = value ? `${value} - ${value+BPM_TAG_RANGE}` : 'all';
    return ( 
        <span className="bpm-display">
          <span className="bpm-title">{"bpm "}</span>
          <span className="bpm">{text}</span>
        </span>
      );
  }

}

module.exports = {
  BPMDisplay,
  BPMSlider,
  Display: BPMDisplay,
  Slider: BPMSlider
};