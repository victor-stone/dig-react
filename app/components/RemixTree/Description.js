import React             from 'react';
import CollapsingText    from '../CollapsingText';
import { ModelTracker }  from '../../mixins';

var Description = React.createClass({

  mixins: [ModelTracker],

  stateFromStore(store) {
    var model = store.model.upload;
    return { html: model.descriptionHTML };
  },

  render() {
    return (<CollapsingText html={this.state.html} />);
  }

});


module.exports = Description;

//