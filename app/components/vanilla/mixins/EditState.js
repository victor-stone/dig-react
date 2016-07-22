import { safeSetState } from '../../../unicorns';

const EditState = baseclass => class extends baseclass
{
  constructor() {
    super(...arguments);

    safeSetState( this, { editing: false } );

    this.hasSuperShouldComponentUpdate = !!super.shouldComponentUpdate;

  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.editing !== nextState.editing
              || (super.shouldComponentUpdate && super.shouldComponentUpdate(...arguments));
  }

  _onEditState(meth,flag) {
    this.setState( {editing:flag}, () => {
      this[meth]             && this[meth]();
      this.props[meth]       && this.props[meth]();
      this.onEditState       && this.onEditState(flag);
      this.props.onEditState && this.props.onEditState(flag);
    });
  }
  
  handler(name,state = true) {
    return this._onEditState.bind(this,name,state);
  }

};


module.exports = EditState;

