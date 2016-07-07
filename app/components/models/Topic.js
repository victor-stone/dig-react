/*eslint "react/no-danger":0 */
import React         from 'react';
import { selectors } from '../../unicorns';

const Topic = React.createClass({

  render: function() {
    const { model:{html}, className } = this.props;

    const cls = selectors( 'topic-body', className );

    return (
          <div className={cls} dangerouslySetInnerHTML={{ __html: html}} />
      );
  }

});


module.exports = Topic;
