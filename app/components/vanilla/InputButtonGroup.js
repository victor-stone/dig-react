import React from 'react';

function fixGlyphAlignment() {
  // the glyphs in button groups on are not middled 
  // we have to set the line height of the <i> tag
  // to be same as their parents' height to align them
  // vertically

  /* globals $ */
  let height = $('.input-group-btn').height();
  height = $('.input-group-btn .btn').css({height:height+'px'}).height();
  $('.input-group-btn .btn i.fa').css({lineHeight:height+'px'});
}

class InputButtonGroup extends React.Component 
{
  componentDidMount() {
    fixGlyphAlignment();
  }
  
  render() {
    return <span className="input-group-btn">{this.props.children}</span>;
  }
}

module.exports = InputButtonGroup;