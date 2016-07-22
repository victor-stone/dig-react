import React            from 'react';
import { selectors,
         excludeProps } from '../../unicorns';

const reservedProps = [ 'className', 'xs', 'sm', 'md', 'lg', 'model', 
                         'sz', 'cols', 'offset', 'pull', 'push', 'hidden' ];

class BootstrapBase extends React.Component
{
  constructor() {
    super(...arguments);
    this.bsSafeProps = excludeProps(this.props,reservedProps);
  }

  get selectors() {
    const { className } = this.props;
    return selectors(this.bsSelector,className);
  }

  render() {
    const { children } = this.props;
    return <div {...this.bsSafeProps} className={this.selectors} >{children}</div>;
  }
}

class Container extends BootstrapBase
{
  get bsSelector() {
    return 'container';
  }
}

class FluidContainer extends BootstrapBase
{
  get bsSelector() {
    return 'container-fluid';
  }
}

class Row extends BootstrapBase
{
  get bsSelector() {
    return 'row';
  }
}

/*

  There are 3 ways to generate a column. Note that this
  list is in the order in which the component will look
  for which method is being used. If any of these methods
  are sniffed out, no further checking is done and all 
  other methods are ignored. For example, if you use method
  (1) then all other properties not related to step (1) are
  ignored.

  1. Size properties (some combination of: 'xs', 'sm', 'md', 'lg')
     For example:

        <Column sm="10" md="5">...</Column>

      will generate: 

        <div class="col-sm-10 col-md-5">...</div>

      If you want more options you can use a hash for any size:

        const md = {cols:5,offset:2};

        <Column xs="12" md={md}>...</Column>

      which will generate:

        <div class="col-xs-12 col-md-5 col-md-offset-2">...</div>

      The valid keys for the hash are:
        
          {
            cols:  n,
            offset: n,
            pull: n,
            push: n,
            hidden: boolean
          }

      Suggested use: you have a column with a lot of rules for 
                     different sizes.

    2. The 'model' property as an array of hashes that include a 'sz'
       key to specify what size (default is 'md'). 

       For example:
  
          const model = [ { cols:9,  offset:2 }, 
                          { sz:'sm', pull:2 },
                          { sz:'xs', hidden:true } ];

          <Column model={model}>....</Column>

        Will generate a column that is hidden on phones:

          <div class="col-md-9 col-md-offset-2 hidden-xs">...</div>

        Suggested use: you have column rules that are dynamically 
                       generated based on the housing component's
                       state.

    3. The hash keys can be used directly as properties. If you
       don't specify 'sz' then 'md' is assumed.

       For example:

          <Column cols="4" offset="2">...</Column>
          <Column cols="4" >...</Column>

        Will generate:

          <div class="col-md-6 col-md-offset-2">...</div>
          <div class="col-md-6">...</div>

        Suggested use: you have very simple layout
*/
class Column extends BootstrapBase
{
  get selectors() {
    const model = this.model;
    const { className = ''} = this.props;
    const cls = [];
    if( className.length ) {
      cls.push(className);
    }
    for( const { sz = 'md', offset = 0, push = 0, pull = 0, hidden = false, cols } of model ) {
      if( hidden ) {
        cls.push('hidden-' + sz);
      }
      if( Number(cols) ) {
        cls.push('col-' + sz + '-' + cols);
      }
      if( Number(offset) ) {
        cls.push('col-' + sz + '-offset-' + offset);
      }
      if( Number(pull) ) {
        cls.push('col-' + sz + '-pull-' + pull);
      }
      if( Number(push) ) {
        cls.push('col-' + sz + '-push-' + push);
      }
    }
    return selectors(...cls);
  }  

  get model() {
    let model = [];
    [ 'xs', 'sm', 'md', 'lg' ].forEach( sz => {
      if( sz in this.props ) {        
        const val = this.props[sz];
        if( isNaN(val) ) {
          val.sz = sz;
          model.push(val);
        } else {
          model.push( {sz,cols:val} );
        }
      }
    });
    if( !model.length ) {
      ({model = [this.props]} = this.props);
    }
    return model;
  }
}

module.exports = {
  Container,
  FluidContainer,
  Row,
  Column,
};