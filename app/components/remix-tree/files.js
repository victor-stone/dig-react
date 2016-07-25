import React       from 'react';
import { AccordionPanel 
               }   from '../vanilla/Accordion';
import Files       from '../models/Files';
import InlineCSS   from '../vanilla/InlineCSS';

function FileSection(props) {
  var model = props.store.model.upload;
  var title = `Files (${model.files.length})`;
  return ( <AccordionPanel title={title} id="files" icon="files-o" className="stems-browser">
            <InlineCSS css={Files.css} id="files-css" />
             <Files model={model} />
            </AccordionPanel>
        );
}


module.exports = FileSection;

//