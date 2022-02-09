import { findClient, updateClient } from '../database/controller/client.js'

const DELAY = 999
let counter = 0

export default function () {
  let now
  setInterval(async () => {
    now = new Date()

    if (now.getSeconds()%30 == 0) {
      // check if client's temp attendance
      let clients = await findClient()

      clients.forEach(client => {
        client.attendance = {...client.attendance, ...{
          [now.toLocaleTimeString()]: {
            checked: client.temp.checked,
            hasReason: client.temp.hasReason,
            reason: client.temp.reason,
          }
        }}
        
        client.temp = {
          checked: false,
          hasReason: false,
          reason: ''
        }

        let _id = client._id
        delete client._id
        updateClient({ _id }, client)
      })
    }
  }, DELAY)
}