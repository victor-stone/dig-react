var css = `

.user-feed .user-feed-items > li {
  margin-bottom: 15px;
  font-size: 20px;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 12px;
  min-height: 70px;
  position: relative;
  box-shadow: #999 2px 2px 8px;
  border-radius: 5px;
  color: #333;
  background-image: -webkit-linear-gradient(top, #e8e8e8 0%, #eeeeee 100%);
  background-image: -o-linear-gradient(top, #e8e8e8 0%, #eeeeee 100%);
  background-image: -webkit-gradient(linear, left top, left bottom, from(#e8e8e8), to(#eeeeee));
  background-image: linear-gradient(to bottom, #e8e8e8 0%, #eee 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffe8e8e8', endColorstr='#ffeeeeee', GradientType=0);
  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
  background-repeat: repeat-x;
}

.user-feed .user-feed-items > li:hover {
  cursor: pointer;
  background: white;
}
.user-feed .user-feed-items > li img {
  border-radius: 50%;
  margin-right: 12px;
  max-width: 50px;
}

.user-feed .user-feed-items > li .img-container {
  display: inline-block;
  min-width: 60px;
  min-height: 55px;
  float: left;
  text-align: center;
}

.user-feed .user-feed-items > li .text {
    display: inline-block;
    max-width: 66%;
    overflow: hidden;
    margin-top: 4px;
    /* float: left; */
    /* white-space: nowrap; */ 
}

.user-feed .user-feed-items > li .date {
  position: absolute;
  right: 10px;
  bottom: 8px;
  color: #777;
  font-size: 13px;
  letter-spacing: 1;
  font-weight: 200;
}

.user-feed .user-feed-items > li > .text > span {
}

.user-feed .user-feed-items > li > .text > span > strong {
  font-weight: 300;
}

.user-feed .user-feed-items > li > .text > span > i {
  font-weight: 300;
}

.user-feed .user-feed-items > li.unseen {

}

.user-feed .user-feed-items > li.seen {  
}


/* glyphs */

.user-feed .user-feed-items > li .text i.fa {
    /* margin-right: 18px; */
    /* margin-top: 4px; */
    /* min-width: 25px; */
    /* float: left; */
    display: inline-block;
    padding: 4px;
    color: #a94442; // #cfc
    float: right;
    right: 5;
    position: absolute;
    top: 5;
  }


.user-feed .user-feed-items > li.recommend.unseen .text > i.fa {
  color: red;
}

/* placeholders */

.user-feed .user-feed-items > li.reply.unseen .text > i.fa {
}

.user-feed .user-feed-items > li.follower_upload.unseen .text > i.fa {
}

.user-feed .user-feed-items li.review.unseen .text > i.fa {

}

.user-feed .user-feed-items li.admin_msg.unseen .text > i.fa {
}


.user-feed .user-feed-items li.follower_upload {

}

.user-feed .user-feed-items li.follower_update {

}
.user-feed .user-feed-items li.review         {

}
.user-feed .user-feed-items li.recommend      {

}
.user-feed .user-feed-items li.remixed        {

}
.user-feed .user-feed-items li.reply         {

}
.user-feed .user-feed-items li.admin_msg      {

}
.user-feed .user-feed-items li.edpick         {

}


`;

module.exports = css;

//
