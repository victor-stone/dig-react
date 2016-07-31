
class FilterVisibility
{
  constructor(visibility) {
    this._visibility = visibility;
  }

  get alwaysHide() {
    return this._visibility === FilterVisibility.HIDDEN;
  }

  get hideOnDefault() {
    return this._visibility === FilterVisibility.HIDDEN_ON_DEFAULT; 
  }
}

Object.assign( FilterVisibility, {
  VISIBLE: 0,
  HIDDEN: 1,
  HIDDEN_ON_DEFAULT: 2,
  dontCareVisibility: new FilterVisibility(0)
});


module.exports = FilterVisibility;
