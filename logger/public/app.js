/* globals $, React, ReactDOM */

const TEN = 10;
const THIRTY = 30;
const FIVE = 5;
const TWENTY = 20;
const ELEVEN = 11;
const TWELVE = 12;

function two(s) {
  if( Number(s) < TEN ) {
    return '0' + s;
  }
  return s + '';
}

function formatNowForName (d) {
  d = d || new Date();
  var curr_date = two(d.getDate());
  var curr_month = two(d.getMonth() + 1); //Months are zero based
  var curr_year = d.getFullYear();
  return ( curr_year + '-' + curr_month + '-' + curr_date );
}

class EventEmiiter {
  constructor() {
    this._events = {};  
  }

  on(evname,cb) {
    if( !(evname in this._events) ) {
      this._events[evname] = [];
    }
    this._events[evname].push(cb);
  }

  emit() {
    var evname = arguments[0];
    if( !(evname in this._events) ) {
      return;
    }
    var args= [];
    for( var i = 1; i < arguments.length; i++ ) {
      args.push( arguments[i]);
    }
    for( var e = 0; e < this._events[evname].length; e++ ) {
      var cb = this._events[evname][e];
      cb.apply(cb,args);
    }
  }

  removeListener() { 
    //console.log( 'removeListener no impl', evname);
  }
}

class DateStore extends EventEmiiter {
  constructor() {
    super(...arguments);
    this._selectedDate = formatNowForName();
  }

  set selectedDate(date) {
    this._selectedDate = date;
    this.emit('onchange',date);
  }

  get selectedDate() {
    return this._selectedDate;
  }
}

class AppStore extends EventEmiiter {
  constructor() {
    super(...arguments);
    this._apps = [ 'dig','ccmixter' ]; 
    this._selected = 0;
  }

  get apps() {
    return this._apps;
  }

  get selectedApp() {
    return this._apps[ this._selected ];
  }

  set selectedApp(index) {
    this._selected = index;
    this.emit('onchange', this.selectedApp );
  }
}

class LogTypeStore extends EventEmiiter {
  constructor() {
    super(...arguments);
    this._types = [ 'app', 'sys' ]; 
    this._selected = 0;
  }

  get types() {
    return this._types;
  }

  get selectedType() {
    return this._types[ this._selected ];
  }

  set selectedType(index) {
    this._selected = index;
    this.emit('onchange', this.selectedType );
  }
}

class LogStore extends EventEmiiter {
  constructor() {
    super();
    this.model = [];
    this.lastFetch = null;
    this._filter = null;
    this.offset = 0; //3270;
  }

  get atEnd() {
    if( this.model.length ) {
      var maybeEndObj = this.model[this.model.length-1];
      if( 'end' in maybeEndObj ) {
        return true;
      }
    }
    return false;
  }

  get atHead() {
    return this.offset === 0;
  }

  get hasNext() {
    return this.offset + THIRTY < this.total;
  }

  get hasPrev() {
    return this.offset > 0;
  }

  pageTo(offset) {
    if( offset === 'tail' ) {
      offset = this.total - THIRTY;
      if( offset < 0 ) {
        offset = 0;
      }
    }
    this.offset = offset;
    this._fetchLog(this.lastFetch);
  }

  pageBy(amount) {
    var off = this.offset + amount;
    if( off < 0 ) {
      off = 0;
    } else {
      if( off > this.total ) {
        off = 'tail';
      }
    }
    this.pageTo(off);
  }

  addFilter(k,v) {
    if( !this._filter ) {
      this._filter = {};
    }
    this._filter[k] = v;
    this.emit('filter',this._filter);
  }

  applyFilter() {
    this.offset = 0;
    this._fetchLog( this.lastFetch );
  }

  clearFilter() {
    this.offset = 0;
    this._filter = null;
    this.emit('filter', {});
    this._fetchLog( this.lastFetch );
  }

  get filter() {
    return this._filter;
  }

  fetchLog(date,app,type) {
    var f = { date, app, type };
    this.offset = 0;
    this._filter = null;
    this._fetchTotal(f);
    this.lastFetch = f;
  }

  _logName(fetch) {
    return `/logs/${fetch.date}/${fetch.app}/${fetch.type}`;
  }

  _fetchTotal(fetch) {
    this.total = 0;
    var opts = {
      url: this._addQueryParams(this._logName(fetch),{wantCount:1}),
      error: this.ajaxError
    };

    opts.success = data => {
      // breakout for debugging;
      var result = JSON.parse(data);
      if( typeof result[0] === 'number' ) {
        this.total = result[0];
        if( this.total > THIRTY ) {
          this.offset = this.total - THIRTY;
        }
        this._fetchLog(fetch);
      } else {
        result.push( {end:'end'} );
        this.total = result.length;
        this.model = result;
        this.emit('update',result);
      }
    };
    $.ajax(opts);  
  }

