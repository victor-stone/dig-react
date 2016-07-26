
function cleanLinks(str) {

  const map = [
    [ /<img\s+class=.cc_thumbs_up[^>]+>/g,                     '<i class="fa fa-thumbs-o-up" ></i>'],
    [ /http:\/\/ccmixter.org\/playlist\/browse/g,              '/playlist/browse'  ],
    [ /http:\/\/ccmixter.org\//g,                              '/' ],
    [ /http:\/\/playlists.ccmixter.org\/(playlist\/)?browse/g, '/playlist/browse' ],
    [ /\/mixup\//g,                                            'http://ccmixter.org/mixup/' ],
    [ /(<img.*src=")(\/mixter-files)/g,                        '$1http://ccmixter.org$2' ],
    [ /(\/media\/people\/contact\/admin)/g,                    'http://ccmixter.org$1' ],
  ];

  map.forEach( m => str = str.replace(m[0],m[1]) );

  return str;
}

const bbFormatMap = [ 'format', 'raw', 'text'];

const pageFormatMap = {
  format: 'topic_text_html',
  text: 'topic_text_plain',
  raw: 'topic_text'
};

class TextProperty 
{
  constructor({html,plain,native}) {
    Object.assign(this,{html,plain,native});
  }

  toString() {
    return this.native;
  }
}

function makeTextProperty({
          self,
          content_page_textformat,
          topic_format,
          key}) 
{
  let html = '';

  if( content_page_textformat || topic_format ) {
    const key = content_page_textformat || bbFormatMap[Number(topic_format)];
    html = self[pageFormatMap[key]];
  } else {
    html = self[key + '_html'];
  }

  html = cleanLinks(html);

  let plain = self[key + '_plain'];

  if( html && !plain && document ) {
    var div = document.createElement('DIV');
    div.innerHTML = html;
    plain = div.textContent || div.innerText;

  }
  return new TextProperty({
    native: self[key],
    plain,
    html
  });
}

module.exports = {
  cleanLinks,
  makeTextProperty
};