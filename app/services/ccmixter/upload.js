import API  from './api';

class Upload extends API
{
  permissions(id,userid) {
    return this.call(`upload/permissions/${id}/${userid}`,userid+id);
  }

  rate(id,userid) {
    this.invalidateCacheCat(userid+id);
    return this.call(`upload/rate/${id}/${userid}`);
  }

  review(id,userid,textbody) {
    this.invalidateCacheCat(userid+id);
    return this.post(`upload/review/${id}/${userid}`,{textbody});
  }
}

module.exports = Upload;
