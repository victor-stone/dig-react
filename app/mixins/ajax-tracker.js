import ajaxAdapter from '../services/query-ajax-adapter';
import events      from '../models/events';

const AjaxTracker = {

  getInitialState: function() {
    return { ajax: { loading: false } };
  },

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      ajaxAdapter.on( events.LOADING, this._onLoading );
    }
  },

  componentWillUnmount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      ajaxAdapter.removeListener( events.LOADING, this._onLoading );
    }
  },

  _onLoading(loading) {
    this.setState( {ajax: { loading }}, () => {
      this.onAjaxLoading && this.onAjaxLoading(loading);
    } ); 
  },

};

module.exports = AjaxTracker;