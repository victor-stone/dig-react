import React       from 'react';
import Glyph       from './Glyph';
import pagingStats from './PagingStats';

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
    var s    = pagingStats(this.prop.stats);
    var cls  = 'paging' + (s.total > 0 ? '' : ' hidden');
    var cls2 = 'pagination' + (s.shouldShow ? '' : ' hidden');
    return(
      <div className={cls}>
        <ul className={cls2}>  
          <PagerLink newOffset={props.onNewOffset} offset="0"            show={s.showFirst} icon="angle-double-left" />
          <PagerLink newOffset={props.onNewOffset} offset={s.prevValue}  show={s.showPrev}  icon="arrow-left" />
          <PagerLink newOffset={props.onNewOffset} offset={s.nextValue}  show={s.showNext}  icon="arrow-right" />
          <PagerLink newOffset={props.onNewOffset} offset={s.lastPage}   show={s.showLast}  icon="angle-double-right" />
        </ul>
        <div className="paging-caption center-text">{s.printableOffset + ' - ' + s.printableLastValue + ' of ' + s.printableTotal}</div>
        {props.children}
      </div>
      );
}

module.exports = Paging;


