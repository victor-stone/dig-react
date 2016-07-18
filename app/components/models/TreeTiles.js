import React     from 'react';
import css       from './style/tiles';
import TreeTile  from './TreeTile';
import InlineCSS from '../vanilla/InlineCSS';

class TreeTiles extends React.Component
{

  render() {
    const { model } = this.props;
    return (
      <div className="tiles">
        <InlineCSS css={css} id="tiles-css"/>
        <ul className="play-list">
          {model.map( m => <TreeTile key={m.id} {...this.props} model={m} />)}
        </ul>
      </div>
    );
  }
}


module.exports = TreeTiles;

//
