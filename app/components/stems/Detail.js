/* globals $ */
import React            from 'react';
import Link             from '../Link';
import Glyph            from '../Glyph';
import { ExternalLink }   from '../ActionButtons';
import { browserScripts } from '../../unicorns';

const SCROLL_OFFSET = 100;

const DetailTags = React.createClass({

  onAddTag: function(tag) {
    var _this = this;
    return function(e) {
      e.stopPropagation();
      e.preventDefault();
      var tags = _this.props.store.queryParams.tags;
      tags.add(tag);
      _this.props.store.refreshHard( { tags: tags.toString() } );
    };
  },

  render: function() {
    var style = { fontSize: '18px' };

    var tags = this.props.tags.map( t =>     
        (<div className="btn-group btn-tag" key={t} >
           <Link href={'/stems?tags=' + t} className="btn btn-success btn-xs"><Glyph icon="tag" />{' ' + t}</Link>
           <a href="#" className="btn btn-success btn-xs tag-add" style={style} onClick={this.onAddTag(t)}><Glyph icon="plus-circle" /></a>
         </div>));

    return( <div className="upload-tags" >{tags}</div> );
  }
});

const Detail = React.createClass({

  getInitialState: function() {
    return { model: this.props.model };
  },

  componentDidMount: function() {
   var $e = $('#upload-detail-' + this.state.model.id );
   $e.slideDown('slow', function() { browserScripts.scrollIntoView($e, SCROLL_OFFSET); });
  },

  render: function() {
    var model   = this.state.model;
    var id      = 'upload-detail-' + model.id;
    var ccmhref = `http://ccmixter.org/files/${model.artist.id}/${model.id}`;

    return (
      <div className="stems-detail" id={id} >
        <DetailTags tags={model.userTags} store={this.props.store} />
        <ExternalLink href={ccmhref} className="ccmixter-link btn btn-sm btn-warning" text="@ccMixter" />
        <div className="clearfix" ></div>
      </div>);
  }
});


module.exports = Detail;
