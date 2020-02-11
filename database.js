const fs = require('fs')
const path = require('path')
const _ = require('lodash')

const dbPath = path.join(__dirname, 'data')

module.exports = {
  putStudent,
  getStudent,
  deleteStudent,
  unLinkFile
}

// checking and creating folder
if (!fs.existsSync(dbPath)) fs.mkdirSync(dbPath, { recursive: true })

// return Database Path
const getDbPath = (name) => path.join(dbPath, name + '.json')

// is File Exist
const isFileExist = (name) => {
  const filePath = getDbPath(name)
  return fs.existsSync(filePath)
}

// read File
const readFile = (filePath) =>
  JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }))

// write File
const writeFile = (filePath, data) =>
  fs.writeFileSync(filePath, JSON.stringify(data), { encoding: 'utf8' })

// unlinking File
function unLinkFile (studentId) {
  const filePath = getDbPath(studentId)
  if (isFileExist(studentId)) fs.unlinkSync(filePath)
}

// update Student
function putStudent (studentId, props, data) {
  return new Promise((resolve, reject) => {
    try {
      const filePath = getDbPath(studentId)
      let record = isFileExist(studentId) ? readFile(filePath) : {}
      record = _.set(record, props, data)
      writeFile(filePath, record)
      resolve(record)
    } catch (error) {
      reject(error)
    }
  })
}

// get Student
function getStudent (studentId, props) {
  return new Promise((resolve, reject) => {
    try {
      if (!isFileExist(studentId)) return false
      const filePath = getDbPath(studentId)
      let record = readFile(filePath)
      if (!record) throw new Error('No Record Found')
      const payload = (props.length > 0) ? _.get(record, props) : record
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}

// delete Student
function deleteStudent (studentId, props) {
  return new Promise((resolve, reject) => {
    try {
      if (!isFileExist(studentId)) throw new Error('No Student Found')
      const filePath = getDbPath(studentId)
      const record = readFile(filePath)
      const filterRecorded = _.get(record, props)
      if (!filterRecorded) throw new Error('No Data Found')
      _.unset(filterRecorded, props)
      const newRecord = JSON.stringify(filterRecorded)
      if (newRecord === '{}' || typeof newRecord !== 'object') {
        unLinkFile(studentId)
      } else writeFile(filePath, filterRecorded)
      resolve(filterRecorded)
    } catch (error) {
      reject(error)
    }
  })
}
