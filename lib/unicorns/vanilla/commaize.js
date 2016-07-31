

export default function commaize(value) {
  if( value === 0 || value === '0' ) {
      return '0';
  } else if( value ) {
      var regex = /([0-9]+)(([0-9]{3})($|,))/g;
      var str;
      var commaized = (value.string || value) + '';

      do {
          str = commaized;
          commaized = str.replace(regex,'$1,$2');
      } while( str !== commaized );

      return commaized;
  }
}

