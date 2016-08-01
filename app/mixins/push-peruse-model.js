import lookup            from '../services';
import events            from 'models/events';
import { LibArray } from 'unicorns';

const PushPeruseModel = target => class extends target {

  constructor() {
    super(...arguments);
    this.onPreNavigate = this.onPreNavigate.bind(this);
  }
  
  componentDidMount() {
    super.componentDidMount && super.componentDidMount();
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    lookup('router').on( events.PRE_NAVIGATE, this.onPreNavigate );
  }

  componentWillUnmount() {
    super.componentWillUnmount && super.componentWillUnmount();
    lookup('router').removeListener( events.PRE_NAVIGATE, this.onPreNavigate );
  }

  onPreNavigate( navInfo ) {
    const { path } = navInfo;
    const paths = LibArray.from( Array.isArray(path) ? path : [path] );
    if( paths.match( /^\/files\//) ) {
      lookup('env').set({
        perusingModel: LibArray.from( this.props.store.model.items, t => {
          return {
            id: t.id,
            name: t.name,
            artist: {
              id: t.artist.id,
              name: t.artist.name
            }
          };
        }),
      });
    }
  } 

};

module.exports = PushPeruseModel;