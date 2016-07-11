import api from '../../services/ccmixter';

const currentUserProfile = () => api.user.currentUserProfile();

currentUserProfile.NOT_LOGGED_IN = api.user.NOT_LOGGED_IN;

module.exports = currentUserProfile;
