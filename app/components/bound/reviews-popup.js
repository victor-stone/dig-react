import React        from 'react';
import Glyph        from '../vanilla/glyph';
import Modal        from '../services/modal';
import TextEditor   from '../vanilla/text-editor';

import { bindAll,
         selectors } from 'unicorns';

class ReviewPopup extends Modal.Popup {

  constructor() {
    super(...arguments);
    this.state = { error: '',
                   disableSubmit: true };
    bindAll(this, 'onChange', 'shouldSubmitBeDisabled', 'onSubmitReview' );
  }

  shouldComponentUpdate(nextProps) {
    return this.state.id !== nextProps.store.model.upload.id || 
            this.state.permissions.okToRate !== nextProps.store.permissions.okToRate;
  }

  onChange(event) {
    var value = event.target.value.trim();
    var disableSubmit = value.length === 0;
    this.setState( {disableSubmit,value} );
  }

  onSubmitReview() {
    this.setState( { error: '' } );
    return this.props.store.review(this.state.value)
                .then( () => this.manualClose() );
  }

  shouldSubmitBeDisabled() {
    return this.state.disableSubmit;
  }

  render() {
    return (
      <Modal action={this.onSubmitReview} 
             submitDisabler={this.shouldSubmitBeDisabled} 
             subTitle="Review"
             title={this.props.store.model.upload.name}  
             buttonText="Submit" 
             closeText="Cancel" 
             error={this.state.error}
             {...this.props}
      >
          <div className="form-group">
              <label>{"Your review:"}</label>
              <TextEditor  onChange={this.onChange} />
          </div>
      </Modal>
      );
  }  
}

class ReviewsButton extends React.Component
{
  constructor() {
    super(...arguments);
    this.onReview = this.onReview.bind(this);

    this.state = this._stateFromProps(this.props);
  }

  componentWillReceiveProps(props) {
    
    this.setState(this._stateFromProps(props));
  }

  shouldComponentUpdate(nextProps) {
    return this.state.id !== nextProps.store.model.upload.id || 
            this.state.permissions.okToReview !== nextProps.store.permissions.okToReview;
  }

  _stateFromProps(props) {
    const { model:{upload:{id}}, permissions } = props.store;

    return { id, permissions };
  }

  onReview(event) {
    event.stopPropagation();
    event.preventDefault();
    ReviewPopup.show( ReviewPopup, { store: this.props.store } );
  }

  render() {
    const { store, className  } = this.props;

    const { permissions: { okToReview = false} } = store;

    const cls = selectors('review',className);

    return (
        okToReview
          ? <button onClick={this.onReview} className={cls}><Glyph icon="pencil" /></button>
          : null
      );
    }
}


module.exports = ReviewsButton;

//