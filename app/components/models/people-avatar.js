import React from 'react';

function PeopleAvatar(props) {
  return <img className="img-circle" src={props.model.avatarURL} /> ;
}

module.exports = PeopleAvatar;