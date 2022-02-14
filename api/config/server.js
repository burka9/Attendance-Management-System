import { createServer } from 'http'
import express from 'express'
import { connect } from '../database/index.js'
import middleware from '../middleware/index.js'
import path from 'path'
import { mkdir, stat } from 'fs'
import { uploadsFolderPath } from './files.js'
import socket from './socket.js'
import attendance from '../logic/attendance/index.js'



stat(uploadsFolderPath, err => {
  if (err) mkdir(uploadsFolderPath, () => console.log('uploads folder created'))
})

let app = express()
middleware(app)


let server = createServer(app)


export function startServer(port = 3000 || process.env.PORT) {
  server.listen(port, () => {
    console.log(`Server started on port ${port}`)
    socket(server)
    attendance()
  })
  connect()
}