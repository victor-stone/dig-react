import React         from 'react';
import ActionButtons from './ActionButtons';
import _Link         from './Link';
import Glyph         from './Glyph';

const ExternalLink = ActionButtons.ExternalLink;

const Header = React.createClass({

  render() {
    var model = this.props.model;

    var homelink = model.homepage 
            ? <ExternalLink className="btn btn-info" href={model.homepage} text="homepage" />
            : null;

    var url = '/people/' + model.id;

    return (
        <div className="page-header">
          <h1 className="center-text"><img className="img-circle" src={model.avatarURL} /> {model.name}</h1>
          <div className="center-text">
            <_Link className="btn btn-info" href={url}><Glyph icon="user" />{" profile"}</_Link> {homelink}
          </div>
        </div>
      );
    },

});

const Link = React.createClass({

  getInitialState() {
    return { model: this.props.model };
  },
  
  componentWillReceiveProps(props) {
    this.setState( { model: props.model } );
  },

  render() {
    var model = this.state.model;
    var href  = '/people/' + model.id;

    if( this.props.suburl ) {
      href += '/' + this.props.suburl;
    }

    var icon = this.props.icon === true ? 'user' : this.props.icon;

    return( 
        <_Link {...this.props} href={href}>
          {this.props.avatar
            ? <span><img className="img-circle" src={model.avatarURL} />{model.name}</span>
            : icon
              ? <span><Glyph icon={icon} />{' ' + model.name}</span>
              : this.props.children || model.name
          }
        </_Link>
      );
  }
});

const List = React.createClass({
  getInitialState() {
    return { model: this.props.model };
  },
  
  componentWillReceiveProps(props) {
    this.setState( { model: props.model } );
  },

  render() {
    return (
      <div>{this.state.model.map( (u,i) => <Link {...this.props} key={i} model={u} />)}</div>
      );
  }  
});
module.exports = {
  Header,
  Link,
  List
};