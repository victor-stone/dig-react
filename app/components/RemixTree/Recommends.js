import React               from 'react';
import { AccordianPanel }  from '../vanilla/Accordian';
import PeopleList          from '../models/PeopleList';
import Ratings             from '../../stores/ratings';
import { DelayLoadModel,
         ModelTracker }    from '../../mixins';
import RecommendsButton    from '../bound/RecommendsButton';

var Recommends = React.createClass({

  mixins: [ModelTracker,DelayLoadModel],

  componentWillReceiveProps(nextProps) {
    this.setState({ numItems: nextProps.numItems });
  },

  speakNow(nextProps,nextState) {
    return this.state.numItems !== nextState.numItems;
  },

  stateFromStore(store) {
    return { id: store.model.upload.id, numItems: store.model.upload.numRecommends };
  },

  refreshModel(store) {
    if( !this.ratings ) {
      this.ratings = new Ratings();
    }
    var id = store ? store.model.upload.id : this.state.id;
    return this.ratings.recommendedBy(id);
  },

  render() {
    var title = `Recommends (${this.state.numItems})`;
    var recButton = <RecommendsButton store={this.props.store} className="pull-right" />;
    return (
      <AccordianPanel disabled={!this.state.numItems} 
                      title={title} 
                      id="recc" 
                      icon="thumbs-o-up" 
                      headerContent={recButton} 
                      onOpen={this.onOpen}
                      nClose={this.onClose} 
      >
        {this.state.model && this.state.open
          ? <PeopleList className="recommends-list" thumb model={this.state.model} />
          : null
        }
      </AccordianPanel>
    );
  }
});

module.exports = Recommends;

//