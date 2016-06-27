
import PageAdapter from '../services/page-adapter';

/*
  Wraps the PageAdapter service to look like
  a store. (Supposedly fetches raw html from
  the host )
*/
class Page  {

  constructor() {
    this.adapter = PageAdapter;
    this.html = {};
  }

  fetch( name ) {
    return this.adapter.fetch(name)
      .then( html => {
        this.html = html;
      });
  }
}

Page.storeFromPageName = function( name ) {
  var page = new Page();
  return page.fetch( name )
          .then( () => { return page; } );
};

module.exports = Page;