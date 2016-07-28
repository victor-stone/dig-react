import React       from 'react';
import Glyph       from './glyph';
import pagingStats from './paging-stats';

// TODO: don't assume that ?offset= is the proper URL formation

class PagerLink extends React.Component
{
  constructor() {
    super(...arguments);
    var href = this.props.show ? '?offset=' + this.props.offset : '#';
    this.state = {href};
    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    var href = newProps.show ? '?offset=' + newProps.offset : '#';
    this.setState( { href } );
  }

  onClick(e) {
    e.preventDefault();
    e.stopPropagation();

    // it seems this link happens
    // on phones even when disabled

    if( this.state.href !== '#') {
      this.props.newOffset(this.props.offset);
    }
  }

  render() {
    var icon = this.props.icon;
    var cls  = this.props.show ? '' : 'disabled';
    var href = this.state.href;

    return (<li className={cls}>
              <a href={href} onClick={this.onClick}><Glyph x2 icon={icon} /></a>
            </li>);
  }

}

/*
    stats - a property like this:
      {
        offset: model.queryParams.offset,
        limit:  model.queryParams.limit,
        length: model.items.length,
        total:  model.total      
      }
*/
function Paging(props)
{
    const { total, shouldShow, showFirst, showPrev, showNext, showLast,
            prevValue, nextValue, lastPage, printableOffset,
            printableLastValue, printableTotal } = pagingStats(props.stats);

    const cls  = 'paging' + (total > 0 ? '' : ' hidden');
    const cls2 = 'pagination' + (shouldShow ? '' : ' hidden');
    return(
      <div className={cls}>
        <ul className={cls2}>  
          <PagerLink newOffset={props.onNewOffset} offset="0"          show={showFirst} icon="angle-double-left" />
          <PagerLink newOffset={props.onNewOffset} offset={prevValue}  show={showPrev}  icon="arrow-left" />
          <PagerLink newOffset={props.onNewOffset} offset={nextValue}  show={showNext}  icon="arrow-right" />
          <PagerLink newOffset={props.onNewOffset} offset={lastPage}   show={showLast}  icon="angle-double-right" />
        </ul>
        <div className="paging-caption center-text">{printableOffset + ' - ' + printableLastValue + ' of ' + printableTotal}</div>
        {props.children}
      </div>
      );
}

module.exports = Paging;


