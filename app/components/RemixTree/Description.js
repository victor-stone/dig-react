/*eslint "react/no-danger":0 */
/* globals $ */

import React             from 'react';
import { ModelTracker }  from '../../mixins';

const MAX_DESCRIPTION_LENGTH = 220;

var Description = React.createClass({

  mixins: [ModelTracker],

  componentDidMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    this.isMounted = true;
    $('#description-more')
      .on('show.bs.collapse', () => { $('#description-less').collapse('hide'); $('#description-more-link').text(' less...'); return true; } )
      .on('hide.bs.collapse', () => { $('#description-less').collapse('show'); $('#description-more-link').text(' more...'); return true; } );
  },

  componentWillUnmount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    this.isMounted = false;
    $('#description-more')
      .off('show.bs.collapse')
      .off('hide.bs.collapse');
  },

  stateFromStore(store) {
    var model = store.model.upload;
    var description = model.descriptionHTML;
    var html      = { __html: description };
    var plain     = '';
    var more      = '';
    if( description ) {
      if( description.length > MAX_DESCRIPTION_LENGTH ) {
        plain      = model.description.substr(0,MAX_DESCRIPTION_LENGTH);
        more       = ' more...';
      }
    }
    if( !global.IS_SERVER_REQUEST && this.isMounted ) {
      $('#description-more').collapse( plain ? 'hide' : 'show');
      $('#description-less').collapse( plain ? 'show' : 'hide');
    }
    return { html, plain, more };
  },

  render() {

    var s = this.state;

    var clsPlain = s.plain ? 'collapse in' : 'collapse';
    var clsHTML  = s.plain ? 'collapse' : 'collapse in';
    return (
      <div className="remix-tree-description" >
        <div className={clsPlain} id="description-less" >{s.plain}</div>
        <div className={clsHTML}  id="description-more" dangerouslySetInnerHTML={s.html} />
        <a id="description-more-link" data-toggle="collapse" href="#description-more">{s.more}</a>
      </div>
      );
  }

});


module.exports = Description;

//