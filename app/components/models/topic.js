/*eslint "react/no-danger":0 */
import React         from 'react';
import Link          from '../services/link-to-route';
import { selectors } from '../../unicorns';

var topicBodyID = 0;
const linkPrefix = /^https?:\/\//;

class Topic extends React.Component
{
  constructor() {
    super(...arguments);
    this.id = 'topic_body_' + (++topicBodyID);
  }
  componentDidMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    /* globals $ */
    $('#' + this.id + ' a').click( function(event) {
      const href = $(this).attr('href'); // this.href is full URL
      if( !linkPrefix.test(href) ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        Link.navigateTo(href);
      } else {
        $(this).attr('target','_blank');
      }
    });
  }

  componentWillUnmount() {
    $('#' + this.id + ' a').off('click');
  }

  render() {
    const { model:{html}, className } = this.props;

    const cls = selectors( 'topic-body', className );

    return (
          <div id={this.id} className={cls} dangerouslySetInnerHTML={{ __html: html}} />
      );
  }

}


module.exports = Topic;
