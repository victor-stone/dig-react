/* globals $ */
import React          from 'react';
import MoreOrLessLink from './MoreOrLessLink';

const DEFAULT_MAX_SHOW = 3;

class CollapsingList extends React.Component
{
  constructor() {
    super(...arguments);
    this.state = { showLess: 'less' };
    this.id = 'collapsing-list-' + Math.random();
    this.__bindAll(['showLess', 'showMore', 'listElement' ]);
  }

  componentDidMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    $('#' + this.id)
      .on('show.bs.collapse', this.showLess )
      .on('hide.bs.collapse', this.showMore  );
  }

  componentWillUnmount() {
    $('#' + this.id)
      .off('show.bs.collapse', this.showLess )
      .off('hide.bs.collapse', this.showMore  );
  }

  showMore() {
    this.showMoreOrLess('more');
  }

  showLess() {
    this.showMoreOrLess('less');
  }

  showMoreOrLess(moreOrLess) {
    this.setState({
      showLess: moreOrLess === 'less',
    });
  }

  listElement(model,key) {
    return <li key={key}>{"dervied class didn't implement listElement"}</li>;
  }

  render() {
    var model    = this.props.model;
    var max      = this.props.max || DEFAULT_MAX_SHOW;
    var head     = model.slice(0,max); 
    var tail     = this.state.showLess === 'more' ? model.slice(max-1) : [];
    var showLink = model.length > max;
    return (
          <div className={this.props.className}>
            <ul className="collapse-list-head">
              {head.map( this.listElement )}
            </ul>
            <ul className="collapse-list-head collapse" id={'tail_' + this.id}>
              {tail.map( this.listElement )}
            </ul>
            {showLink && <MoreOrLessLink targetId={'tail_' + this.id} less={this.state.showLess} />}
        </div>
      );
  }
}

module.exports = CollapsingList;


//