import React         from 'react';
import { selectors } from '../../unicorns';
import Field         from './FormField';

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

    const cls = selectors( 'form-control', className );

    return <span className={cls}>{value}{children}</span>;
  }
}

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
  StaticControl,
  StaticField,
  StaticFormGroup
};

//