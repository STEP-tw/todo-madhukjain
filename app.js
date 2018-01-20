const fs = require('fs');
const http = require('http');
const timeStamp = require('./time.js').timeStamp;
const WebApp = require('./webapp');
const StaticFileHandler=require('./handlers/staticFileHandler.js');
const ResourceNotFound=require('./handlers/resourceNotFound.js');

const staticFileHandler=new StaticFileHandler('./public');
const resourceNotFound=new ResourceNotFound('resource not found');
let toS = o=>JSON.stringify(o,null,2);

let registered_users = [{userName:'veera',name:'veera venkata durga prasad'}];

let logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});

  console.log(`${req.method} ${req.url}`);
}

let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};


const redirectLoggedOutUserToLogin = function (req,res) {
  let urls=['/index.html','/logout'];
  if(req.urlIsOneOf(urls) && !req.user)
    res.redirect('login.html');
}


const app = WebApp.create();

app.use(logRequest);
app.use(loadUser);
app.use(redirectLoggedOutUserToLogin);

app.post('/login',(req,res)=>{
  let user = registered_users.find(u=>u.userName==req.body.userName);
  if(!user) {
    res.setHeader('Set-Cookie',`logOn=false`);
    res.redirect('/login.html');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('index.html');
});

app.get('/logout',(req,res)=>{
  res.setHeader('Set-Cookie',[`loginFailed=false,Expires=${new Date(1).toUTCString()}`,`sessionid=0,Expires=${new Date(1).toUTCString()}`]);
  delete req.user.sessionid;
  res.redirect('/login.html');
});
app.postprocess(staticFileHandler.getRequestHandler());
app.postprocess(resourceNotFound.getRequestHandler())
module.exports = app;
