import React         from 'react';
import Link          from './LinkToRoute';
import Glyph         from '../vanilla/Glyph';
import thumbStyle    from './people-thumb-style';
import { selectors } from '../../unicorns';

/*

  model is required, everything (I think) is optional

  model       - user model = { id, name } 
  fancy       - print name as "name (id)" (assuming they are different)
  avatar      - show a full size avatar (requires avatarURL in model)
  icon        - boolean true means show a 'person' glyph, string means show that icon
  thumb       - show a thumbnail of the user's avatar (avatarURL not required)
  skipUser    - don't show anything (!) like nothing
  suburl      - post-fix this to url (e.g. /playlists or /stems)
  host        - external host (e.g. 'http://somesite.org/' )
  onNavigate  - callback will short circuit any action and call back with model
  {children}  - prints children

  all properties are passed to Link -> <a /> DOM element


*/

const LinkToPeopleRoute = React.createClass({

  getInitialState() {
    return { model: this.props.model };
  },
  
  componentWillReceiveProps(props) {
    this.setState( { model: props.model } );
  },

  render() {
    let { model, model: { id, name, avatarURL } } = this.state;

    let   { suburl = null, 
            className = '', 
            host = '',
            skipUser = false,
            avatar = false,
            icon = null, 
            fancy = false,
            thumb = false } = this.props;

    // for compat with dig legacy lol
    if( skipUser ) {
      return null;
    }

    fancy && (name = id === name ? id : `${name} (${id})`);

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