  _fetchLog(fetch) {
    var opts = {
      url: this._addQueryParams(this._logName(fetch)),
      error: this.ajaxError
    };
    opts.success = data => {
      this.model = JSON.parse(data);
      this.emit('update',this.model);
    };
    $.ajax(opts);  
  }

  _addQueryParams(url,additional) {
    var qp = {};
    if( additional ) {
      Object.assign(qp,additional);
    }
    if( this.offset ) {
      qp.offset = this.offset;
    }
    if( this._filter ) {
      qp.filter = JSON.stringify(this._filter);
    }
    qp = $.param(qp);
    if( qp ) {
      url += '?' + qp;
    }
    return url;
  }

  ajaxError( jqXHR, textStatus, errorThrown ) {
    var err = errorThrown instanceof Error ? errorThrown : new Error(errorThrown || textStatus);
    /* eslint no-console:0 */
    console.log(err);
  }
}

var DateSelect = React.createClass({
  getInitialState: function() {
    var dates = [];
    var mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

    for( var i = 0; i < FIVE; i++ ) {
      var d = new Date();
      d.setDate( d.getDate() - i);
      var obj = {
        val: formatNowForName(d),
        text: mon[ d.getMonth() ] + ' ' + d.getDate()
      };
      dates.push( obj );
    }
    return { dates };
  },

  onSelect: function() {
    var val = this.refs['date-picker'].value;
    this.props.store.selectedDate = val;
  },

  render: function() {
    return (
      <li>
        <select className="form-control" onChange={this.onSelect} ref="date-picker">
        {this.state.dates.map( d => <option key={d.val} value={d.val}>{d.text}</option> )}
        </select>
      </li>
    );
  }
});

var AppSelect = React.createClass({
  
  getInitialState: function() {
    var apps = this.props.store.apps;
    return { apps };
  },

  onSelect: function(/*val*/) {
    var val = this.refs['app-picker'].value;
    this.props.store.selectedApp = val;
  },

  render: function() {
    return (
      <li>
        <select className="form-control" onChange={this.onSelect} ref="app-picker">
        {this.state.apps.map( (d,i) => <option key={i} value={i}>{d}</option> )}
        </select>
      </li>
    );
  }
});

var LogTypeSelect = React.createClass({
  
  getInitialState: function() {
    var types = this.props.store.types;
    return { types };
  },

  onSelect: function(/*val*/) {
    var val = this.refs['type-picker'].value;
    this.props.store.selectedType = val;
  },

  render: function() {
    return (
      <li>
        <select className="form-control" onChange={this.onSelect} ref="type-picker">
        {this.state.types.map( (d,i) => <option key={i} value={i}>{d}</option> )}
        </select>
      </li>
    );
  }

});

var FilterLink = React.createClass({

  onFilter: function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.f( this.props.k, this.props.v );
  },

  render: function() {
    return (
        <span className="filter-link" onClick={this.onFilter}>{this.props.children}</span>
      );
  }
});

