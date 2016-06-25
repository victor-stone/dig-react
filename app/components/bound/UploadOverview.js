import React       from 'react';

import { HorizontalForm, FormItem } from '../vanilla/Form';
import { InputFormField }           from './InputField';
import { EditableTagsField }        from './Tags';


function EdPick(props) {
  const { cls, model: {edPick: { review, reviewer } } } = props;
  return (
    <FormItem title="editorial" cls={cls} wrap>
      <div className="edpick">
        {review}
        <div className="edpick-author">{reviewer}</div>
      </div>
    </FormItem>);
}

function Featuring(props) {
  const { cls, model: {featuring} } = props;
  return(
      <FormItem title="featuring" cls={cls} wrap>{featuring}</FormItem>    
    );
}

function License(props) {
  const { cls, model } = props;
  const { licenseURL, licenseLogoURL, isCCPlus, purchaseLicenseURL, purchaseLogoURL } = model;
  return(
    <FormItem title="license"  cls={cls} wrap>
      <a target="_blank" href={licenseURL}><img src={licenseLogoURL} /></a>
      {isCCPlus && <a target="_blank" href={purchaseLicenseURL}>{" "}<img src={purchaseLogoURL} /></a>}
    </FormItem>
  );
}

function UploadOverview(props)
{
  const { store, 
          lineCls:cls='', 
          store: { 
              model: { upload: model }
            } 
          } = props;
  const { edPick, featuring, date, bpm, nsfw } = model;
  return (
    <HorizontalForm>
        {edPick && <EdPick model={model} cls={cls} />}
        {featuring && <Featuring model={model} cls={cls} />}
        <FormItem title="uploaded" cls={cls} wrap>{date}</FormItem>
        <License model={model} cls={cls} />
        {bpm && <InputFormField store={store} cls={cls} propName="bpm" title="BPM" />}
        {nsfw && <FormItem title="NSFW" cls={cls} wrap>{"This music may be NSFW"}</FormItem>}
        <EditableTagsField store={store} delayCommit />
        {props.children}
      </HorizontalForm>
    );
}

module.exports = UploadOverview;

//