import React     from 'react';

import { CloseButton,
         InlineCss,
         Glyph }       from '../vanilla';

import { ModelTracker } from '../../mixins';

import css                from './style/query-options';

import ResetOptionsButton from './Reset';

function OptionsWrap(props) {
  return <ul className="query-options-elements">{props.children}</ul>;
}

class QueryOptionsBox extends React.Component
{
  render() {
    var cls  = 'query-options ' + (this.props.show ? 'open' : 'hidden');
    return (
        <ul className={cls}>
          <li className="btn-primary title" onClick={this.props.handleShowOptions} >
            <Glyph icon="gear" />{" filters"}
            {this.props.handleShowOptions && <CloseButton onClick={this.handleShowOptions} />}
          </li>
          <li>{this.props.children}</li>
          <li><ResetOptionsButton store={this.props.store} /></li>
        </ul>
      );
  }
}

QueryOptionsBox.defaultProps = { 
      handleShowOptions: () => false,
       show: true 
     };

function QueryOptionsPanel(props)
{
    return (
      <div className="query-options-box open">
        <QueryOptionsBox store={props.store} >
          {props.children}
        </QueryOptionsBox>
      </div>
    );
}

class QueryOptions extends ModelTracker(React.Component)
{
  constructor() {
    super(...arguments);
    this.onShowOptions = this.onShowOptions.bind(this);
  }
  
  onShowOptions(){
    var showOptions = !this.state.showOptions;
    this.setState( { showOptions } );
  }

  stateFromStore(store) {
    var dirty = store.supportsOptions && store.paramsDirty();
    return { dirty };
  }

  render() {

    if( !this.props.store.supportsOptions ) {
      return null;
    }
    
    var showP       = this.state.showOptions || false;
    var buttonColor = this.state.dirty ? { color: 'yellow' } : {};
    var cls         = 'hidden-xs hidden-sm query-options-box' + (showP ? ' open' : '' );
    var cls3        = 'btn btn-primary' + (showP ? ' hidden' : '');

    return (
      <div className={cls}>
        <InlineCss css={css} id="query-options-css" />
        <QueryOptionsBox show={showP} store={this.props.store} handleShowOptions={this.onShowOptions}>
          {this.props.children}
        </QueryOptionsBox>
        <button className={cls3} style={buttonColor} onClick={this.onShowOptions} ><Glyph icon="gear" />{" filters"}</button>
      </div>
    );
  }

}

module.exports = {
  QueryOptions,
  QueryOptionsBox,
  QueryOptionsPanel,
  OptionsWrap,
};