var LogViewerLine = React.createClass({

  uaFormat: function(i,key,value) {
    var ua = value;
    var map = [
      { r: /Googlebot/,            v: 'Googlebot' },
      { r: /^server$/,             v: '' },
      { r: /Firefox/ ,             v: 'Firefox' },
      { r: /bingbot/ ,             v: 'Bing' },
      { r: /facebookexternalhit/ , v: 'Facebook' },
      { r: /Yahoo! Slurp/ ,        v: 'Yahoo bot' },
      { r: /CC Metadata Scaper/ ,  v: 'CC scraper' },
      { r: /Chrome/ ,              v: 'Chrome' },
      { r: /Safari/ ,              v: 'Safari' },
      { r: /Trident/ ,             v: 'IE' },
      { r: /Opera/ ,               v: 'Opera' },
      { r: /AhrefsBot/ ,           v: 'AhrefsBot' },
      { r: /Macintosh; Intel Mac OS X [0-9_]+\) AppleWebKit/ , v: 'AppleWebKit' },
    ];

    var found = false;
    for( var x = 0; x < map.length; x++ ) {
      var m = map[x];
      if( ua.match(m.r) !== null ) {
        value = m.v;
        found = true;
        break;
      }
    }

    if( !found ) {
      value = value.replace(/Mozilla\/[0-9\.]+ \(compatible;/,'');
      if( value.length > TWENTY ) {
        value = value.substr(0,THIRTY) + '... ';
      }
    }
    return (<span className={key} key={i} data-ua={ua}> {value} </span>);
  },

  refFormat: function(i,key,url) {
    return (<span className={key} key={i} ><a href={url} target="_blank">{url}</a> </span>);
  },

  urlFormat: function(i,key,url) {
    var text = url.path;
    var q = [];
    for( var k in url.q ) {
      q.push(`${k}=${url.q[k]}`);
    }
    if( q.length ) {
      text += '?' + q.join('&');
    }

    return (<span className={key} key={i}>{text} </span>);
  },

  dateFormat: function(i,key,value) {
    var d = new Date(value);
    var h = d.getHours();
    var m = d.getMinutes();
    var ampm = h > ELEVEN ? 'pm' : 'am';
    h %= TWELVE;
    if( !h ) {
      h = TWELVE;
    }
    m = two(m);
    var text = `${h}:${m}${ampm}`;
    return (<span className={key} key={i}> {text} </span>);
  },

  stackFormat: function(i,key,value) {

    value = value.split('\n');

    return(<span className={key} key={i}>
        <div className="dropdown">
          <a href="#" data-toggle="dropdown" className="dropdown-toggle">{key}{" "}<b className="caret"></b></a>
          <ul className="dropdown-menu">
          {value.map( (t,i) => <li key={i+key}>{t}</li> )}
          </ul>
        </div>
        </span>);
  },

  genericFormat: function(i,key,value) {
    var text = value + '';
    return (<span className={key} key={i}> {text} </span>);
  },

  formatKey: function(i,key,value) {
    var method = key + 'Format';

    var m = (method in this) ? this[method] : this.genericFormat;
    var f = this.props.addFilter;
    var v = value;

    if( typeof v === 'number') {
      v += '';
    }

    return (<FilterLink f={f} key={i} k={key} v={v}>{m(i,key,v)}</FilterLink>);
  },

  render: function() {
    this.statusFormat = this.genericFormat;
    this.reqFormat    = this.stackFormat;

    var m = this.props.model;
    var keys = Object.keys(m);
    var children = keys.map( (k,i) => this.formatKey(i+k,k,m[k]) );
    return (
        <li>{children}</li>
      );
  }
});

/*
var LogFilterItem = React.createClass({

});
*/
var LogFilter = React.createClass({

  getInitialState: function() {
    var filter = this.props.store.filter || {};
    return { filter };
  },

  componentWillMount: function() {
    this.props.store.on( 'update', this.onUpdate );
    this.props.store.on( 'filter', this.onFilter );
  },

  componentWIllUnmount: function() {
    this.props.store.removeListener( 'update', this.onUpdate );
    this.props.store.removeListener( 'filter', this.onFilter );
  },

  onUpdate: function() {
    var filter = this.props.store.filter || {};
    this.setState( { filter } );
  },

  onFilter: function(filter) {
    this.setState( { filter } );
  },

  clear: function() {
    this.props.store.clearFilter();
  },

  doFilter: function() {
    this.props.store.applyFilter();
  },

  val: function(k) {
    var v = null;
    var f = this.state.filter;
    if( typeof f[k] !== 'string' ) {
      var keys = Object.keys(f[k]);
      v = f[k][keys[0]] + '';
    } else {
      v = f[k] + '';
    }
    if( v.length > TWENTY ) {
      return v.substr(0,TWENTY) + '...';
    }
    return v;
  },

  render: function() {
    var f    = this.state.filter;
    var keys = Object.keys(f);
    var kids = keys.map( (k,i) => <li key={i} k={k} className="filter">{k + ': ' + this.val(k)}</li>);
    var fcls = keys.length ? '' : ' disabled';
    return(
        <div className="log-filter">
          <ul>
            {keys.length
              ? null
              : <li key="nn" className="no-filter">{'(none)'}</li>
            }
            {kids}
            <li key="fb"><button onClick={this.doFilter} className={'btn ' + fcls}>{"apply"}</button></li>
            <li key="fb"><button onClick={this.clear} className={'btn btn-warning' + fcls}>{"clear"}</button></li>
          </ul>
        </div>
      );
  }
});

