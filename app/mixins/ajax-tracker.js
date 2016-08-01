import env      from 'services/env';
import events   from 'models/events';

const AjaxTracker = target => class extends target {

  constructor() {
    super(...arguments);
    this.state = { ajax: { loading: false } };
    this._onLoading = this._onLoading.bind(this);
  }

  componentWillMount() {
    if( !global.IS_SERVER_REQUEST ) {
      env.on( events.LOADING, this._onLoading );
    }
  }

  componentWillUnmount() {
    if( !global.IS_SERVER_REQUEST ) {
      env.removeListener( events.LOADING, this._onLoading );
    }
  }

  _onLoading(loading) {
    this.setState( {ajax: { loading }}, () => {
      this.onAjaxLoading && this.onAjaxLoading(loading);
    }); 
  }

};

module.exports = AjaxTracker;