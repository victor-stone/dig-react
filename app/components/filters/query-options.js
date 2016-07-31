import React     from 'react';

import { CloseButton,
         DeadLink,
         InlineCss,
         Glyph }          from '../vanilla';

import { ModelTracker }   from '../../mixins';

import { selectors }      from 'unicorns';

import css                from './style/query-options';

import ResetOptionsButton from './reset';

class OptionsWrap extends React.Component
{
  render() {
    return <ul className="query-options-elements">{this.props.children}</ul>;
  }
}

class QueryFiltersButton extends React.Component
{
  render() {

    const {
      dirty,
      onShowOptions
    } = this.props;

    const buttonColor = dirty ? { color: 'yellow' } : {};

    return <DeadLink className="btn btn-primary" style={buttonColor} onClick={onShowOptions} icon="gear" text="filter" />;

  }

}

class QueryOptionsBox extends React.Component
{
  render() {

    const {
      handleShowOptions,
      children,
      store,
      show
    } = this.props;

    const cls  = selectors( 'query-options', show ? 'open' : 'hidden' );

    return (
        <ul className={cls}>
          <li className="btn-primary title" onClick={handleShowOptions} >
            <Glyph icon="gear" />{" filters"}
            {handleShowOptions && <CloseButton onClick={handleShowOptions} />}
          </li>
          <li>{children}</li>
          <li><ResetOptionsButton store={store} /></li>
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
    
    const { showOptions } = this.state;

    this.setState( { showOptions: !showOptions } );
  }

  stateFromStore(store) {
    var dirty = store.supportsOptions && store.paramsDirty();
    return { dirty };
  }

  render() {

    const { 
      floating, 
      store 
    } = this.props;

    if( !store.supportsOptions ) {
      return null;
    }
    
    const { 
      showOptions = false, 
      dirty 
    } = this.state;

    const cls = selectors('hidden-xs hidden-sm query-options-box',
                           showOptions ? 'open'     : '',
                           floating    ? 'floating' : '');

    return (
      <div className={cls}>
        <InlineCss css={css} id="query-options-css" />
        <QueryOptionsBox show={showOptions} store={store} handleShowOptions={this.onShowOptions}>
          {this.props.children}
        </QueryOptionsBox>
        {showOptions && <QueryFiltersButton dirty={dirty} onShowOptions={this.onShowOptions} />}
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
