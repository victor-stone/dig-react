
var Events = {
  ERROR:              'error',
  ERROR_IN_JSON:      'json_error',
  
  LOADING:            'loading',

  PRE_NAVIGATE:       'pre_navigate',
  NAVIGATE_TO:        'navigate_to',
  NAVIGATE_TO_THIS:   'navigate_to_this',
  
  NOW_PLAYING:        'now_playing',
  CONTROLS:           'controls',
  POSITION:           'position',
  PLAYLIST:           'playlist',
  FINISH:             'finish',
  PLAY:               'play',
  STOP:               'stop',
  
  PARAMS_CHANGED:     'params_changed',
  ARE_PARAMS_DIRTY:   'are_params_dirty',
  GET_PARAMS_DEFAULT: 'get_params_default',
  GET_PARAMS_URI:     'get_params_uri',
  MODEL_UPDATED:      'model_updated',
  
  ACTION_START:       'action_start',
  ACTION_END:         'action_end',
  
  COMPONENT_UPDATE:   'component_update',
  
  INSPECT_ZIP:        'inspect_zip',
  
  SAMPLE_TAG_TAB:     'sample_tag_tab',
  
  DOWNLOAD:           'download',
  USER_SEARCH:        'user_search',
  APP_ALERT:          'app_alert',
  USER_LOGIN:         'user_login',
  REQUEST_MODAL:      'request_modal',
  FEED_SEEN:          'feedseen',
  FOLLOW_CHANGED:     'follow_changed'
};

module.exports = Events;
