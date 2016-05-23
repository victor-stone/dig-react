/* globals $*/
import React      from 'react';
import Glyph      from './Glyph';
import LoadingGlyph from './LoadingGlyph';
import { DeadLink } from './ActionButtons';

var AccordianButton = React.createClass({

  getInitialState() {
    return { open: this.props.open };
  },

  componentDidMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }

    this.setUpEvents();
  },

  setUpEvents() {
    $('#' + this.props.id)
      .on('show.bs.collapse', this._doOpen )
      .on('hide.bs.collapse', this._doClose );
  },

  _doOpen() {
    this.setState( { open: true } );
    if( this.props.onOpen ) {
      this.props.onOpen();
    }
  },

  _doClose() {
    this.setState( { open: false } ); 
    if( this.props.onClose ) {
      this.props.onClose();
    }
  },

  render() {
    var style = { float: 'right', display: 'block' };
    var icon  = this.state.open ? 'caret-down' : 'caret-up';

    return(
        <a style={style} data-toggle="collapse" data-parent="#accordion" href={'#' + this.props.id}>
          <Glyph icon={icon} />
        </a>
      );
  }
});

class AccordianPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: this.props.disabled
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState( { disabled: nextProps.disabled } );
  }

  render() {
    var clsIn = !this.state.diabled && this.props.open ? ' in' : '';
    var id = this.props.id;
    var clsChild = (this.props.className || '') + ' panel-body';    
    var p = this.props;
    var btn = this.state.disabled ? null : <AccordianButton id={id}  open={p.open} onClose={p.onClose} onOpen={p.onOpen} />;

    return (
      <div className="panel panel-default">
        <div className="panel-heading" id={id + '_heading'}>
            <h4 className="panel-title">
              {btn}
              <Glyph icon={p.icon} />
              <span className="heading_spacer">{" "}</span>
              {this.state.disabled 
                ? <DeadLink>{p.title}</DeadLink>
                : <a data-toggle="collapse" data-parent="#accordion" href={'#' + id}>{p.title}</a>
              }
            </h4>
         </div>
        <div id={id} className={'panel-collapse collapse' + clsIn} >
          <div className={clsChild}>
            {p.children}
          </div>
        </div>
      </div>   
      );
  }
}

class LazyAccordianPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      model: null,
      beenOpened: false,
      open: false,
      hasItems: props.numItems > 0 
    };
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    var hasItems = nextProps.numItems > 1;
    if( this.state.open && hasItems ) {
      this.getModel(nextProps).then( model => this.setState( { model, hasItems }) );
    } else {
      this.setState( { model: null, beenOpened: false, hasItems } );
    }
  }

  // override this
  getModel() {
    return { then: function() {} };
  }

  onOpen() {
    if( this.state.beenOpened ) {
      this.setState( { open: true } );
    } else {
      this.getModel(this.props).then( model => this.setState( { model, open: true, beenOpened: true }) );
    } 
  }

  onClose() {
    this.setState( {open: false} );
  }

  render() {
    var chidz = this.state.open && this.state.model ? this.renderChildren(this.state.model) : null;
    return (
      <AccordianPanel disabled={!this.state.hasItems} title={this.title} id={this.id} icon={this.icon} onOpen={this.onOpen} onClose={this.onClose} >
        {this.state.open ? <LoadingGlyph x4 /> : null}
        {chidz}
      </AccordianPanel>
      );
  }
}

var Accordian = React.createClass({
  render() {
    return (
      <div id="accordion" className="panel-group">
        {this.props.children}
      </div>
    );
    }
});

module.exports = {
  AccordianPanel,
  LazyAccordianPanel,
  Accordian
};

//