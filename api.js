const helper = require('./helper')
const db = require('./database')

module.exports = {
  getHealth,
  updateStudent,
  getStudent,
  deleteStudent
}

async function getHealth (req, res, next) {
  res.json({ success: true })
}

async function updateStudent (req, res, next) {
  try {
    const { studentId, props, data } = helper.decodedURL(req)
    const response = await db.putStudent(studentId, props, data)
    res.json({ message: 'Successfully Created/Updated', success: true, response })
  } catch (error) {
    res.status(500).json({ message: 'Request Failed', success: false, error })
  }
}

async function getStudent (req, res, next) {
  try {
    const { studentId, props } = helper.decodedURL(req)
    const data = await db.getStudent(studentId, props)
    res.json({ message: 'Successfully Get', success: true, data })
  } catch (error) {
    res.status(500).json({ message: 'Request Failed', success: false, error })
  }
}

async function deleteStudent (req, res, next) {
  try {
    const { studentId, props } = helper.decodedURL(req)
    const data = await db.deleteStudent(studentId, props)
    res.json({ message: 'Successfully Delete', success: true, data })
  } catch (error) {
    res.status(500).json({ message: 'Request Failed', success: false, error })
  }
}
