import API from './api';

class Upload extends API
{
  permissions(id,userid) {
    return this.call(`upload/permissions/${id}/${userid}`);
  }

  rate(id,userid) {
    return this.call(`upload/rate/${id}/${userid}`);
  }
}

module.exports = Upload;
