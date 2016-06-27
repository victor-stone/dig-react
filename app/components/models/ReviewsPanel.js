/*eslint "react/no-danger":0 */
import React       from 'react';
import thumbStyle  from '../services/people-thumb-style';

class ReviewsPanel extends React.Component
{
  _renderReview(model,i) {
    const { indent, author, author:{name}, author:{avatarURL}, html, date } = model;
    return (
        <div key={i} className={'panel panel-info panel-offset-' + indent}>
          <div className="panel-heading">
            <h3 className="panel-title">
              {indent 
                ? <span style={thumbStyle(author)}>{name}</span>
                : <span><img src={avatarURL} />{' ' + name}</span>
              }
            </h3>
          </div>
          <div className="panel-body" dangerouslySetInnerHTML={{__html:html}} />
          <div className="panel-footer">{date}</div>
        </div>
      );
  }

  render() {
    const { model } = this.props;
    return model && <div>{model.map( this._renderReview )}</div>;
  }
}

ReviewsPanel.css = `

.panel-offset-1 {
  margin-left: 30px;
}

.panel-offset-2 {
  margin-left: 40px;
}
`;

module.exports = ReviewsPanel;

//