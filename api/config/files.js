import { existsSync } from 'fs'
import path from 'path'

let uploadsFolderPath = path.resolve('uploads')

export { uploadsFolderPath }
export function uploadPath(name) {
  return path.resolve(uploadsFolderPath, name)
}
export function generateName(name) {
  let counter = 1
  while (existsSync(uploadPath(name))) {
    name = `${counter}_${name}`
    counter ++
  }
  return name
}