function two(s) {
  if( Number(s) < 10 ) {
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

  removeListener(evname,cb) { }

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
    this._apps = [ 'dig' ]; 
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
    console.log('selecting type',index);
    this.emit('onchange', this.selectedType );
  }
}


class LogStore extends EventEmiiter {
  constructor() {
    super();
    this.model = [];
    this.lastFetch = null;
    this.offset = 0;
    this.noffset = 0;
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
    return this.offset + 30 < this.total;
  }

  get hasPrev() {
    return this.offset > 0;
  }

  pageTo(offset) {
    if( offset === 'tail' ) {
      offset = this.total - 30;
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

  fetchLog(date,app,type) {
    var f = { date, app, type };
    this._fetchTotal(f);
    this.lastFetch = f;
  }

  _logName(fetch) {
    return `/logs/${fetch.date}/${fetch.app}/${fetch.type}`;
  }

  _fetchTotal(fetch) {
    this.total = 0;
    var opts = {
      url: this._logName(fetch) + '?wantCount=1',
      error: this.ajaxError
    }
    opts.success = data => {
      // breakout for debugging;
      var result = JSON.parse(data);
      if( typeof result[0] === 'number' ) {
        console.log('total result', result, ' data:', data);
        this.total = result[0];
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
      url: this._logName(fetch),
      error: this.ajaxError
    }
    if( this.offset ) {
      opts.url += '?offset=' + this.offset;
    }
    opts.success = data => {
      // breakout for debugging;
      this.model = JSON.parse(data);
      this.emit('update',this.model)
    };
    $.ajax(opts);  
  }

  ajaxError( jqXHR, textStatus, errorThrown ) {
    var err = errorThrown instanceof Error ? errorThrown : new Error(errorThrown || textStatus);
    console.log(err);
  }
}

var DateSelect = React.createClass({
  getInitialState: function() {
    var dates = [];
    var mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

    for( var i = 0; i < 5; i++ ) {
      var d = new Date();
      d.setDate( d.getDate() - i);
      var obj = {
        val: formatNowForName(d),
        text: mon[ d.getMonth() ] + ' ' + d.getDate()
      }
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

  onSelect: function(val) {
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

  onSelect: function(val) {
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

var LogViewerLine = React.createClass({

  uaFormat: function(i,key,value) {
    var ua = value;
    if( value.match(/Googlebot/) !== null ) {
      value = 'Googlebot';
    } else if( value.match(/^server$/) !== null ) {
      value = '';
    } else if( value.match(/Firefox/) !== null ) {
      value = 'Firefox';
    } else if( value.match(/bingbot/) !== null ) {
      value = 'Bing';
    } else if( value.match(/facebookexternalhit/) !== null ) {
      value = 'Facebook';
    } else if( value.match(/Yahoo! Slurp/) !== null ) {
      value = 'Yahoo bot';
    } else if( value.match(/CC Metadata Scaper/) !== null ) {
      value = 'CC scraper';
    } else if( value.match(/Chrome/) !== null ) {
      value = 'Chrome';
    } else if( value.match(/Safari/) !== null ) {
      value = 'Safari';
    } else if( value.match(/Trident/) !== null ) {
      value = 'IE';
    } else if( value.match(/Opera/) !== null ) {
      value = 'Opera';
    } else if( value.match(/AhrefsBot/) !== null ) {
      value = 'AhrefsBot';
    } else if( value.match(/Macintosh; Intel Mac OS X [0-9_]+\) AppleWebKit/) !== null ) {
      value = 'AppleWebKit';
    } else {
      value = value.replace(/Mozilla\/[0-9\.]+ \(compatible;/,'');
      if( value.length > 20 ) {
        value = value.substr(0,30) + '... ';
      }
    }
    return (<span className={key} key={i} data-ua={ua}> {value} </span>);
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
    var ampm = h > 11 ? 'pm' : 'am';
    h %= 12;
    if( !h ) {
      h = 12;
    }
    m = two(m);
    var text = `${h}:${m}${ampm}`;
    return (<span className={key} key={i}> {text} </span>);
  },

  stackFormat: function(i,key,value) {

    value = value.split("\n");

    return(<span className={key} key={i}>
        <div className="dropdown">
          <a href="#" data-toggle="dropdown" className="dropdown-toggle">{key}{" "}<b className="caret"></b></a>
          <ul className="dropdown-menu">
          {value.map( (t,i) => <li key={i}>{t}</li> )}
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

    this.statusFormat = this.genericFormat;
    this.reqFormat    = this.stackFormat;

    if( method in this ) {
      return this[method](i,key,value);
    }
    return this.genericFormat(i,key,value);
  },

  render: function() {
    var m = this.props.model;
    var keys = Object.keys(m);
    var children = keys.map( (k,i) => this.formatKey(i,k,m[k]) );
    return (
        <li>{children}</li>
      )
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

  render: function() {
    return (
          <ul className="log-viewer">
          <li key="0">offset: {this.props.store.offset} of {this.props.store.total}</li>
          { this.state.model.map( (m,i) => <LogViewerLine key={i+1} model={m} /> ) }
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
    this.props.store.pageBy( -30 );
  },

  onNext: function() {
    this.props.store.pageBy( 30 );
  },
  
  onTail: function() {
    this.props.store.pageTo( 'tail' );
  },
};

var NextButton = React.createClass({
  mixins: [ LogPager ],

  render: function() {
    var showNext = this.state.hasNext;
    return( 
        <li>
          {showNext 
            ? <button onClick={this.onNext} className="btn">next</button>
            : null
          }
        </li>
      )
  },

});

var TailButton = React.createClass({
  mixins: [ LogPager ],

  render: function() {
    var showTail = !this.state.atEnd;
    return (
        <li>
          {showTail
            ? <button onClick={this.onTail} className="btn">tail</button>
            : null
          }
        </li>
      )
  },

});

var HeadButton = React.createClass({
  mixins: [ LogPager ],

  render: function() {
    var showHead = !this.state.atHead;
    return (
        <li>
          {showHead
            ? <button onClick={this.onHead} className="btn">head</button>
            : null
          }
        </li>
      )
  },

});

var PrevButton = React.createClass({
  mixins: [ LogPager ],

  render: function() {
    var showPrev = this.state.hasPrev;
    return (
        <li>
          {showPrev
            ? <button onClick={this.onPrev} className="btn">prev</button>
            : null
          }
        </li>
      )
  },

})


var Header = React.createClass({

  getInitialState: function() {
    var dateStore = new DateStore();
    var appStore  = new AppStore();
    var typeStore = new LogTypeStore();
    return { dateStore, appStore, typeStore }
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

  logChange: function(arg) {
    var date = this.state.dateStore.selectedDate;
    var app  = this.state.appStore.selectedApp;
    var type = this.state.typeStore.selectedType;
    console.log('got log change',arg,date,app,type);
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
    return (
        <div>
          <Header store={this.props.store} />
          <LogViewer store={this.props.store} />
        </div>
      );
  }
});

ReactDOM.render(
  <Page store={logStore} />, document.getElementById('content')
);


