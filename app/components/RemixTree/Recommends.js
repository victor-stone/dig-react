import React               from 'react';
import { AccordionPanel }  from '../vanilla/Accordion';
import PeopleList          from '../models/PeopleList';
import Ratings             from '../../stores/ratings';
import { DelayLoadModel,
         ModelTracker }    from '../../mixins';
import RecommendsButton    from '../bound/RecommendsButton';

class Recommends extends DelayLoadModel(ModelTracker(React.Component))
{
  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    this.setState({ numItems: nextProps.numItems });
  }

  speakNow(nextProps,nextState) {
    return this.state.numItems !== nextState.numItems;
  }

  stateFromStore(store) {
    return { id: store.model.upload.id, numItems: store.model.upload.numRecommends };
  }

  refreshModel(store) {
    if( !this.ratings ) {
      this.ratings = new Ratings();
    }
    var id = store ? store.model.upload.id : this.state.id;
    return this.ratings.recommendedBy(id);
  }

  render() {
    const { numItems, model, open } = this.state;

    var penProps = {
      disabled:     !numItems,      
      title:        `Recommends (${numItems})`,
      id:           'recc',
      icon:         'thumbs-o-up',
      headerContent: <RecommendsButton store={this.props.store} className="pull-right" />,
      onOpen:       this.onOpen,
      onClose:      this.onClose,
    };

    return (
      <AccordionPanel {...penProps}>
        {model && open && <PeopleList className="recommends-list" floating thumb model={model} />}
      </AccordionPanel>
    );
  }
}

module.exports = Recommends;

//