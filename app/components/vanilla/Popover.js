/* globals $ */
import ReactDOM from 'react-dom';

const PopoverMixin = target => class extends target {

  constructor() {
    super(...arguments);
  }

  _popoverContent() {
    // this gets called a bunch of times from the popover plugin
    if( !this.DOMContainer ) {
      this.DOMContainer = document.createElement('div');
      this.DOMContainer.style.display = 'none';
      document.body.appendChild(this.DOMContainer);            
    }
    if( !this.DOMContainer.innerHTML ) {
      var el = this.popoverContent;
      this.node = ReactDOM.unstable_renderSubtreeIntoContainer(this,el,this.DOMContainer);
    }
    return this.DOMContainer.innerHTML;
  }

  showPopover() {
    var $e = $(ReactDOM.findDOMNode(this));
    $e.popover({
        content: this._popoverContent.bind(this),
        animation: this.props.animation,
        placement: 'auto',
        title: this.title || this.props.title,
        trigger: 'hover',
        html: true
    }).popover('show');
  }
 
  get hasPopover() {
    var $e = $(ReactDOM.findDOMNode(this));
    return !!$e.data('bs.popover');
  }

  componentWillUnmount() {
    this.unmountNode();
    this.unmountContainer();
  }

  unmountContainer() {
    this.DOMContainer && document.body.removeChild(this.DOMContainer);
    this.DOMContainer = null;
  }

  unmountNode() {
    this.DOMContainer && ReactDOM.unmountComponentAtNode(this.DOMContainer);
    this.node = null;
  }
};

module.exports = PopoverMixin;