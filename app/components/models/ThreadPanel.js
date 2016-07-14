/*eslint "react/no-danger":0 */
import React       from 'react';
import moment      from 'moment';
import Topic       from './Topic';
import thumbStyle  from '../services/people-thumb-style';

class ThreadPanel extends React.Component
{
  _renderTopic(model,i) {
    const { indent, author, author:{name}, author:{avatarURL}, html, published, id } = model;
    return (
        <div key={i} className={'panel panel-info panel-offset-' + indent}>
          <div className="panel-heading">
            <h3 className="panel-title">
              <a name={id} />
              {indent 
                ? <span style={thumbStyle(author)}>{name}</span>
                : <span><img src={avatarURL} />{' ' + name}</span>
              }
            </h3>
          </div>
          <Topic className="panel-body" model={{html}} />
          <div className="panel-footer">{moment(published).fromNow()}</div>
        </div>
      );
  }

  render() {
    const { model } = this.props;
    return model && <div>{model.map( this._renderTopic )}</div>;
  }
}

ThreadPanel.css = `

.panel-offset-1 {
  margin-left: 30px;
}

.panel-offset-2 {
  margin-left: 40px;
}

.panel-offset-3 {
  margin-left: 50px;
}

.panel-offset-4 {
  margin-left: 60px;
}

.panel-offset-5 {
  margin-left: 70px;
}

.panel-offset-6 {
  margin-left: 80px;
}

.panel-offset-7 {
  margin-left: 90px;
}

.panel-offset-8 {
  margin-left: 100px;
}

`;

module.exports = ThreadPanel;

//