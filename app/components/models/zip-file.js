import React  from 'react';

// FIXME: incoming tags are not being highlighted
class ZIPFile extends React.Component
{
  render() {

    const { 
      model:{ zipContents }, 
      tags } = this.props;

    const files  = zipContents
                  .filter( f => f.match(/(__MACOSX|\.DS_Store)/) === null )
                  .map( f => f.replace(/\/.*\//g,'') );
    return (
        <ul className="zip-files">
          {files.map( (f,i) => {
            var cls = tags && tags.anyInString(f.toLowerCase()) ? 'hi-hi' : '';
            return( <li className={cls} key={i}>{f}</li> );
          })}
        </ul>
      );    
  }
}

module.exports = ZIPFile;

//