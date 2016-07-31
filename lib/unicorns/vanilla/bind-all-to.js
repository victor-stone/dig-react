
import quickLoop from './quick-loop';

export default function bindAllTo(obj,target,...arr) {
  quickLoop( arr, f => obj[f] = target[f].bind(target) );
}

