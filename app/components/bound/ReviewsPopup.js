import React                 from 'react';
import Glyph                 from '../vanilla/Glyph';
import Modal                 from '../services/Modal';
import {FormattedTextEditor} from '../vanilla/FormattedTextEditor';
import { ModelTracker}       from '../../mixins';

class ReviewPopup extends Modal.Popup {

  constructor() {
    super(...arguments);
    this.state = { error: '',
                   disableSubmit: true };
    this.__bindAll([ 'onChange', 'shouldSubmitBeDisabled', 'onSubmitReview']);
  }

  onChange(event) {
    var value = event.target.value.trim();
    var disableSubmit = value.length === 0;
    this.setState( {disableSubmit,value} );
  }

  onSubmitReview() {
    this.setState( { error: '' } );
    this.props.store.review(this.state.value)
      .then( () => this.manualClose );
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
              <FormattedTextEditor  onChange={this.onChange} />
          </div>
      </Modal>
      );
  }  
}

class ReviewsButton extends ModelTracker.extender(React.Component)
{
  constructor() {
    super(...arguments);
    this.state = { disabled: true };
  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.store.permissions.okToReview !== nextState.store.permissions.okToReview;
  }

  stateFromStore(store) {
    return {store};
  }
  
  onReview(event) {
    event.stopPropagation();
    event.preventDefault();
    ReviewPopup.show( ReviewPopup, { store: this.state.store } );
  }

  render() {
    const { className = '' } = this.props;
    const cls = 'review ' + className;
    return (
        this.state.store.permissions.okToReview && !this.state.disabled
          ? <button onClick={this.onReview} className={cls}><Glyph icon="pencil" /></button>
          : null
      );
    }
}


module.exports = ReviewsButton;

//