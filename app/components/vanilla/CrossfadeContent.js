import React    from 'react';

const DEFAULT_FADE_DURATION = 250;

var nextID = 0;

class CrossFadeContent extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { elem: this.props.elem };
    this.id = 'fade-group-'+ ++nextID;
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
    var Section = this.state.elem;
    return <div id={this.id}><Section /></div>;
  }
}

module.exports = CrossFadeContent;

//