import React               from 'react';
import { AccordionPanel }  from '../vanilla/accordion';
import PeopleList          from '../models/people-list';
import Ratings             from '../../stores/ratings';
import { DelayLoadModel,
         ModelTracker }    from '../../mixins';
import RecommendsButton    from '../bound/recommends-button';

class Recommends extends DelayLoadModel(ModelTracker(React.Component))
{
  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    this.setState({ numItems: nextProps.numItems });
  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.numItems !== nextState.numItems || super.shouldComponentUpdate(nextProps,nextState);
  }

  stateFromStore(store) {
    return { 
      id: store.model.upload.id, 
      numItems: store.model.upload.numRecommends 
    };
  }

  refreshModel(store) {
    !this.ratings && (this.ratings = new Ratings());

    var id = store ? store.model.upload.id : this.state.id;

    return this.ratings.recommendedBy(id);
  }

  render() {
    const { numItems, model, open } = this.state;

    var penProps = {
      disabled:     !Number(numItems),
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