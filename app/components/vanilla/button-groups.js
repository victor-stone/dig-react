import React         from 'react';
import { selectors,
         nextId }    from 'unicorns';
import DeadLink      from './dead-link';
import Glyph         from './glyph';


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


/*
  {
    icon,
    text,
    onClick, <-- implies btn
    className,
    btnType,
  }

  Order of priority:
    children -> button -> icon -> text
*/
class _BtnGroup extends React.Component 
{
  constructor() {
    super(...arguments);
    this.id = this.props.id || nextId('_ida_');
  }
  
  render() {
    let { addons, className } = this.props;

    !Array.isArray(addons) && (addons = [addons]);

    const cls = this._selectors(addons,className);
    
    const content = addons.map( ({ icon, text, btnType = 'default', onClick }, key ) => {
    
        const btnClass = onClick && selectors('btn', btnType ? 'btn-' + btnType : '' );

        return  (onClick
                  ? <DeadLink key={key} onClick={onClick} className={btnClass} icon={icon} text={text} />
                  : icon
                      ? <Glyph key={key} icon={icon} />
                      : <span key={key}>{text}</span>);
    });

    return <span className={cls}>{content}</span>;
  }
}

class InputGroupAddon extends _BtnGroup
{
  componentDidMount() {
    if( this.props.onClick && this.props.icon && 0 ) {
      fixGlyphAlignment(this.id);
    }
  }

  _selectors(addons,className) {
    const hasButtons = !!addons.find( p => !!p.onClick );

    return selectors( hasButtons ? 'input-group-btn' : 'input-group-addon', className );
  }
}

class ButtonGroup extends _BtnGroup
{
  _selectors(addons,className) {
    return selectors('btn-group', className);
  }
}

const InputAddOnSpec = React.PropTypes.oneOfType([

  // button
  React.PropTypes.shape(
  {
    icon: React.PropTypes.string,
    text: React.PropTypes.string,
    btnType: React.PropTypes.oneOf(['default', 'success', 'danger', 'warning']),
    onClick: React.PropTypes.func,
    className: React.PropTypes.string
  }),

  // glyph only
  React.PropTypes.shape(
  {
    icon: React.PropTypes.string,                                        
    className: React.PropTypes.string
  }),

  // label
  React.PropTypes.shape(
  {
    text: React.PropTypes.string,                                        
    className: React.PropTypes.string
  })

]);

const FieldAdornment = React.PropTypes.oneOfType([
                          InputAddOnSpec,
                          React.PropTypes.arrayOf(InputAddOnSpec)
                         ]);

_BtnGroup.propTypes = {
  addons: FieldAdornment
};

module.exports = {
  InputGroupAddon,
  ButtonGroup,
  FieldAdornment
};

//