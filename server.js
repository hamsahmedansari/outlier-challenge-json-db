const express = require('express')
const bodyParser = require('body-parser')

const api = require('./api')
const middleware = require('./middleware')

const PORT = process.env.PORT || 1337

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/health', api.getHealth)
app.get(['/:studentId/', '/:studentId/*'], api.getStudent)
app.put('/:studentId/*', api.updateStudent)
app.delete('/:studentId/*', api.deleteStudent)

app.use(middleware.handleError)
app.use(middleware.notFound)

const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
)

if (require.main !== module) {
  module.exports = server
}
