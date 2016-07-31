import quickLoop from './quick-loop';

export default function numericize(obj) {
  const result = {};
  obj && quickLoop( Object.keys(obj), k => result[k] = Number(obj[k]) );
  return result;
}


