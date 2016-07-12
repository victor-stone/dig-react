import React from 'react';
import Glyph from './Glyph';

import { selectors } from '../../unicorns';

var MoreOrLessLink = React.createClass({
  getInitialState() {
    return { showLess: false };
  },

  componentDidMount() {
    /* globals $ */
    $('#'+this.props.targetId)
      .on('show.bs.collapse', () => this.fooler(true)  )
      .on('hide.bs.collapse', () => this.fooler(false) );
  },

  componentWillUnmount() {
    $('#'+this.props.targetId)
      .off('show.bs.collapse' )
      .off('hide.bs.collapse' );
  },

  fooler(showLess) {
    this.setState({showLess});
  },

  render() {
    const icon = this.state.showLess ? 'chevron-left' : 'chevron-right';
    const { targetId, hidden } = this.props;
    const id = '#' + targetId;
    const cls = selectors('more-or-less-link', hidden ? 'hidden' : '' );
    return (
        <a className={cls} data-toggle="collapse" href={id}><Glyph icon={icon} /><Glyph icon={icon} /><Glyph icon={icon} /></a>
      );
  }

});


module.exports = MoreOrLessLink;

//