async function faker(type) {
  return (await axios.get('/test/faker', { params: { type } })).data.item
}

let socket = io('/')
socket.on('disconnect', () => db.connecting())
socket.on('db_connected', () => db.connected())
socket.on('db_connection_failed', () => db.failed())
socket.on('db_status', msg => {
  switch (msg) {
    case 0:
      db.failed()
      break
    case 1:
      db.connected()
      // waitingList.fetchWaitingList()
      // visitedList.fetchVisitedList()
      break
    default:
      db.connecting()
  }
})
setInterval(() => socket.emit('check_db'), 5000)
setInterval(() => show.now = new Date(), 999)

let show = new Vue({
  el: '#choice',
  data: {
    now: new Date(),
  },
  computed: {
    time() { return this.now.toLocaleTimeString() }
  },
  methods: {
    reg() {
      waitingList.show = true
      visitedList.show = true
      attendance.show = false
      waitingList.fetchWaitingList()
      visitedList.fetchVisitedList()
    },
    att() {
      waitingList.show = false
      visitedList.show = false
      attendance.show = true
      visitedList.fetchAcceptedList()
    },
  },
  created() {
  }
})

let db = new Vue({
  el: '#database',
  data: {
    color: 'grey',
    status: 'Connecting...',
  },
  computed: {
    style() {
      return `--bg: ${this.color}`
    }
  },
  created() {
    socket.emit('check_db')
  },
  methods: {
    connecting() {
      this.status = 'Connecting...'
      this.color = 'grey'
    },
    connected() {
      this.status = 'Connected'
      this.color = 'green'
    },
    failed() {
      this.status = 'Connection failed'
      this.color = 'red'
    },
    async drop(type) {
      let filter = {
        seeker: type == 'all' || type == 'seeker',
        client: type == 'all' || type == 'client',
      }

      if (type == 'timestamp') await axios.post('/test/reset-client-timestamp')

      else await axios.post('/test/drop-collection', filter)

      waitingList.fetchWaitingList()
      visitedList.fetchVisitedList()
      visitedList.fetchAcceptedList()
    }
  },
})

let waitingList = new Vue({
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
      'info': 'Showing Detail Personal Information',
    },
    response: 'App Init',
    show: true,
  },
  async created() {
    this.log('fetch')
    await this.fetchWaitingList()
    this.log('show')
  },
  computed: {
    waitList() {
      return [...this.waitListUnformatted].filter(item => {
        item.registrationDate = new Date(item.registrationDate).toDateString()
        return true
      })
    },
  },
  methods: {
    log(key) { this.response = this.logMessages[key] },
    async fetchWaitingList() {
      this.waitListUnformatted = (await axios.get('/api/attendance/waiting-list')).data.list
    },
    clr() {
      this.log('clear')
      this.clear()
    },
    clear() {
      this.name = ''
      this.phone = ''
      this.address = ''
      this.sex = ''
    },
    async random() {
      this.log('random')
      this.name = await faker('name')
      this.phone = await faker('phone')
      this.address = await faker('address')
      this.sex = Math.floor(Math.random()*10)%2==0 ? 'male' : 'female'
    },
    async addPerson() {
      if (this.name != '' && this.phone != '' && this.address != '' && this.sex != '') {
        this.log('adding')
        let res = ''
        res = await axios.post('/api/attendance/waiting-list', {
          name: this.name,
          phone: this.phone,
          address: this.address,
          sex: this.sex
        })
        this.log('success')
        this.clear(true)
        this.fetchWaitingList()
      }
    },
    load(person) {
      this.log('info')
      visitedList.load(person)
    }
  } // methods
})


