import React                  from 'react';
import currentUserProfile     from '../services/current-user-profile';
import AddTags                from '../properties/add-tags';

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