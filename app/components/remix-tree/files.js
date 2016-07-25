import React       from 'react';
import { AccordionPanel 
               }   from '../vanilla/accordion';
import Files       from '../models/files';
import InlineCss   from '../vanilla/inline-css';

function FileSection(props) {
  var model = props.store.model.upload;
  var title = `Files (${model.files.length})`;
  return ( <AccordionPanel title={title} id="files" icon="files-o" className="stems-browser">
            <InlineCss css={Files.css} id="files-css" />
             <Files model={model} />
            </AccordionPanel>
        );
}


module.exports = FileSection;

//