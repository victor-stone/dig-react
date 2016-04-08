/*eslint "react/no-danger":0 */
/* globals $ */

import React from 'react';

var next_id = 0;

const MAX_PREVIEW_LENGTH = 220;

var CollapsingText = React.createClass({

  getDefaultProps() {
    return { id: ++next_id };
  },

  getInitialState() {
    return this.stateFromHTML(this.props.html);
  },

  componentDidMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    this.isMounted = true;
    $('#' + this.props.id + '-collapse-text-more')
      .on('show.bs.collapse', () => { $('#' + this.props.id + '-collapse-text-less').collapse('hide'); $('#' + this.props.id + '-collapse-text-more-link').text(' less...'); return true; } )
      .on('hide.bs.collapse', () => { $('#' + this.props.id + '-collapse-text-less').collapse('show'); $('#' + this.props.id + '-collapse-text-more-link').text(' more...'); return true; } );
  },

  componentWillReceiveProps(nextProps) {
    if( this.props.html !== nextProps.html ) {
      this.setState( this.stateFromHTML(nextProps.html) );
    }
  },

  componentWillUnmount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    this.isMounted = false;
    $('#' + this.props.id + '-collapse-text-more')
      .off('show.bs.collapse')
      .off('hide.bs.collapse');
  },

  stateFromHTML(html) {
    var plain = this._htmlToPlain(html);
    var more  = '';
    if( html ) {
      if( plain.length > MAX_PREVIEW_LENGTH ) {
        plain = plain.substring(0,MAX_PREVIEW_LENGTH) + '...';
        more = ' more...';
      } else {
        plain = '';
      }
    }
    if( !global.IS_SERVER_REQUEST && this.isMounted ) {
      $('#' + this.props.id + '-collapse-text-more').collapse( plain ? 'hide' : 'show');
      $('#' + this.props.id + '-collapse-text-less').collapse( plain ? 'show' : 'hide');
    }
    html = { __html: html };
    return { html, plain, more };
  },

  _htmlToPlain(html) {
    if( global.IS_SERVER_REQUEST ) {
      return '';
    }
    var div = document.createElement('DIV');
    div.innerHTML = html;
    return div.textContent || div.innerText;
  },

  render() {

    var s = this.state;

    var clsPlain = 'plain collapse'    + (s.plain ? ' in' : '');
    var clsHTML  = 'htmltext collapse' + (s.plain ? '' : ' in');
    return (
      <div className="collapse-text" >
        <div className={clsPlain} id={this.props.id + '-collapse-text-less'} >{s.plain}</div>
        <div className={clsHTML}  id={this.props.id + '-collapse-text-more'} dangerouslySetInnerHTML={s.html} />
        <a id={this.props.id + '-collapse-text-more-link'} className="collapse-text-more-link" data-toggle="collapse" href={'#' + this.props.id + '-collapse-text-more'}>{s.more}</a>
      </div>
      );
  }

});


module.exports = CollapsingText;

//