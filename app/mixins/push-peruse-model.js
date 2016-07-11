import lookup            from '../services';
import events            from '../models/events';

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
    if( navInfo.path.match( /^\/files\//) ) {
      lookup('env').set({
        perusingModel: this.props.store.model.items.map( t => {
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