"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function faker(_x) {
  return _faker.apply(this, arguments);
}

function _faker() {
  _faker = _asyncToGenerator(function* (type) {
    return (yield axios.get('/test/faker', {
      params: {
        type
      }
    })).data.item;
  });
  return _faker.apply(this, arguments);
}

var socket = io('/');
socket.on('disconnect', () => db.connecting());
socket.on('db_connected', () => db.connected());
socket.on('db_connection_failed', () => db.failed());
socket.on('db_status', msg => {
  switch (msg) {
    case 0:
      db.failed();
      break;

    case 1:
      db.connected(); // waitingList.fetchWaitingList()
      // visitedList.fetchVisitedList()

      break;

    default:
      db.connecting();
  }
});
setInterval(() => socket.emit('check_db'), 5000);
setInterval(() => show.now = new Date(), 999);
var show = new Vue({
  el: '#choice',
  data: {
    now: new Date()
  },
  computed: {
    time() {
      return this.now.toLocaleTimeString();
    }

  },
  methods: {
    reg() {
      waitingList.show = true;
      visitedList.show = true;
      attendance.show = false;
      waitingList.fetchWaitingList();
      visitedList.fetchVisitedList();
    },

    att() {
      waitingList.show = false;
      visitedList.show = false;
      attendance.show = true;
      visitedList.fetchAcceptedList();
    }

  },

  created() {}

});
var db = new Vue({
  el: '#database',
  data: {
    color: 'grey',
    status: 'Connecting...'
  },
  computed: {
    style() {
      return "--bg: ".concat(this.color);
    }

  },

  created() {
    socket.emit('check_db');
  },

  methods: {
    connecting() {
      this.status = 'Connecting...';
      this.color = 'grey';
    },

    connected() {
      this.status = 'Connected';
      this.color = 'green';
    },

    failed() {
      this.status = 'Connection failed';
      this.color = 'red';
    },

    drop(type) {
      return _asyncToGenerator(function* () {
        var filter = {
          seeker: type == 'all' || type == 'seeker',
          client: type == 'all' || type == 'client'
        };
        if (type == 'timestamp') yield axios.post('/test/reset-client-timestamp');else yield axios.post('/test/drop-collection', filter);
        waitingList.fetchWaitingList();
        visitedList.fetchVisitedList();
        visitedList.fetchAcceptedList();
      })();
    }

  }
});
var waitingList = new Vue({
  el: '#waiting-list',
  data: {
    name: '',
    phone: '',
    address: '',
    sex: '',
    waitListUnformatted: [],
    logMessages: {
      'fetch': 'Fetching list',
      'show': 'Showing List',
      'random': 'Random Clicked',
      'adding': 'Adding to List Clicked',
      'success': 'Person added to List',
      'fail': 'Person not added to List',
      'clear': 'Clear Clicked',
      'info': 'Showing Detail Personal Information'
    },
    response: 'App Init',
    show: true
  },

  created() {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.log('fetch');

      yield _this.fetchWaitingList();

      _this.log('show');
    })();
  },

  computed: {
    waitList() {
      return [...this.waitListUnformatted].filter(item => {
        item.registrationDate = new Date(item.registrationDate).toDateString();
        return true;
      });
    }

  },
  methods: {
    log(key) {
      this.response = this.logMessages[key];
    },

    fetchWaitingList() {
      var _this2 = this;

      return _asyncToGenerator(function* () {
        _this2.waitListUnformatted = (yield axios.get('/api/waiting-list')).data.list;
      })();
    },

    clr() {
      this.log('clear');
      this.clear();
    },

    clear() {
      this.name = '';
      this.phone = '';
      this.address = '';
      this.sex = '';
    },

    random() {
      var _this3 = this;

      return _asyncToGenerator(function* () {
        _this3.log('random');

        _this3.name = yield faker('name');
        _this3.phone = yield faker('phone');
        _this3.address = yield faker('address');
        _this3.sex = Math.floor(Math.random() * 10) % 2 == 0 ? 'male' : 'female';
      })();
    },

    addPerson() {
      var _this4 = this;

      return _asyncToGenerator(function* () {
        if (_this4.name != '' && _this4.phone != '' && _this4.address != '' && _this4.sex != '') {
          _this4.log('adding');

          var res = '';
          res = yield axios.post('/api/waiting-list', {
            name: _this4.name,
            phone: _this4.phone,
            address: _this4.address,
            sex: _this4.sex
          });

          _this4.log('success');

          _this4.clear(true);

          _this4.fetchWaitingList();
        }
      })();
    },

    load(person) {
      this.log('info');
      visitedList.load(person);
    }

  } // methods

});
var visitedList = new Vue({
  el: '#visited-list',
  data: {
    id: '',
    name: '',
    phone: '',
    address: '',
    birthday: '',
    maritalStatus: '',
    children: [],
    jobStatus: '',
    rent: '',
    health: '',
    remark: '',
    spouse: {
      name: '',
      jobType: ''
    },
    marital: ['Not married', 'Married', 'Divorced', 'Widow', 'Abandoned'],
    visitListUnformatted: [],
    acceptListUnformatted: [],
    show: true
  },

  created() {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      _this5.fetchVisitedList();

      _this5.fetchAcceptedList();
    })();
  },

  computed: {
    visitList() {
      return [...this.visitListUnformatted].filter(item => {
        item.form.formDate = new Date(item.form.formDate).toDateString();
        return true;
      });
    },

    acceptList() {
      return [...this.acceptListUnformatted].filter(item => {
        item.acceptedDate = new Date(item.acceptedDate).toDateString();
        return true;
      });
    }

  },
  methods: {
    fetchVisitedList() {
      var _this6 = this;

      return _asyncToGenerator(function* () {
        _this6.visitListUnformatted = (yield axios.get('/api/waiting-list/visit')).data.list;
      })();
    },

    fetchAcceptedList() {
      var _this7 = this;

      return _asyncToGenerator(function* () {
        _this7.acceptListUnformatted = (yield axios.get('/api/waiting-list/accept')).data.list;
      })();
    },

    addChild() {
      var _this8 = this;

      return _asyncToGenerator(function* () {
        _this8.children.push({
          name: yield faker('name'),
          schooling: yield faker('schooling')
        });
      })();
    },

    removeChild() {
      this.children.pop();
    },

    setChildren() {
      var count = Math.floor(Math.random() * 4);
      this.children = [];

      for (var i = 0; i < count; i++) {
        this.addChild();
      }
    },

    clear() {
      this.id = '';
      this.name = '';
      this.phone = '';
      this.address = '';
      this.birthday = '';
      this.maritalStatus = '';
      this.children = [];
      this.jobStatus = '';
      this.rent = '';
      this.health = '';
      this.remark = '';
      this.spouse = {
        name: '',
        jobType: ''
      };
      document.querySelector('input[type=file]').value = '';
    },

    load(person) {
      this.clear();
      var {
        _id,
        name,
        address,
        phone
      } = person;
      visitedList.id = _id;
      visitedList.name = name;
      visitedList.address = address;
      visitedList.phone = phone;
    },

    random() {
      var _this9 = this;

      return _asyncToGenerator(function* () {
        if (_this9.name == '') return;
        _this9.birthday = yield faker('birthday');
        _this9.maritalStatus = yield faker('maritalStatus');
        _this9.children = [];
        _this9.jobStatus = yield faker('jobStatus');
        _this9.rent = yield faker('rent');
        _this9.health = yield faker('health');
        _this9.remark = yield faker('remark');
        _this9.maritalStatus = _this9.marital[Math.floor(Math.random() * _this9.marital.length)];

        if (_this9.maritalStatus == 'Married') {
          _this9.spouse['name'] = yield faker('name'), _this9.spouse['jobType'] = yield faker('jobStatus');
        }

        _this9.setChildren();
      })();
    },

    visit() {
      var _this10 = this;

      return _asyncToGenerator(function* () {
        if (_this10.name == '') return;
        var data = new FormData();
        data.append('attachment', document.querySelector('input[type=file]').files[0]);
        data.append('id', _this10.id);
        data.append('birthday', _this10.birthday);
        data.append('maritalStatus', _this10.maritalStatus);
        data.append('children', JSON.stringify(_this10.children));
        data.append('jobStatus', _this10.jobStatus);
        data.append('rent', _this10.rent);
        data.append('health', _this10.health);
        data.append('remark', _this10.remark);
        if (_this10.maritalStatus == 'Married') data.append('spouse', JSON.stringify(_this10.spouse));
        var response = yield axios.put('/api/waiting-list/visit', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.status == 200) {
          _this10.clear();

          _this10.fetchVisitedList();

          waitingList.fetchWaitingList();
        }
      })();
    },

    getRecording(person) {
      person['playing'] = false;
      return person.form.attachments[0] ? "/attachments/recordings/".concat(person.form.attachments[0].name) : false;
    },

    play(p) {
      var elt = document.getElementById('audio' + p._id);

      if (!p.playing) {
        elt.play();
        p.playing = true;
      } else {
        elt.pause();
        p.playing = false;
      }
    },

    stop(p) {
      var elt = document.getElementById('audio' + p._id);
      elt.pause();
      elt.currentTime = 0;
      p.playing = false;
    },

    accept(p) {
      var _this11 = this;

      return _asyncToGenerator(function* () {
        var response = yield axios.put('/api/waiting-list/accept', {
          id: p._id
        });

        if (response.status == 200) {
          _this11.fetchVisitedList();

          _this11.fetchAcceptedList();
        }
      })();
    }

  } // methods

});
var attendance = new Vue({
  el: '#attendance',
  data: {
    show: false,
    unformattedList: []
  },

  created() {
    visitedList.fetchAcceptedList();
    setInterval(() => visitedList.fetchAcceptedList(), 999);
  },

  computed: {
    list() {
      return [...visitedList.acceptList].filter(item => {
        item.checked = typeof item.checked == 'undefined' ? false : item.checked;
        item.reason = typeof item.reason == 'undefined' ? '' : item.reason;
        return true;
      });
    }

  },
  methods: {
    last5(p) {
      var temp = [...Object.values(p.attendance ? p.attendance : {})];

      while (temp.length < 5) {
        temp.push(false);
      }

      return temp.slice(temp.length - 5);
    },

    rand(p) {
      return _asyncToGenerator(function* () {
        p.checked = Math.floor(Math.random() * 10) % 2 == 0;
        if (!p.checked) p.reason = yield faker('remark');
      })();
    },

    check(id, type) {
      return _asyncToGenerator(function* () {
        yield axios.post('/api/attendance/check', {
          id: id,
          checked: type == 0,
          hasReason: type == 1,
          reason: type == 1 ? yield faker('remark') : ''
        });
      })();
    }

  } // methods

}); // show.att()