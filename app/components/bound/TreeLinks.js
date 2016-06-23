import React             from 'react';
import _TreeLinks        from '../models/TreeLinks';
import { ModelTracker }  from '../../mixins';

class TreeLinks extends ModelTracker.extender(React.Component)
{
  shouldComponentUpdate(nextProps) {
    return this.props.store.model.upload.id !== nextProps.store.model.upload.id;
  }
  
  stateFromStore(store) {
    return { model: [ ...store.model[this.props.id], ...(this.props.trackbacks ? store.model.trackbacks : []) ] };
  }

  render() {
    return <_TreeLinks model={this.state.model} />;
  }
}

function SamplesFrom(props) {
  return (<TreeLinks title="Uses samples from..." id="sources" store={props.store} />);
}

function SamplesUsedIn(props) {
  return(<TreeLinks title="Samples are used in..." id="remixes" store={props.store} trackbacks />);
}

module.exports = {
  SamplesFrom,
  SamplesUsedIn
};

//