var LogViewer = React.createClass({

  getInitialState: function() {
    this.props.store.fetchLog( formatNowForName(), 'dig', 'app' );
    var model = this.props.store.model;
    return { model };
  },

  componentWillMount: function() {
    this.props.store.on('update',this.onUpdate);
  },

  componentWIllUnmount: function() {
    this.props.store.removeListener('update',this.onUpdate);
  },

  onUpdate: function(model) {
    this.setState( { model } );
  },

  addFilter: function(key,value) {
    this.props.store.addFilter(key,value);
  },

  render: function() {
    return (
          <ul className="log-viewer">
          <li key="0">{'offset: '}{this.props.store.offset}{' of '}{this.props.store.total}</li>
          {this.state.model.map( (m,i) => <LogViewerLine addFilter={this.addFilter} key={i} model={m} /> )}
          </ul>
      );
  }

});

var LogPager = {
  getInitialState: function() {
    return this._atsFromStore();
  },

  _atsFromStore: function() {
    var store = this.props.store;
    var atEnd = store.atEnd;
    var hasNext = store.hasNext;
    var hasPrev = store.hasPrev;
    var atHead  = store.atHead;
    return { atHead, atEnd, hasPrev, hasNext };
  },

  componentWillMount: function() {
    this.props.store.on('update', this.onUpdate);
  },

  componentWIllUnmount: function() {
    this.props.store.removeListener('update', this.onUpdate);
  },

  onUpdate: function() {
    var state = this._atsFromStore();
    this.setState( state );
  },

  onHead: function() {
    this.props.store.pageTo( 0 );
  },

  onPrev: function() {
    this.props.store.pageBy( -THIRTY );
  },

  onNext: function() {
    this.props.store.pageBy( THIRTY );
  },
  
  onTail: function() {
    this.props.store.pageTo( 'tail' );
  },
};

var NextButton = React.createClass({
  mixins: [ LogPager ],

  render: function() {
    var cls = 'btn' + (this.state.hasNext ? '' : ' disabled');
    return( 
        <li>
          <button className={cls} onClick={this.onNext} >{'next'}</button>
        </li>
      );
  },

});

var TailButton = React.createClass({
  mixins: [ LogPager ],

  render: function() {
    var cls = 'btn' + (this.state.atEnd ? ' disabled' : '');
    return (
        <li>
          <button className={cls} onClick={this.onTail} >{'tail'}</button>
        </li>
      );
  },

});

var HeadButton = React.createClass({
  mixins: [ LogPager ],

  render: function() {
    var cls = 'btn' + (this.state.atHead ? ' disabled' : '');
    return (
        <li>
          <button className={cls} onClick={this.onHead} >{'head'}</button>
        </li>
      );
  },

});

var PrevButton = React.createClass({
  mixins: [ LogPager ],

  render: function() {
    var cls = 'btn' + (this.state.hasPrev ? '' : ' disabled');
    return (
        <li>
          <button className={cls} onClick={this.onPrev} >{'prev'}</button>
        </li>
      );
  },

});


var Header = React.createClass({

  getInitialState: function() {
    var dateStore = new DateStore();
    var appStore  = new AppStore();
    var typeStore = new LogTypeStore();
    return { dateStore, appStore, typeStore };
  },

  componentWillMount: function() {
    this.state.dateStore.on('onchange',this.logChange);
    this.state.appStore.on('onchange',this.logChange);
    this.state.typeStore.on('onchange',this.logChange);
  },

  componentWIllUnmount: function() {
    this.state.dateStore.removeListener('onchange',this.logChange);
    this.state.appStore.removeListener('onchange',this.logChange);
    this.state.typeStore.removeListener('onchange',this.logChange);
  },

  logChange: function(/*arg*/) {
    var date = this.state.dateStore.selectedDate;
    var app  = this.state.appStore.selectedApp;
    var type = this.state.typeStore.selectedType;
    this.props.store.fetchLog(date,app,type);
  },

  render: function() {
    return(
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#dig-collapse" aria-expanded="false">
            <span className="sr-only">{"Toggle navigation"}</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            </button>
            <a href="#"><h2>{"Log Viewer"}</h2></a>
          </div>
          <div className="collapse navbar-collapse" id="dig-collapse">
              <ul className="nav navbar-nav">
                <DateSelect store={this.state.dateStore} />
                <AppSelect store={this.state.appStore} />
                <LogTypeSelect store={this.state.typeStore} />
                <HeadButton store={this.props.store} />
                <PrevButton store={this.props.store} />
                <NextButton store={this.props.store} />
                <TailButton store={this.props.store} />
              </ul>
          </div>
        </div>
      </nav>
    );
  }
});

var logStore = new LogStore();

var Page = React.createClass({
  render: function() {
    var s = this.props.store;
    return (
        <div>
          <Header store={s} />
          <LogFilter store={s} />
          <LogViewer store={s} />
        </div>
      );
  }
});

ReactDOM.render(
  <Page store={logStore} />, document.getElementById('content')
);


