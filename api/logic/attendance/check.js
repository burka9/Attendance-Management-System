import { findClient, updateClient } from '../../database/controller/client.js'

export default now => {
  findClient()
    .then(clients => {
      clients.forEach(client => {
        client.attendance = {...client.attendance, ...{
          [now.toLocaleDateString()]: {
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
  })
}