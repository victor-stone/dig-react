
class API
{
  constructor(transport) {
   this.transport = transport;
  }

  call() {
    return this.transport._call(...arguments);
  }

  on() {
    this.transport.on(...arguments);
  }

  once() {
    this.transport.once(...arguments);
  }
  
  emit() {
    this.transport.emit(...arguments);
  }

  removeListener() {
    this.transport.removeListener(...arguments);
  }
}


module.exports = API;