import React  from 'react';
import Glyph  from './vanilla/Glyph'; 
import Modal  from './services/Modal';

import { TagString } from '../unicorns';

function ZIPFiles(props) {

    var files  = props.model.zipContents
                  .filter( f => f.match(/(__MACOSX|\.DS_Store)/) === null )
                  .map( f => f.replace(/\/.*\//g,'') );
    var tags   = props.tags;
    return (
        <ul className="zip-files">
          {files.map( (f,i) => {
            var cls = tags && tags.anyInString(f.toLowerCase()) ? 'hi-hi' : '';
            return( <li className={cls} key={i}>{f}</li> );
          })}
        </ul>
      );
}

const ZIPContentPopup = React.createClass({

  getInitialState: function() {
    return {view: {showModal: false} };
  },
  
  handleHideModal: function() {
    this.setState({view: {showModal: false}});
  },

  handleShowModal(e){
    e.stopPropagation();
    e.preventDefault();
    this.setState( { view: {showModal: true} } );
  },

  render: function() {
    var cls     = 'btn btn-info btn-lg zip-link';
    var model   = this.props.model;
    var nicName = model.nicName ? ` [${model.nicName}]` : '';
    var title   = `${model.mediaTags.name} ${nicName}`;
    var qp      = this.props.store ? this.props.store.model.queryParams : {};
    var tags    = qp.searchp 
                   ? new TagString(qp.searchp.replace(/\s/g,','))
                   : new TagString(qp.tags);

    return (
        <span className="zip-link-container">
          <a className={cls} href="#" onClick={this.handleShowModal}><Glyph fixed icon="info" /></a>
          {this.state.view.showModal
            ? <Modal handleHideModal={this.handleHideModal} title={title} subTitle="ZIP contents">
                <ZIPFiles model={model} tags={tags} />
              </Modal>
            : null
          }
        </span>
      );
  }
});

ZIPContentPopup.ZIPFiles = ZIPFiles;

module.exports = ZIPContentPopup;

//