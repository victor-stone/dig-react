import React         from 'react';
import { selectors,
         nextID }    from '../../unicorns';
import DeadLink      from './DeadLink';
import Glyph         from './Glyph';

class FormType extends React.Component
{
  get content() {
    return null;
  }

  render() {
    const { className, children } = this.props;
    const cls = selectors( this.bsSelector, className );
    return <div {...this.props} className={cls}>{this.content}{children}</div>;
  }
}

class FormGroup extends FormType
{
  get bsSelector() {
    return 'form-group';
  }
}

class HorizontalForm extends FormGroup
{
  get bsSelector() {
    return 'form-horizontal';
  }
}


class ControlLabel extends React.Component
{
  render() {

    const { nameFor, text, className, children } = this.props;

    const cls = selectors( 'control-label', className );

    return(<label htmlFor={nameFor} className={cls}>{text}{children}</label>);
  }
}

class FormControl extends React.Component
{
  render() {

    const { className, children, value } = this.props;

    const cls = selectors( FormControl.className, className );

    return <span className={cls}>{value}{children}</span>;
  }
}

FormControl.className = 'form-control';

class StaticControl extends React.Component
{
  render() {

    const { className, children, value } = this.props;

    const cls = selectors( 'form-control-static', className );

    return <p className={cls}>{value}{children}</p>;
  }
}

class StaticFormGroup extends React.Component
{
  render() {
    const { className, title, children } = this.props;

    return (
        <FormGroup className={className}>
          <ControlLabel text={title} />
          <StaticControl>{children}</StaticControl>
        </FormGroup>
      );
  }
}

class InputGroup extends FormType 
{
  get bsSelector() {
    const { sz = 'sm' } = this.props;

    return selectors( 'input-group', sz ? 'input-group-' + sz : '' );
  }
}

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
class InputGroupAddon extends React.Component 
{
  constructor() {
    super(...arguments);
    this.id = this.props.id || nextID('_ida_');
  }

  componentDidMount() {
    if( this.props.onClick && this.props.icon && 0 ) {
      fixGlyphAlignment(this.id);
    }
  }

  render() {
    const { icon, 
            text, 
            onClick, 
            className, 
            btnType = 'default',
            children } = this.props;

    const cls = selectors( onClick ? 'input-group-btn' : 'input-group-addon', className );

    const btnClass = selectors('btn', btnType ? 'btn-' + btnType : '' );

    const content = children ||
                      (onClick
                        ? <DeadLink onClick={onClick} className={btnClass} icon={icon} text={text} />
                        : icon
                            ? <Glyph icon={icon} />
                            : text);

    return <span {...this.props} className={cls}>{content}</span>;
  }
}


class Field extends React.Component
{
  get control() {
    return null;
  }

  render() {
    let { sz, prefix, postfix, className, children, title } = this.props;

    if( title ) {
      prefix = [ {text:title} ];
    } else {
      prefix && !Array.isArray(prefix) && (prefix = [prefix]);
    }
    
    postfix && !Array.isArray(postfix) && (postfix = [postfix]);

    const mapAddOns = (P,i) => P && (typeof P === 'function' ? <P key={i}/> : <InputGroupAddon {...P} key={i} />);

    return (
      <InputGroup sz={sz} className={className} >
        {prefix && prefix.map( mapAddOns )}
        {this.control}{children}
        {postfix && postfix.map( mapAddOns )}
      </InputGroup>
      );
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

Field.propTypes = {

  prefix: FieldAdornment,
  postfix: FieldAdornment,

  // if you send a 'title' then 'prefix' is ignored
  title: React.PropTypes.string, 

  sz: React.PropTypes.oneOf(['sm', 'md', 'lg']),
                                       
};

class StaticField extends React.Component
{
  render() {
    const { title, text, children } = this.props;
    
    return (<Field prefix={{text:title}}>
              <span className="form-control">
                {text}{children}
              </span>
            </Field>);
  }
}

module.exports = {
  HorizontalForm,
  ControlLabel,
  FormControl,
  FormGroup,
  Field,
  InputGroup,
  InputGroupAddon,
  StaticControl,
  StaticField,
  StaticFormGroup
};

//