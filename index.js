const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')


function staticRoot(staticPath, req, res){
  
  let pathObj = url.parse(req.url, true)
  if(pathObj.pathname==='/') {
    pathObj.pathname = '/index.html' 
  }
  console.log(pathObj)
  let delay = pathObj.query.t*1000 || 0

  let filePath = path.join(staticPath,'public', pathObj.pathname)
  

  fs.readFile(filePath, 'binary', function(err, fileContent){
    if(err){
      console.log('404')
      res.writeHead(404, 'not found')
      res.end('<h1>404 Not Found</h1>')
    }else{
      console.log('ok')
      setTimeout(function(){
        res.write(fileContent, 'binary')
        res.end()  
      }, delay)
    
    }
  })

}

let server = http.createServer(function(req, res){
  staticRoot(__dirname, req, res)
})

server.listen(8080)
console.log('打开 http://localhost:8080' )


