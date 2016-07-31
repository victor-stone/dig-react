
export default function safeSetState(_this,state) {
  if( _this.state ) {
    Object.assign(_this.state,state);
  } else {
    _this.state = state;
  }
}

