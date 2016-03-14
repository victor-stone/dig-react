import React       from 'react';

import { AccordianPanel }  from '../Accordian';

function OverviewItem(props) {
  var cls = props.cls;
  return (
      <div className="form-group">
        <div className={cls}>
          <div className="input-group">
            <span className="input-group-addon">{props.title}</span>
            {props.wrap
              ? <span className="form-control">{props.children}</span>
              : props.children
            }
          </div>
        </div>
      </div>
    );
}

var OverviewForm = React.createClass({

  render() {
    var model = this.props.model;
    var cls   = this.props.lineCls || '';
    return (
      <form className="form-horizontal">
          {model.featuring
            ? <OverviewItem title="featuring" cls={cls} wrap>{model.featuring}</OverviewItem>
            : null}
          <OverviewItem title="uploaded" cls={cls} wrap>{model.date}</OverviewItem>
          <OverviewItem title="license"  cls={cls} wrap>
            <a target="_blank" href={model.licenseURL}><img src={model.licenseLogoURL} /></a>
            {model.isCCPlus
              ? <a target="_blank" href={model.purchaseLicenseURL}>{" "}<img src={model.purchaseLogoURL} /></a>
              : null}
          </OverviewItem>
          {model.edPick
            ? <OverviewItem title="editorial" cls={cls} wrap>
                <div className="edpick">
                  {model.edPick.review}
                  <div className="edpick-author">{model.edPick.reviewer}</div>
                </div>
              </OverviewItem>
            : null}
          {model.bpm
            ? <OverviewItem title="BPM" cls={cls} wrap>{model.bpm}</OverviewItem>
            : null}
          {model.nsfw
            ? <OverviewItem title="NSFW" cls={cls} wrap>{"This music may be NSFW"}</OverviewItem>
            : null}
          <OverviewItem title="tags" cls={cls} wrap={false}>
            <ul className="tags-list form-control">{model.tags.remove('audio,non_commercial,attribution,44k,48k,mp3,archive,flac,zip,media,CBR,VBR,stereo').map( t => <li className="tag" key={t}>{t}</li> )}</ul>
          </OverviewItem>
          {this.props.children}
      </form>
      );
  }
});

var Overview = React.createClass({

  render() {
    return (
      <AccordianPanel title="Overview" id="overview" icon="info-circle" open >
        <OverviewForm {...this.props} lineCls="col-md-12" />
      </AccordianPanel>
      );
  }
});

Overview.OverviewForm = OverviewForm;

module.exports = Overview;

//