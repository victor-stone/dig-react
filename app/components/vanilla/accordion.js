/* globals $*/
import React        from 'react';
import Glyph        from './glyph';
import DeadLink     from './dead-link';
import { bindAll,
        selectors }  from '../../unicorns';

import AjaxLoadingGlyph from '../services/ajax-loading-glyph';

class AccordionButton extends React.Component
{
  constructor() {
    super(...arguments);
    this.state = { open: this.props.open };
    bindAll( this, '_doOpen', '_doClose' );
  }

  componentDidMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }

    this.setUpEvents();
  }

  componenWillUnmount() {
    $('#' + this.props.id)
      .off('show.bs.collapse', this._doOpen )
      .off('hide.bs.collapse', this._doClose );

  }

  setUpEvents() {
    $('#' + this.props.id)
      .on('show.bs.collapse', this._doOpen )
      .on('hide.bs.collapse', this._doClose );
  }

  _doOpen() {
    this.setState( { open: true } );
    if( this.props.onOpen ) {
      this.props.onOpen();
    }
  }

  _doClose() {
    this.setState( { open: false } ); 
    if( this.props.onClose ) {
      this.props.onClose();
    }
  }

  render() {
    var style = { float: 'right', display: 'block' };
    var icon  = this.state.open ? 'caret-down' : 'caret-up';

    return(
        <a style={style} data-toggle="collapse" data-parent="#accordion" href={'#' + this.props.id}>
          <Glyph icon={icon} />
        </a>
      );
  }
}

// TODO: #accordion should be property.id

class AccordionPanel extends React.Component 
{
  constructor(props) {
    super(props);
    const { disabled, open = false } = this.props;
    this.state = { disabled, open };
    bindAll(this, 'onOpen','onClose' );
  }

  componentWillReceiveProps(nextProps) {
    this.setState( { disabled: nextProps.disabled, beenOpened: false }, () => {
      if( this.state.open && nextProps.disabled )
        { $('#'+this.props.id).collapse('hide'); }
      });
  }

  onOpen() {
    if( this.props.onOpen ) {
      this.props.onOpen();
    }
    this.setState( { open: true } );
  }

  onClose() {
    if( this.props.onClose ) {
      this.props.onClose();
    }
    this.setState( {open: false} );
  }

  render() {
    const { disabled, open } = this.state;
    const { className, id, icon, headerContent, title, children } = this.props;
    const clsChild = selectors( className, 'panel-body' );
    const cls = selectors('panel-collapse collapse',!disabled && open ? ' in' : '');

    return (
      <div className="panel panel-default">
        <div className="panel-heading" id={id + '_heading'}>
            <h4 className="panel-title">
              {!disabled && <AccordionButton id={id} open={open} onClose={this.onClose} onOpen={this.onOpen} />}
              <Glyph icon={icon} />
              <span className="heading_spacer">{" "}</span>
              {this.state.disabled 
                ? <DeadLink>{title}</DeadLink>
                : <a data-toggle="collapse" data-parent="#accordion" href={'#' + id}>{title}</a>
              }
              {headerContent}
            </h4>
         </div>
        <div id={id} className={cls} > 
          <AjaxLoadingGlyph color="black" />
          {this.state.open 
            ? <div className={clsChild}>{children}</div>
            : null
          }
        </div>
      </div>   
      );
  }
}

class Accordion extends React.Component
{
  render() {
    const { children, withExpandAll, id = 'selector' } = this.props;
    return (
      <div id={id} className="panel-group">
        {withExpandAll && <AccordionExpandAll className="expand-all" selector={`#${id} .collapse`} />}
        {children}
      </div>
    );
  }
}

class AccordionExpandAll extends React.Component
{
  constructor() {
    super(...arguments);
    this.onExpandAll = this.onExpandAll.bind(this);
    this.state = { isOpen: false };
  }

  onExpandAll() {
    /* globals $ */
    const { isOpen } = this.state;    
    const cmd = isOpen ? 'hide' : 'show';
    $(this.props.selector).collapse(cmd);
    this.setState( {isOpen: !isOpen} );
  }

  render() {
    const { isOpen } = this.state;    
    const icon = isOpen ? 'angle-double-down' : 'angle-double-up';
    const text = isOpen ? 'close all' : 'expand all';
    return <DeadLink className={this.props.className} icon={icon} text={text} onClick={this.onExpandAll} />;
  }
}

module.exports = {
  AccordionPanel,
  Accordion,
  AccordionExpandAll
};

//