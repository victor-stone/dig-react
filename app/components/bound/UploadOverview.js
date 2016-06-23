import React       from 'react';

import { HorizontalForm, FormItem } from '../vanilla/Form';
import { InputFormField }           from './InputField';
import { EditableTagsField }        from './Tags';


function EdPick(props) {
  const { upload: { edPick: { review, reviewer }} } = props.store.model;
  return (
    <FormItem title="editorial" cls={this.props.cls} wrap>
      <div className="edpick">
        {review}
        <div className="edpick-author">{reviewer}</div>
      </div>
    </FormItem>);
}

function Featuring(props) {
  return(
      <FormItem title="featuring" cls={props.cls} wrap>{props.store.model.upload.featuring}</FormItem>    
    );
}

function License(props) {
  const { licenseURL, licenseLogoURL, isCCPlus, purchaseLicenseURL, purchaseLogoURL } = props.store.model.upload;
  return(
    <FormItem title="license"  cls={this.props.cls} wrap>
      <a target="_blank" href={licenseURL}><img src={licenseLogoURL} /></a>
      {isCCPlus && <a target="_blank" href={purchaseLicenseURL}>{" "}<img src={purchaseLogoURL} /></a>}
    </FormItem>
  );
}

var UploadOverview = React.createClass({

  render() {
    const { store } = this.props;
    const { model: {upload: {edPick, featuring, date, bpm, nsfw}} } = store.upload;
    var cls   = this.props.lineCls || '';
    return (
      <HorizontalForm>
          {edPick && <EdPick store={store} cls={cls} />}
          {featuring && <Featuring store={store} cls={cls} />}
          <FormItem title="uploaded" cls={cls} wrap>{date}</FormItem>
          <License store={store} cls={cls} />
          {bpm && <InputFormField store={store} cls={cls} propName="bpm" title="BPM" />}
          {nsfw && <FormItem title="NSFW" cls={cls} wrap>{"This music may be NSFW"}</FormItem>}
          <EditableTagsField store={this.props.store} delayCommit />
          {this.props.children}
        </HorizontalForm>
      );
  }
});


module.exports = UploadOverview;

//