const http = require('http');
const fs = require('fs');
const PORT = 9099;
const WebApp = require('./webapp');
const registered_users = [{userName:'madhu',name:'Madhuri Kondekar'}]
let toDo = JSON.parse(fs.readFileSync('./data/toDoItem.json','utf8'));
let records = {}
let obj = {};

const getExtension = function(fileName) {
  let extension = fileName.slice(fileName.lastIndexOf('.'));
  return extension;
};

const getContentType = function(extension) {
  let contentType = {
    ".html": "text/html",
    ".css": "text/css",
  }
  return contentType[extension];
};

const app = WebApp.create();

const displayContent = function(req,res){
  let extension = getExtension(req.url);
  let contentType = getContentType(extension);
  res.statusCode = 200;
  res.setHeader('Content-type',contentType);
  res.write(fs.readFileSync('./public' + req.url));
};

app.get('/',(req,res) =>{
  res.statusCode = 200;
  res.setHeader('Content-type','text/html');
  res.write(fs.readFileSync('./public/homePage.html'));
  res.end();
});

app.get('/homePage.html',(req,res) =>{
  displayContent(req,res);
  res.end();
});

app.get('/css/style.css',(req,res) =>{
  displayContent(req,res);
  res.end();
});

app.get('/logInPage.html',(req,res) =>{
  displayContent(req,res);
  res.end();
});

app.get('/toDoList.html',(req,res) =>{
  displayContent(req,res);
  toDo.forEach((obj)=> {
    res.write(`<a href="">${obj.item}</a><br>`)
  });
  res.end();
});

app.get('/editPage.html',(req,res) =>{
  displayContent(req,res);
  res.end();
});

app.post('/logInPage.html',(req,res) =>{
  let user = registered_users.find(u => u.userName==req.body.name);
  if(!user) {
    res.redirect('/logInPage.html');
    return;
  }
  res.redirect('/toDoList.html');
});

app.post('/toDoList.html',(req,res) =>{
  fs.writeFileSync('./data/toDoItem.json',JSON.stringify(toDo,null,2));
  obj.item = req.body.todo;
  toDo.push(obj);
  obj = {};
  displayContent(req,res);
  toDo.forEach((obj)=> {
    res.write(`<a href="/editPage.html"> ${obj.item}</a><br>`);
  });
  res.end();
});

const server = http.createServer(app);
server.on('error',e => console.error('**error**',e.message));
server.listen(PORT,(e) => console.log(`server listening at ${PORT}`));
