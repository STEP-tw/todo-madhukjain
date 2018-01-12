const http = require('http');
const fs = require('fs');
const PORT = 9099;
let toS = o => JSON.stringify(o,null,2);
const WebApp = require('./webapp');

let app = WebApp.create();


app.get('/',(req,res) =>{
  res.statusCode = 200;
  res.setHeader('Content-type','text/html');
  res.write(fs.readFileSync('./public/homePage.html'));
  res.end();
});

app.get('/homePage.html',(req,res) =>{
  res.statusCode = 200;
  res.setHeader('Content-type','text/html');
  res.write(fs.readFileSync('./public' + req.url));
  res.end();
});

app.get('/css/style.css',(req,res) =>{
  res.statusCode = 200;
  res.setHeader('Content-type','text/css');
  res.write(fs.readFileSync('./public' + req.url));
  res.end();
});

app.post('/logInPage.html',(req,res) =>{
  res.statusCode = 200;
  res.setHeader('Content-type','text/html');
  res.write(fs.readFileSync('./public' + req.url));
  res.end();
});

const server = http.createServer(app);
server.on('error',e => console.error('**error**',e.message));
server.listen(PORT,(e) => console.log(`server listening at ${PORT}`));
