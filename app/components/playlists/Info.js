/*eslint "react/no-danger":0 */
import React      from 'react';
import Tags       from './Tags';

var Info = React.createClass({

  render: function() {
    var model       = this.props.store.model.head;
    var description = { __html: model.description };

    return (
        <div className="playlist-info hidden-xs hidden-sm">
          <div className="playlist-curator">
            <span>{"curator: "}</span><a href={'/people/' + model.curator.id} className="curator-link">{model.curator.name}</a>
          </div>
          <Tags model={model.tags} />
          {description
            ? <div className="playlist-description" dangerouslySetInnerHTML={description}></div>
            : null
          }
        </div>
      );
  }
});

module.exports = Info;

//