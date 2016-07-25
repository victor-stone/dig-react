import api from '../../services/ccmixter';

import { safeSetState } from '../../unicorns';

const currentUserProfile = () => api.user.currentUserProfile();

currentUserProfile.NOT_LOGGED_IN = api.user.NOT_LOGGED_IN;

currentUserProfile.isAdmin = (component) => {
    safeSetState(component, { isAdmin: false} );
    currentUserProfile().then( profile => profile && profile.isAdmin && component.setState({isAdmin:true}) );
};

module.exports = currentUserProfile;
