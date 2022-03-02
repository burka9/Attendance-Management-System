import mongoose from 'mongoose'
import { Server } from "socket.io"

let io = null

export default server => {
  io = new Server(server)
  
  io.on('connection', socket => {
    console.log(`${socket.id} connected`)

    socket.on('check_db', () => {
      socket.emit('db_status', mongoose.connection.readyState)
    })
  })
}

export function send(event, payload) {
  io.emit(event, payload)
}