/* globals $ */
import ReactDOM from 'react-dom';

const PopoverMixin = target => class extends target {

  constructor() {
    super(...arguments);
  }

  popupContent() {
    if( !this.DOMContainer ) {
      this.DOMContainer = document.createElement('div');
      this.DOMContainer.style.display = 'none';
      document.body.appendChild(this.DOMContainer);            
    }
    var el  = this.popupContent || this.props.elem;
    this.node = ReactDOM.unstable_renderSubtreeIntoContainer(this,el,this.DOMContainer);
    return this.DOMContainer.innerHTML;
  }

  componentDidMount() {
    var $e = $(ReactDOM.findDOMNode(this));
    $e.popover({
        content: this.popupContent.bind(this),
        animation: this.props.animation,
        placement: 'auto',
        title: this.title || this.props.title,
        trigger: 'click',
        html: true,
    });
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
    ReactDOM.unmountComponentAtNode(this.DOMContainer);
    this.node = null;
  }
};

module.exports = PopoverMixin;