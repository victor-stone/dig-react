import React from 'react';

const people = React.createClass({

  render() {
    return  (
      <div>
        <h1>Stuff about people</h1>
        <p>Blbha lblah blah</p>
      </div>
    );
  },

});

people.path = '/people/:userid';

module.exports = people;

