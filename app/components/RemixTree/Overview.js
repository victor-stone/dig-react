import React       from 'react';

import { AccordianPanel }           from '../Accordian';
import { HorizontalForm, FormItem } from '../Form';
import EditField                    from '../EditField';
import {EditableTagsField}          from '../TagEditor';


function EdPick(props) {
  var model = props.store.model.upload;
  return (
    <FormItem title="editorial" cls={this.props.cls} wrap>
      <div className="edpick">
        {model.edPick.review}
        <div className="edpick-author">{model.edPick.reviewer}</div>
      </div>
    </FormItem>);
}

function Featuring(props) {
  return(
      <FormItem title="featuring" cls={props.cls} wrap>{props.store.model.upload.featuring}</FormItem>    
    );
}

function License(props) {
  var model = props.store.model.upload;
  return(
    <FormItem title="license"  cls={this.props.cls} wrap>
      <a target="_blank" href={model.licenseURL}><img src={model.licenseLogoURL} /></a>
      {model.isCCPlus && <a target="_blank" href={model.purchaseLicenseURL}>{" "}<img src={model.purchaseLogoURL} /></a>}
    </FormItem>
  );
}

var OverviewForm = React.createClass({

  render() {
    var store = this.props.store;
    var model = store.model.upload;
    var cls   = this.props.lineCls || '';
    return (
      <HorizontalForm>
          {model.edPick && <EdPick store={store} cls={cls} />}
          {model.featuring && <Featuring store={store} cls={cls} />}
          <FormItem title="uploaded" cls={cls} wrap>{model.date}</FormItem>
          <License store={store} cls={cls} />
          {model.bpm && <EditField store={store} cls={cls} propName="bpm" title="BPM" />}
          {model.nsfw && <FormItem title="NSFW" cls={cls} wrap>{"This music may be NSFW"}</FormItem>}
          <EditableTagsField store={this.props.store} delayCommit />
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