let visitedList = new Vue({
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
      jobType: '',
    },

    marital: [
      'Not married',
      'Married',
      'Divorced',
      'Widow',
      'Abandoned',
    ],

    visitListUnformatted: [],
    acceptListUnformatted: [],

    show: true
  },
  async created() {
    this.fetchVisitedList()
    this.fetchAcceptedList()
  },
  computed: {
    visitList() {
      return [...this.visitListUnformatted].filter(item => {
        item.form.formDate = new Date(item.form.formDate).toDateString()
        return true
      })
    },
    acceptList() {
      return [...this.acceptListUnformatted].filter(item => {
        item.acceptedDate = new Date(item.acceptedDate).toDateString()
        return true
      })
    },
  },
  methods: {
    async fetchVisitedList() {
      this.visitListUnformatted = (await axios.get('/api/attendance/waiting-list/visit')).data.list
    },
    async fetchAcceptedList() {
      this.acceptListUnformatted = (await axios.get('/api/attendance/waiting-list/accept')).data.list
    },
    async addChild() {
      this.children.push({
        name: await faker('name'),
        schooling: await faker('schooling')
      })
    },
    removeChild() { this.children.pop() },
    setChildren() {
      let count = Math.floor(Math.random() * 4)
      this.children = []
      for (let i=0; i<count; i++) this.addChild()
    },
    clear() {
      this.id = ''
      this.name = ''
      this.phone = ''
      this.address = ''
      this.birthday = ''
      this.maritalStatus = ''
      this.children = []
      this.jobStatus = ''
      this.rent = ''
      this.health = ''
      this.remark = ''

      this.spouse = {
        name: '',
        jobType: '',
      }

      document.querySelector('input[type=file]').value = ''
    },
    load(person) {
      this.clear()
      let { _id, name, address, phone } = person

      visitedList.id = _id
      visitedList.name = name
      visitedList.address = address
      visitedList.phone = phone
    },
    async random() {
      if (this.name == '') return
      this.birthday = await faker('birthday')
      this.maritalStatus = await faker('maritalStatus')
      this.children = []
      this.jobStatus = await faker('jobStatus')
      this.rent = await faker('rent')
      this.health = await faker('health')
      this.remark = await faker('remark')

      this.maritalStatus = this.marital[Math.floor(Math.random() * this.marital.length)]

      if (this.maritalStatus == 'Married') {
        this.spouse['name'] = await faker('name'),
        this.spouse['jobType'] = await faker('jobStatus')
      }

      this.setChildren()
    },
    async visit() {
      if (this.name == '') return

      let data = new FormData()
      data.append('attachment', document.querySelector('input[type=file]').files[0])
      data.append('id', this.id)
      data.append('birthday', this.birthday)
      data.append('maritalStatus', this.maritalStatus)
      data.append('children', JSON.stringify(this.children))
      data.append('jobStatus', this.jobStatus)
      data.append('rent', this.rent)
      data.append('health', this.health)
      data.append('remark', this.remark)
      if (this.maritalStatus == 'Married')
        data.append('spouse', JSON.stringify(this.spouse))

      let response = await axios.put('/api/attendance/waiting-list/visit', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (response.status == 200) {
        this.clear()
        this.fetchVisitedList()
        waitingList.fetchWaitingList()
      }
    },
    getRecording(person) {
      person['playing'] = false
      return person.form.attachments[0] ? `/attachments/recordings/${person.form.attachments[0].name}` : false
    },
    play(p) {
      let elt = document.getElementById('audio' + p._id)

      if (!p.playing) {
        elt.play()
        p.playing = true
      }
      else {
        elt.pause()
        p.playing = false
      }

    },
    stop(p) {
      let elt = document.getElementById('audio' + p._id)
      elt.pause()
      elt.currentTime = 0
      p.playing = false
    },
    async accept(p) {
      let response = await axios.put('/api/attendance/waiting-list/accept', {
        id: p._id
      })

      if (response.status == 200) {
        this.fetchVisitedList()
        this.fetchAcceptedList()
      }
    },
  }, // methods
})


let attendance = new Vue({
  el: '#attendance',
  data: {
    show: false,
    unformattedList: [],
  },
  created() {
    visitedList.fetchAcceptedList()
    setInterval(() => visitedList.fetchAcceptedList(), 999)
  },
  computed: {
    list() {
      return [...visitedList.acceptList].filter(item => {
        item.checked = typeof item.checked == 'undefined' ? false : item.checked
        item.reason = typeof item.reason == 'undefined' ? '' : item.reason
        return true
      })
    },
  },
  methods: {
    last5(p) {
      let temp = [...Object.values(p.attendance ? p.attendance : {})]
      
      while (temp.length < 5) temp.push(false)

      return temp.slice(temp.length-5)
    },
    async rand(p) {
      p.checked = Math.floor(Math.random()*10)%2 == 0
      
      if (!p.checked)
        p.reason = await faker('remark')
      
    },
    async check(id, type) {
      await axios.post('/api/attendance/check', {
        id: id,
        checked: type == 0,
        hasReason: type == 1,
        reason: type == 1 ? await faker('remark') : ''
      })
    },
  }, // methods
})

// show.att()