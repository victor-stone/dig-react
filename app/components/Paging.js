import React from 'react';
import Link from './Link';
import Glyph from './Glyph';

import pagingStats from '../unicorns/pagingStats';

const Pager = React.createClass({

  render: function() {
    var href = '?offset=' + this.props.offset;
    var icon = this.props.icon;

    if( this.props.show ) {
      return (
          <li>
            <Link href={href}><Glyph x2 icon={icon} /></Link>
          </li>
        );
    } else {
      return (
          <li className="disabled">
            <a href><Glyph x2 icon={icon} /></a>
          </li>
        );
   }
  },

});


const Paging = React.createClass({

  render: function() {
    var s = pagingStats(this.props);
    
    if( !s.shouldShow ) {
      return null;
    }

    return(
      <div className="paging" data-keep-above=".footer" data-keep-below=".page-header">
        <ul className="pagination">  
          <Pager offset="0"            show={s.showFirst} icon="angle-double-left" />
          <Pager offset={s.prevValue}  show={s.showPrev}  icon="arrow-left" />
          <Pager offset={s.nextValue}  show={s.showNext}  icon="arrow-right" />
          <Pager offset={s.lastPage}   show={s.showLast}  icon="angle-double-right" />
        </ul>
        <div className="center-text">{s.printableOffset + ' - ' + s.printableLastValue + ' of ' + s.printableTotal}</div>
      </div>
      );
  },

});

module.exports = Paging;


