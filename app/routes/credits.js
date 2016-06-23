import React from 'react';
import PageHeader   from '../components/vanilla/PageHeader';
import ExternalLink from '../components/vanilla/ExternalLink';

var ExLink = ExternalLink;

// TODO: Get this the hell out of /routes

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
              <li><span className="label">{"vintage mic image"}</span><ExLink href="https://flic.kr/p/ozKd15" text="holmes palacios jr." /></li>
              <li><span className="label">{"drummer"}</span><ExLink href="https://flic.kr/p/rctzBK" text="wim vandenbussche" /></li>
              <li><span className="label">{"beach"}</span><ExLink href="https://flic.kr/p/p5Akxa" text="roman iakoubtchik" /></li>
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





