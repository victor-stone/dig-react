import React       from 'react';
import pagingStats from './paging-stats';
import DeadLink    from './dead-link';

// TODO: don't assume that ?offset= is the proper URL formation

class PagerLink extends React.Component
{
  constructor() {
    super(...arguments);

    this.state = this._stateFromProps( this.props );

    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState( this._stateFromProps(newProps) );
  }

  _stateFromProps(props) {

    const { show, offset } = props;

    return { href: show ? '?offset=' + offset : '#' };
  }

  onClick() {

    const { href }              = this.state;
    const { newOffset, offset } = this.props;

    // it seems this link happens
    // on phones even when disabled

    href !== '#' && newOffset(offset);

  }

  render() {

    const { href }       = this.state;
    const { icon, show } = this.props;

    var cls  = show ? '' : 'disabled';

    return <li className={cls}><DeadLink x2 icon={icon} href={href} onClick={this.onClick} /></li>;
  }

}

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


