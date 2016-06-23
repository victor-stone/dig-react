import React         from 'react';
import Link          from './LinkToRoute';
import Glyph         from '../vanilla/Glyph';
import env           from '../../services/env';

const thumbStyle = id => { return { backgroundImage:     `url('${env.rpcHost}user/thumbnail/${id}')`,
                                    backgroundRepeat:    'no-repeat',
                                    paddingLeft:         '24px',
                                    backgroundPositionY: 'center',
                                    marginRight:         '8px'
                                  };};

const LinkToPeopleRoute = React.createClass({

  getInitialState() {
    return { model: this.props.model };
  },
  
  componentWillReceiveProps(props) {
    this.setState( { model: props.model } );
  },

  render() {
    const { model: { id, name, avatarURL } } = this.state;
    let   { suburl = null, 
            className = '', 
            skipUser = false,
            avatar = false,
            icon = null, 
            thumb = false } = this.props;


    // for compat with dig legacy lol
    if( skipUser ) {
      return null;
    }

    icon = this.props.icon === true ? 'user' : this.props.icon;

    var href       = `/people/${id}${suburl?'/'+suburl:''}`;
    var cls        = 'people-link ' + className;
    var thumbStyle = thumb ? thumbStyle(id) : null;

    return( 
        <Link {...this.props} className={cls} style={thumbStyle} href={href}>
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

LinkToPeopleRoute.navigateTo = function(model) {
  Link.navigateTo('/people/' + model.id);  
};

module.exports = LinkToPeopleRoute;

