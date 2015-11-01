'use strict'

class MemoryManager {

  constructor(enable,limit,gcOnCount) {
    this.hitCount  = 0;
    this.limit     = limit;
    this.gcOnCount = gcOnCount;
    this.enabled   = enable;
  }
  
  manage() {
    if( !this.enabled ) {
      return;
    } 
    var heapUsed = process.memoryUsage().heapUsed;
    console.log( 'memoryUsage: ' + Math.floor((heapUsed / (1024*1024))) + 'MB' );
    if( ++this.hitCount % this.gcOnCount === 0 || heapUsed > this.limit ) {
      console.log( "------> Doing GC");
      global.gc();
    } 
  }

}

module.exports = MemoryManager;