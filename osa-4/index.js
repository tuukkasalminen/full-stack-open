const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const config = require('./utils/config')

mongoose.connect(config.mongoUrl)
.then( () => {
  console.log('connected', config.mongoUrl)
})
.catch( err => {
  console.log(err)
})

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.logger)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.error)

const server = http.createServer(app)

const PORT = config.port
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}