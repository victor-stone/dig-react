
const DisplayOnlyMixin = target => class extends target {

  constructor() {
    super(...arguments);
    this.onValueChange = this.onValueChange.bind(this);
    this.filter = this.props.store.addOrGetFilter(this.filterComponent);
    this.state = { value: this.filter.value };
    this.filter.onChange( this.onValueChange );
  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.value !== nextState.value;
  }
  
  onValueChange(filter) {
    this.setState( { value: filter.value } );
  }
};

module.exports = DisplayOnlyMixin;

