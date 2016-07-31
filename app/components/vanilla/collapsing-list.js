import React          from 'react';
import MoreOrLessLink from './more-or-less-link';
import InlineCss      from './inline-css';
import { bindAll,
         nextId }    from 'unicorns';

const css = `
.collapse-list-head {
  margin-bottom: 0px;
}
.collapse-list-tail {
  margin-top: 0px;
}
`;

const DEFAULT_MAX_SHOW = 3;

class CollapsingList extends React.Component
{
  constructor() {
    super(...arguments);
    this.id = nextId('collapsing-list-');
    bindAll(this, 'listElement' );
  }

  listElement(model,key) {
    return <li key={key}>{"dervied class didn't implement listElement"}</li>;
  }

  render() {
    var model    = this.props.model;
    var max      = this.props.max || DEFAULT_MAX_SHOW;
    var head     = model.slice(0,max); 
    var tail     = model.slice(max-1); // this.state.showLess === 'more' ? model.slice(max-1) : [];
    var showLink = model.length > max;
    var id       = 'tail_' + this.id;

    return (
          <div className={this.props.className} data-parent={'#'+id}>
            <InlineCss css={css} id="collapse-list-css" />
            <ul className="collapse-list-head">
              {head.map( this.listElement )}
            </ul>
            <ul className="collapse-list-tail collapse" id={id}>
              {tail.map( this.listElement )}
            </ul>
            {showLink && <MoreOrLessLink targetId={id} />}
        </div>
      );
  }
}

module.exports = CollapsingList;


//