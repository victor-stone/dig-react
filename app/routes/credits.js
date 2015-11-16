import React from 'react';
import { ActionButtons,
        PageHeader } from '../components';

var ExLink = ActionButtons.ExternalLink;

const creditsPage = (
  <div>
    <a name="credits"></a>
    <PageHeader icon="hand-peace-o" title="Credits" />
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="well">
            <ul className="credits">
              <li><span className="label">{"coding"}</span><ExLink href="http://assoverteakettle.org" text="victor stone" /></li>
              <li><span className="label">{"design"}</span><ExLink href="https://99designs.com/profiles/rnddsgn" text="Rendi Sapurtra" />{" "}<ExLink href="https://99designs.com/profiles/oan" text="oan" /></li>
              <li><span className="label">{"vintage mic image"}</span><ExLink href="https://www.flickr.com/photos/holmesjr/14821723452/in/photolist-6KmUX7-ozKd15-bjsqAP-chf5mG-bB4V41-qejGm-88LGME-6vnHeK-btPYuC-8F3Qca-9kp6aT-fnHA8h-6ZWBUS-92cVdM-buprd4-jBa7tc-8x58zj-nJBSFg-k46cd4-wTZMe-8sRArj-bjsocc-9v4qUG-fK7AVi-9v4vsE-92g3A3-qLjrP2-3fWw9i-71Vhpk-pHmBAC-8u8hTf-msMvav-buprfp-bjUPHs-4qnNLn-5Z6vL5-8MC5Ti-msNLMm-cQRDi7-crz365-4vothW-bjspn2-8F6QWN-8dF7Nw-ifCvkY-q6LtyG-TnJMe-fK7Bz8-gNgzSB-EJHCT/" text="holmes palacios jr." /></li>
              <li><span className="label">{"awesome testing tools"}</span><ExLink href="https://www.browserstack.com" text="browser stack" /></li>
              <li><span className="label">{"invaluable contributors"}</span><ExLink href="http://ccmixter.org/people/go1dfish" text="alex" />{" "}<ExLink href="http://ccmixter.org/people/mindmapthat" text="kara" />
                    {" "}<ExLink href="http://ccmixter.org/people/snowflake" text="emily" />
                    {" "}<ExLink href="https://soundcloud.com/stonecactus" text="michael" />
                          </li>
            </ul>
          </div>
        </div>
      </div>
    </div>  
  </div>
);


var credits = React.createClass({

  render() {
    return  creditsPage;
  },

});

credits.title = 'dig.ccMixter Credits';

module.exports = credits;





