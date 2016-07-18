import React     from 'react';

import { CloseButton,
         InlineCSS,
         Glyph }          from '../vanilla';

import { ModelTracker }   from '../../mixins';

import { selectors }      from '../../unicorns';

import css                from './style/query-options';

import ResetOptionsButton from './Reset';

class OptionsWrap extends React.Component
{
  render() {
    return <ul className="query-options-elements">{this.props.children}</ul>;
  }
}

class QueryOptionsBox extends React.Component
{
  render() {
    var cls  = selectors('query-options',(this.props.show ? 'open' : 'hidden'));
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

    const { floating, store } = this.props;

    if( !store.supportsOptions ) {
      return null;
    }
    
    const { showOptions = false, dirty } = this.state;

    const buttonColor = dirty ? { color: 'yellow' } : {};
    const cls         = selectors('hidden-xs hidden-sm query-options-box',showOptions ? 'open' : '',floating ? 'floating' : '');
    const cls3        = selectors('btn btn-primary', showOptions ? ' hidden' : '');

    return (
      <div className={cls}>
        <InlineCSS css={css} id="query-options-css" />
        <QueryOptionsBox show={showOptions} store={store} handleShowOptions={this.onShowOptions}>
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
  QueryOptionsCSS: css
};
