import React                  from 'react';
import currentUserProfile     from '../services/CurrentUserProfile';
import AddTags                from '../properties/AddTags';

class AdminTag extends React.Component
{
  constructor() {
    super(...arguments);
    currentUserProfile.isAdmin(this);
  }

  render() {
    const { state:{isAdmin}, props:{store} } = this;

    return isAdmin && <AddTags title="admin tag" store={store} />;
  }
}

module.exports = AdminTag;

//