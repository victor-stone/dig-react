
let _nextId = 0;

export default function nextId(prefix = '_auto_id_') {
  return prefix + (++_nextId);
}


