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

  componenWillUnmount() {

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
      disabled: this.props.disabled,
      open: false
    };
    this.onOpen = this.onOpen.bind(this);
    this.onClose =this.onClose.bind(this);
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
    var clsIn = !this.state.diabled && this.props.open ? ' in' : '';
    var clsChild = (this.props.className || '') + ' panel-body';    
    var p = this.props;
    var id = p.id;
    var btn = this.state.disabled ? null : <AccordianButton id={id} open={p.open} onClose={this.onClose} onOpen={this.onOpen} />;

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
              {p.headerContent}
            </h4>
         </div>
        <div id={id} className={'panel-collapse collapse' + clsIn} > 
          <LoadingGlyph />
          {this.state.open 
            ? <div className={clsChild}>{p.children}</div>
            : null
          }
        </div>
      </div>   
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
  Accordian
};

//