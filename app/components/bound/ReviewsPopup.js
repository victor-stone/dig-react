import React                 from 'react';
import Glyph                 from '../vanilla/Glyph';
import Modal                 from '../services/Modal';
import {FormattedTextEditor} from '../vanilla/FormattedTextEditor';
import { bindAll,
         selectors }         from '../../unicorns';

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
              <FormattedTextEditor  onChange={this.onChange} />
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
    const { model: {upload:{id}}, permissions } = this.props.store;
    this.state = { id, permissions };
  }

  componentWillReceiveProps(props) {
    const { model: {upload:{id}}, permissions } = props.store;
    this.setState({id,permissions});
  }

  shouldComponentUpdate(nextProps) {
    return this.state.id !== nextProps.store.model.upload.id || 
            this.state.permissions.okToReview !== nextProps.store.permissions.okToReview;
  }

  onReview(event) {
    event.stopPropagation();
    event.preventDefault();
    ReviewPopup.show( ReviewPopup, { store: this.props.store } );
  }

  render() {
    const { store: { permissions:{okToReview=false} = {}}, className = '' } = this.props;
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