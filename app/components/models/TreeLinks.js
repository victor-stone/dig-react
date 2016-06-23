import React          from 'react';
import Trackback      from './Trackback';
import CollapsingList from '../vanilla/CollapsingList';
import LinkToUpload   from '../services/LinkToUploadRoute';

function Link(props) {
  var model = props.model;
  return <LinkToUpload model={model} key={'fl_' + model.id}>{' '} <span className="tree-link-artist">{model.artist.id}</span></LinkToUpload>;
}

class TreelinkList extends CollapsingList
{
  listElement(model,key) {
    return (<li key={key}>{
              'embedBinding' in model
                ? <Trackback model={model} key={'tb_' + model.id}/>
                : <Link model={model} key={'fl_' + model.id} />
              }</li>);
  }
}

function TreeLinks(props)
{
  return (
      <div className="panel panel-warning" id={props.id}>
        <div className="panel-heading">
          <h3 className="panel-title">{props.title}</h3>
        </div>
        <div className="panel-body">
          <TreelinkList model={props.model} />
        </div>
      </div>
    );
}

module.exports = TreeLinks;


//