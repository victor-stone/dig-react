import React       from 'react';

import { HorizontalForm, 
         StaticField }      from '../vanilla/Form';

import TagsPropertyEditor from '../properties/tags';
import BPMPropertyEditor  from '../properties/bpm';

function EdPick(props) {
  const { model: {edPick: { review, reviewer } } } = props;
  return (
    <StaticField title="editorial">
      <div className="edpick">
        {review}
        <div className="edpick-author">{reviewer}</div>
      </div>
    </StaticField>);
}

function Featuring(props) {
  const { model: {featuring} } = props;
  return(
      <StaticField title="featuring">{featuring}</StaticField>
    );
}

function NSFW(props) {
  const { model: {nsfw} } = props;
  return nsfw && <StaticField title="NSFW">{"This music may be NSFW"}</StaticField>;
}

function License(props) {
  const { model } = props;
  const { licenseURL, licenseLogoURL, isCCPlus, purchaseLicenseURL, purchaseLogoURL } = model;
  return(
    <StaticField title="license" >
      <a target="_blank" href={licenseURL}><img src={licenseLogoURL} /></a>
      {isCCPlus && <a target="_blank" href={purchaseLicenseURL}>{" "}<img src={purchaseLogoURL} /></a>}
    </StaticField>
  );
}

function UploadOverview(props)
{
  const { store, 
          store: { 
              model: { upload }
            } 
          } = props;

  const { edPick, featuring, date, bpm, nsfw } = upload;

  return (
    <HorizontalForm>
        {edPick && <EdPick model={upload} />}
        {featuring && <Featuring model={upload} />}
        <StaticField title="uploaded" >{date}</StaticField>
        <License model={upload} />
        {bpm && <BPMPropertyEditor store={store} />}
        {nsfw && <NSFW model={upload} />}
        <TagsPropertyEditor.Field delayCommit store={store} />
      </HorizontalForm>
    );
}

module.exports = UploadOverview;

//