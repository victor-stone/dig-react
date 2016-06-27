import React       from 'react';
import { AccordianPanel 
               }   from '../vanilla/Accordian';
import Files       from '../models/Files';
import InlineCSS   from '../vanilla/InlineCSS';

function FileSection(props) {
  var model = props.store.model.upload;
  var title = `Files (${model.files.length})`;
  return ( <AccordianPanel title={title} id="files" icon="files-o" className="stems-browser">
            <InlineCSS css={Files.css} id="files-css" />
             <Files model={model} />
            </AccordianPanel>
        );
}


module.exports = FileSection;

//