import env from '../../services/env';

module.exports = function(model,extra={marginRight:'8px'})
{ 
  return Object.assign({  backgroundImage: `url('${env.rpcHost}user/thumbnail/${model.id||model}')`,
                          backgroundRepeat:    'no-repeat',
                          paddingLeft:         '24px',
                          backgroundPositionY: 'center'
                        },extra);
};

