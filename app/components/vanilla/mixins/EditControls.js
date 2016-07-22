import EditState from './EditState';

const EditControls = baseclass => class extends EditState(baseclass)
{
  get inputAddOns() {
    const { editing = false } = this.state;

    return editing
            ? [ { icon: 'check', btnType: 'success', onClick:this.handler('onDone',  false) },
                { icon: 'times', btnType: 'danger',  onClick:this.handler('onCancel',false) }]
            : [ { icon: 'edit',  btnType: 'default', onClick:this.handler('onEdit',  true)  }];    
  }

};

module.exports = EditControls;
