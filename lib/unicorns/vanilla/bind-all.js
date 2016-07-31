import bindAllTo from './bind-all-to';

export default function bindAll(obj,...arr) {
  bindAllTo(obj,obj,...arr);
}

