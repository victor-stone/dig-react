import React       from 'react';
import { AccordianPanel 
               }   from '../vanilla/Accordian';
import Files       from '../models/Files';


function FileSection(props) {
  var model = props.store.model.upload;
  var title = `Files (${model.files.length})`;
  return ( <AccordianPanel title={title} id="files" icon="files-o" className="stems-browser">
             <Files model={model} />
            </AccordianPanel>
        );
}


module.exports = FileSection;

//