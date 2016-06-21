import React         from 'react';
import Link          from './LinkToRoute';
import Glyph         from '../vanilla/Glyph';
import env           from '../../services/env';

const LinkToPeopleRoute = React.createClass({

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

    var icon       = this.props.icon === true ? 'user' : this.props.icon;
    var thumbStyle = this.props.thumb ? { backgroundImage:     `url('${env.rpcHost}user/thumbnail/${model.id}')`,
                                          backgroundRepeat:    'no-repeat',
                                          paddingLeft:         '24px',
                                          backgroundPositionY: 'center',
                                          marginRight:         '8px'

                                           } : null;

    var cls        = 'people-link ' + (this.props.className || '');

    return( 
        <Link {...this.props} className={cls} style={thumbStyle} href={href}>
          {this.props.avatar
            ? <span><img className="img-circle" src={model.avatarURL} />{model.name}</span>
            : icon
              ? <span><Glyph icon={icon} />{' ' + model.name}</span>
              : this.props.children || model.name
          }
        </Link>
      );
  }
});


module.exports = LinkToPeopleRoute;

