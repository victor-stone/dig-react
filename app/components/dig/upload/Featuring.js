import React from 'react';


class Featuring extends React.Component
{
  render() {

    const {featuring} = this.props;

    return featuring
        ? <p><span className="light-color">{"featuring"}</span>{" "}{featuring}</p>
        : null;
    }
}


module.exports = Featuring;

