const http = require('http'),
      app = require('./app'),
      server = http.createServer(app)

server.listen(app.get('PORT'), () => {
    console.log(`Server is runnnig on: http://localhot/${app.get('PORT')}`)
})