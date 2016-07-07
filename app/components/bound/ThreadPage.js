import React          from 'react';
import PageHeader     from '../vanilla/PageHeader';
import InlineCSS      from '../vanilla/InlineCSS';
import ThreadPanel    from '../models/ThreadPanel';

class ThreadPage extends React.Component
{
  constructor() {
    super(...arguments);
  }

  render() {
    const { model:{head:{forum,name},items} } = this.props.store;

    return(
        <div className="container-fluid">
          <InlineCSS css={ThreadPanel.css} id="thread-panel-css" />
          <PageHeader title={name} subTitle={forum.name} icon="comments" />
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <ThreadPanel model={items} />
            </div>
          </div>
        </div>
      );
  }
}

module.exports = ThreadPage;