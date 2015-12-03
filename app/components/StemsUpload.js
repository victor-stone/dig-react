import React from 'react';

import Link             from './Link';
import StemsList        from './StemsList';
import PageHeader       from './PageHeader';
import ZIPContentViewer from './ZIPContentViewer';
import People           from './People';
import { UploadLink }   from './ActionButtons';

var Tags = React.createClass({

  render: function() {

    var tags = this.props.model.userTags.map( t => 
      (<Link key={t} href={'/stems?tags=' + t} className="btn-exp btn-tag light-on-hover">{t}</Link>) );

    return( <div>{tags}</div> );
  }
});


var RelateSection = React.createClass({

  render: function() {
    var uploads = this.props.model || [];
    
    function formatRemix(rmx,i) {
      return (
        <li key={i + '-' + rmx.id} className="list-group-item upload">
          <UploadLink model={rmx} />
          {" "}
          <People.Link model={rmx.artist} />
        </li>
        );
    }

    var lines = uploads.length 
          ? uploads.map(formatRemix) 
          : <li><span className="light-color">{"nothing here yet!"}</span></li>;

    return (
        <div>
          <h3 className="center-text">{this.props.title}</h3>
          <ul className="related-list">{lines}</ul>
        </div>
      );
  }
});

var ZIPContents = React.createClass({

  getInitialState: function() {
    var zipfiles = this.props.model.files.filterBy('isZIP');
    return { zipfiles };
  },

  render: function() {
    if( !this.state.zipfiles.length ) {
      return null;
    }

    return (
      <ul className="zip-contents-list">
        {this.state.zipfiles.map( (z,i) => 
            (<li key={i} className="zip-contents">
              <a name={'#zip-' + z.id} />
              <div className="zip-file-name">{z.nicName}</div>
              <ZIPContentViewer.ZIPFiles model={z} />
            </li>)
          )}
      </ul>
      );
  }
});

function NothingThere() {
  return (<h2 className="no-upload-there">{"didn't catch that..."}</h2>);
}

var StemsUpload = React.createClass({

  render: function() {
    var store  = this.props.store;
    var model  = store.model;
    var upload = model.upload;

    model.playlist = [ upload ]; // trick the stemslist component (sigh)
    model.total    = 1;
    
    return  (
      <div>

        <PageHeader icon="music" title={upload.name} subTitle={upload.artist.name} />
        <div className="container-fluid stems-browser">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 stems-listing-widget">
              <StemsList store={store} noHitsComp={NothingThere} filesOnly />   
              <Tags model={upload} />
            </div>
          </div>
          <div className="row related">
            <div className="col-md-5  col-sm-12 remixes">
              <RelateSection model={model.sources} title={"Sources"} />            
            </div>
            <div className="col-md-5  col-sm-12 remixes">
              <RelateSection model={model.remixes} title={"Remixes"} />            
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-md-offset-3 zip-contents-widget">
              <ZIPContents model={upload} />
            </div>
          </div>
        </div>
      </div>
    );
  },

});


module.exports = StemsUpload;

