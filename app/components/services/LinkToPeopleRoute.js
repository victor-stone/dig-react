import React         from 'react';
import Link          from './LinkToRoute';
import Glyph         from '../vanilla/Glyph';
import thumbStyle    from './people-thumb-style';
import { selectors } from '../../unicorns';

const LinkToPeopleRoute = React.createClass({

  getInitialState() {
    return { model: this.props.model };
  },
  
  componentWillReceiveProps(props) {
    this.setState( { model: props.model } );
  },

  render() {
    const { model, model: { id, name, avatarURL } } = this.state;

    let   { suburl = null, 
            className = '', 
            host = '',
            skipUser = false,
            avatar = false,
            icon = null, 
            thumb = false } = this.props;

    // for compat with dig legacy lol
    if( skipUser ) {
      return null;
    }

    icon = this.props.icon === true ? 'user' : this.props.icon;

    const href  = (host || '') + LinkToPeopleRoute.url(model) + (suburl ? '/' + suburl : '');
    const cls   = selectors('people-link', className);
    const ts    = thumb ? thumbStyle(id) : null;

    return( 
        <Link {...this.props} className={cls} style={ts} href={href}>
          {avatar
            ? <span><img className="img-circle" src={avatarURL} />{name}</span>
            : icon
              ? <span><Glyph icon={icon} />{' ' + name}</span>
              : this.props.children || name
          }
        </Link>
      );
  }
});

LinkToPeopleRoute.url = model => '/people/' + model.id;

LinkToPeopleRoute.playlistsUrl = model => LinkToPeopleRoute.url(model) + '/playlists';

// TODO: this belongs somewhere else
LinkToPeopleRoute.feedUrl = model => '/feed/' + model.id;

LinkToPeopleRoute.navigateTo = model => Link.navigateTo(LinkToPeopleRoute.url(model));  


module.exports = LinkToPeopleRoute;

