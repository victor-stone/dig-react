import React         from 'react';

import { BoundCategoryTagBox } from '../../bound/tags';

import { Column }     from '../../vanilla/grid';

const DEFAULT_COL_SIZE = 3;

var nameMap = {
  genre: 'Genres',
  instr: 'Instrument',
  mood: 'Style'
};

const TagCategoryBox = React.createClass({

  render: function() {
    const { catID, store, colSize = DEFAULT_COL_SIZE } = this.props;

    return(
      <Column sz="sm" cols={colSize} >
        <h4 className="center-text">{nameMap[catID]}</h4>
        <BoundCategoryTagBox store={store} minCount={200} category={catID} />
      </Column>
    );
  }

});

module.exports = TagCategoryBox;
