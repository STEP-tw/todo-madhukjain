const http = require('http');
const fs = require('fs');
const PORT = 9099;
const WebApp = require('./webapp');
let registered_users =
  [{userName:'madhurk',name:'Madhuri Kondekar'}]

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

app.get('/logInPage.html',(req,res) =>{
  res.statusCode = 200;
  res.setHeader('Content-type','text/html');
  res.write(fs.readFileSync('./public' + req.url));
  res.end();
});

app.get('/toDoList.html',(req,res) =>{
  res.statusCode = 200;
  res.setHeader('Content-type','text/html');
  res.write(fs.readFileSync('./public' + req.url));
  res.end();
});

app.post('/toDoList.html',(req,res) =>{
  res.statusCode = 200;
  res.setHeader('Content-type','text/html');
  res.write(fs.readFileSync('./public' + req.url));
  res.end();
});

app.post('/logInPage.html',(req,res) =>{
  let user = registered_users.find(u => u.userName==req.body.name);
  if(!user) {
    res.setHeader('Set-Cookie',`logInFailed=true`);
    res.redirect('/logInPage.html');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/toDoList.html');
});

const server = http.createServer(app);
server.on('error',e => console.error('**error**',e.message));
server.listen(PORT,(e) => console.log(`server listening at ${PORT}`));
