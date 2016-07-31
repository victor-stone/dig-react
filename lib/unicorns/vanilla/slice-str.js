import ellipse from './ellipse';

const TRUNCATED_STRING_MAX = 10;
const TRUNCATED_WORD_MAX   = 5;
const MAX_SINGLE_WORD      = 20;

export default function sliceStr({
  str = '', 
  maxWords = TRUNCATED_WORD_MAX, 
  maxStr = TRUNCATED_STRING_MAX, 
  maxSingle = MAX_SINGLE_WORD 
}) 
{
  if( !/[\s\-_]/.test(str) && str.length < maxSingle ) {
    return str;
  }
  return str
          .trim()
          .split(/[\s\-_]+/)
          .slice( 0, maxWords )
          .map( s => ellipse(s,maxStr) )
          .join(' ');
}

