import React         from 'react';
import ActionButtons from './ActionButtons';
import _Link         from './Link';

const ExternalLink = ActionButtons.ExternalLink;

const Header = React.createClass({

  render: function() {
    var model = this.props.model;

    var homelink = model.homepage 
            ? <ExternalLink className="btn btn-info" href={model.homepage} text="homepage" />
            : null;

    return (
        <div className="page-header">
          <h1 className="center-text"><img className="img-circle" src={model.avatarURL} /> {model.name}</h1>
          <div className="center-text">
            <ExternalLink className="btn btn-info" href={model.url} text="@ccMixter" /> {homelink}
          </div>
        </div>
      );
    },

});

const Link = React.createClass({

  getInitialState: function() {
    return { model: this.props.model };
  },
  
  componentWillReceiveProps(props) {
    this.setState( { model: props.model } );
  },

  render: function() {
    var model = this.state.model;
    var href  = '/people/' + model.id;

    return( 
        <_Link {...this.props} href={href}>
          {this.props.avatar
            ? <span><img className="img-circle" src={model.avatarURL} />{model.name}</span>
            : this.props.children || model.name
          }
        </_Link>
      );
  }
});

module.exports = {
  Header,
  Link
};