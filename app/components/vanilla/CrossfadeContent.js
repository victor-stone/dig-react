import React    from 'react';
import { nextID } from '../../unicorns';


const DEFAULT_FADE_DURATION = 250;

class CrossfadeContent extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { elem: this.props.elem };
    this.id = nextID('fade-group-');
  }

  componentWillReceiveProps(nextProps) {
    if( this.props.elemName !== nextProps.elemName ) {
      this.toggleShow(nextProps.elem);
    }
  }

  toggleShow(elem) {
    var duration = this.props.duration || DEFAULT_FADE_DURATION;
    /* globals $ */
    var $e = $('#' + this.id);
    $e.fadeOut(duration, () => {
      this.setState({elem}, () => { $e.fadeIn(duration); $(`#${this.id} button`).blur(); } );
    });
  }

  render() {
    return (<div id={this.id}>{this.state.elem}</div>);
  }
}

module.exports = CrossfadeContent;

//