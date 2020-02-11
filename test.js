const tape = require('tape')
const jsonist = require('jsonist')
const db = require('./database')

const port = (process.env.PORT = process.env.PORT || require('get-port-sync')())
const endpoint = `http://localhost:${port}`
const studentId = 'hams'
const params = 'my/project'
const payload = { technology: 'Docker' }
const baseURL = `${endpoint}/${studentId}/${params}`
const deleteURL = `${endpoint}/${studentId}/my`

const server = require('./server')

tape('health', async function (t) {
  const url = `${endpoint}/health`
  jsonist.get(url, (err, body) => {
    if (err) t.error(err)
    t.ok(body.success, 'should have successful healthcheck')
    t.end()
  })
})

tape('GET Student and Params', res => {
  db.unLinkFile(studentId)
  jsonist.put(baseURL, payload, (err, body) => {
    if (err) res.error(err)
    jsonist.get(baseURL, (err, body) => {
      if (err) res.error(err)
      res.equals(
        JSON.stringify(body.data), JSON.stringify(payload),
        'TEST should return a valid params/properties '
      )
      res.end()
    })
  })
})

tape('PUT Student and Params', res => {
  db.unLinkFile(studentId)
  jsonist.put(baseURL, payload, (err, body) => {
    if (err) res.error(err)
    res.ok(body.success, 'TEST should return success "TRUE" ')
    res.end()
  })
})

tape('DELETE Existing Student Params/Properties', res => {
  db.unLinkFile(studentId)
  jsonist.put(baseURL, payload, (err, body) => {
    if (err) res.error(err)
    jsonist.delete(baseURL, (err, body) => {
      if (err) res.error(err)
      res.ok(body.success, 'TEST should return success "TRUE" ')
      res.end()
    })
  })
})

tape('DELETE Existing Student With File', res => {
  db.unLinkFile(studentId)
  jsonist.put(baseURL, payload, (err, body) => {
    if (err) res.error(err)
    jsonist.delete(deleteURL, (err, body) => {
      if (err) res.error(err)
      res.ok(body.success, 'TEST should return success "TRUE" ')
      res.end()
    })
  })
})

tape('cleanup', function (t) {
  server.close()
  t.end()
})
