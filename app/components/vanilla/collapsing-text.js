/*eslint "react/no-danger":0 */
/* globals $ */

import React          from 'react';
import MoreOrLessLink from './more-or-less-link';
import { nextID }     from '../../unicorns';

const MAX_PREVIEW_LENGTH = 220;

var CollapsingText = React.createClass({

  getDefaultProps() {
    return { id: nextID('_collapsing_text_') };
  },

  getInitialState() {
    return this.stateFromHTML(this.props.html);
  },

  componentDidMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    var toggleText = function (cmd) {
      $('#' + this.props.id + '-collapse-text-less').collapse(cmd);
    }.bind(this);

    this.isMounted = true;
    $('#' + this.props.id + '-collapse-text-more')
      .on('show.bs.collapse', () => {  toggleText('hide'); return true; } )
      .on('hide.bs.collapse', () => {  toggleText('show'); return true; } );
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
    var hideMoreButton  = true;
    if( html ) {
      if( plain.length > MAX_PREVIEW_LENGTH ) {
        plain = plain.substring(0,MAX_PREVIEW_LENGTH) + '...';
        hideMoreButton = false;
      } else {
        plain = '';
      }
    }
    if( !global.IS_SERVER_REQUEST && this.isMounted ) {
      $('#' + this.props.id + '-collapse-text-more').collapse( plain ? 'hide' : 'show');
      $('#' + this.props.id + '-collapse-text-less').collapse( plain ? 'show' : 'hide');
    }
    html = { __html: html };
    return { html, plain, hideMoreButton };
  },

  _htmlToPlain(html) {
    // TODO: doesn't this hurt SEO??
    if( global.IS_SERVER_REQUEST ) {
      return '';
    }
    var div = document.createElement('DIV');
    div.innerHTML = html;
    return div.textContent || div.innerText;
  },

  render() {

    const { id } = this.props;
    const { plain, html, hideMoreButton } = this.state;

    var clsPlain = 'plain collapse'    + (plain ? ' in' : '');
    var clsHTML  = 'htmltext collapse' + (plain ? '' : ' in');
    return (
      <div className="collapse-text" >
        <div className={clsPlain} id={id + '-collapse-text-less'} >{plain}</div>
        <div className={clsHTML}  id={id + '-collapse-text-more'} dangerouslySetInnerHTML={html} />
        <MoreOrLessLink targetId={this.props.id + '-collapse-text-more'} hidden={hideMoreButton} />
      </div>
      );
  }

});


module.exports = CollapsingText;

//