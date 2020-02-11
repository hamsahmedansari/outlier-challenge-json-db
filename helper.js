module.exports = {
  decodedURL
}

const validateStudentId = (props) => String(props).replace(/[^\w\s]/gi, '_')

const validateParams = (props) => String(props).replace(/\//g, '.')

function decodedURL (req) {
  const studentId = validateStudentId(req.params.studentId)
  const props = req.params[0] ? validateParams(req.params[0]) : ''
  const data = { ...req.body }
  return { studentId, props, data }
}
