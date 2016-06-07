import React       from 'react';

import { AccordianPanel }  from '../Accordian';
import { HorizontalForm, FormItem } from '../Form';

var OverviewForm = React.createClass({

  render() {
    var model = this.props.store.model.upload;
    var cls   = this.props.lineCls || '';
    return (
      <HorizontalForm>
          {model.featuring
            ? <FormItem title="featuring" cls={cls} wrap>{model.featuring}</FormItem>
            : null}
          <FormItem title="uploaded" cls={cls} wrap>{model.date}</FormItem>
          <FormItem title="license"  cls={cls} wrap>
            <a target="_blank" href={model.licenseURL}><img src={model.licenseLogoURL} /></a>
            {model.isCCPlus
              ? <a target="_blank" href={model.purchaseLicenseURL}>{" "}<img src={model.purchaseLogoURL} /></a>
              : null}
          </FormItem>
          {model.edPick
            ? <FormItem title="editorial" cls={cls} wrap>
                <div className="edpick">
                  {model.edPick.review}
                  <div className="edpick-author">{model.edPick.reviewer}</div>
                </div>
              </FormItem>
            : null}
          {model.bpm
            ? <FormItem title="BPM" cls={cls} wrap>{model.bpm}</FormItem>
            : null}
          {model.nsfw
            ? <FormItem title="NSFW" cls={cls} wrap>{"This music may be NSFW"}</FormItem>
            : null}
          <FormItem title="tags" cls={cls} wrap={false}>
            <ul className="tags-list form-control">{model.tags.remove('audio,non_commercial,attribution,44k,48k,mp3,archive,flac,zip,media,CBR,VBR,stereo').map( t => <li className="tag" key={t}>{t}</li> )}</ul>
          </FormItem>
          {this.props.children}
        </HorizontalForm>
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