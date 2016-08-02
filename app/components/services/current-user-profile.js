import api from 'services/json-rpc';

import { safeSetState } from 'unicorns';

const currentUserProfile = () => api.user.currentUserProfile();

currentUserProfile.NOT_LOGGED_IN = null;

currentUserProfile.isAdmin = (component) => {
    safeSetState(component, { isAdmin: false} );
    currentUserProfile().then( profile => profile && profile.isAdmin && component.setState({isAdmin:true}) );
};

module.exports = currentUserProfile;
