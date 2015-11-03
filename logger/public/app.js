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

class LogStore extends EventEmiiter {
  constructor() {
    super();
    this.model = [];
  }

  fetchLog(date,app,type) {
    date = date || formatNowForName();
    app = app || 'dig';
    type = type || 'app';
    var opts = {
      url: `/logs/${date}/${app}/${type}`
    }
    opts.success = data => {
      // breakout for debugging;
      this.model = JSON.parse(data);
      this.emit('update',this.model)
    };
    opts.error = ( jqXHR, textStatus, errorThrown ) => {
      var err = errorThrown instanceof Error ? errorThrown : new Error(errorThrown || textStatus);
      console.log(err);
    };
    $.ajax(opts);  
  }
}

var DateLabel = React.createClass({
  getInitialState: function() {
    var date = this.props.store.selectedDate;
    return { date };
  },

  componentWillMount: function() {
    this.props.store.on('onchange',this.dateChanged);
  },

  componentWIllUnmount: function() {
    this.props.store.removeListener('onchange',this.dateChanged);
  },

  dateChanged: function(date) {
    this.setState( { date } ); 
  },

  render: function() {
    return (
        <div className="date-label">
          {"Date selected: "}{this.state.date}
        </div>
      );
  }
})


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
    this.props.onDateSelected(val);
  },

  render: function() {

    return (
      <div className="date-select">
        <select onChange={this.onSelect} ref="date-picker">
        {this.state.dates.map( d => <option key={d.val} value={d.val}>{d.text}</option> )}
        </select>
        <DateLabel store={this.props.store} />
      </div>
    );
  }
});

var LogViewerLine = React.createClass({

  uaFormat: function(i,key,value) {
    var ua = value;
    if( value.match(/Googlebot/) !== null ) {
      value = 'Googlebot';
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
    } else if( value.length > 20 ) {
      value = value.substr(0,20) + '...';
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

  genericFormat: function(i,key,value) {
    var text = value + '';
    return (<span className={key} key={i}> {text} </span>);
  },

  formatKey: function(i,key,value) {
    var method = key + 'Format';

    this.statusFormat = this.genericFormat;

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
    this.props.store.fetchLog();
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
          { this.state.model.map( (m,i) => <LogViewerLine key={i} model={m} /> ) }
          </ul>
      );
  }

});

var LogPicker = React.createClass({

  getInitialState: function() {
    var dateStore = new DateStore();
    return { dateStore }
  },

  onDateSelected: function(date) {
    this.props.store.fetchLog(date);
  },

  render: function() {
    return(
      <div>
        <DateSelect store={this.state.dateStore} onDateSelected={this.onDateSelected} />
        <LogViewer store={this.props.store} />
      </div>
      );
  }
});

var logStore = new LogStore();

ReactDOM.render(
  <LogPicker store={logStore} />,
  document.getElementById('content')
);


