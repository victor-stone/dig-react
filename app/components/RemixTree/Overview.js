import React       from 'react';

import { AccordianPanel }  from '../Accordian';
import { HorizontalForm, FormItem } from '../Form';
import BPM from './overview/BPM';
import {BoundStaticTagList} from '../TagEditor';

var Tags = React.createClass({

  render() {
    return(
        <BoundStaticTagList store={this.props.store} />
      );
  }
});

var OverviewForm = React.createClass({

  render() {
    var model = this.props.store.model.upload;
    var cls   = this.props.lineCls || '';
    return (
      <HorizontalForm>
          {model.edPick
            ? <FormItem title="editorial" cls={cls} wrap>
                <div className="edpick">
                  {model.edPick.review}
                  <div className="edpick-author">{model.edPick.reviewer}</div>
                </div>
              </FormItem>
            : null}
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
          {model.bpm
            ? <BPM store={this.props.store} cls={cls} />
            : null}
          {model.nsfw
            ? <FormItem title="NSFW" cls={cls} wrap>{"This music may be NSFW"}</FormItem>
            : null}
          <Tags store={this.props.store} cls={cls}/>
          {this.props.children}
        </HorizontalForm>
      );
  }
});

var Overview = React.createClass({

  render() {
    return (
      <AccordianPanel title="Overview" id="overview" icon="info-circle" >
        <OverviewForm {...this.props} lineCls="col-md-12" />
      </AccordianPanel>
      );
  }
});

Overview.OverviewForm = OverviewForm;

module.exports = Overview;

//