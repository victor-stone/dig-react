import React     from 'react';
import css       from './style/tiles';
import TreeTile  from './tree-tile';
import InlineCss from '../vanilla/inline-css';

class TreeTiles extends React.Component
{

  render() {
    const { model } = this.props;
    return (
      <div className="tiles">
        <InlineCss css={css} id="tiles-css"/>
        <ul className="play-list">
          {model.map( m => <TreeTile key={m.id} {...this.props} model={m} />)}
        </ul>
      </div>
    );
  }
}


module.exports = TreeTiles;

//
