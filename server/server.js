const http = require('http')
const app = require('./app')

const port = process.env.PORT||3000

console.log(`listening on port ${port}`)
const server = http.createServer(app)

server.listen(port)