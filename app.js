const http = require('http');
const fs = require('fs');
const WebApp = require('./webapp');
const registered_users = [{userName:'madhu'}];
let toDo = JSON.parse(fs.readFileSync('./data/toDoTitles.json','utf8'));

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
  console.log(req.method + ' '+ req.url);
  let extension = getExtension(req.url);
  let contentType = getContentType(extension);
  res.setHeader('Content-type',contentType);
  res.write(fs.readFileSync('./public' + req.url));
};

app.get('/',(req,res) => {
  res.statusCode = 302;
  res.redirect('/index.html');
});

app.get('/index.html',(req,res) => {
  console.log('/index.html');
  displayContent(req,res);
  res.end();
});

app.post('/index.html',(req,res) => {
  let user = registered_users.find(u=>u.userName==req.body.name);
  if (!user) {
    res.redirect('/index.html');
    return;
  }
  res.redirect('/toDos.html');
});

app.get('/toDos.html',(req,res) =>{
  displayContent(req,res);
  res.end();
});

app.post('/toDos.html',(req,res) =>{
  fs.writeFileSync('./data/toDoTitles.json',JSON.stringify(toDo,null,2));
  let obj = {};
  obj.title = req.body.title;
  obj.description = req.body.description;
  toDo.push(obj);
  displayContent(req,res);
  toDo.forEach((obj)=> {
    res.write(`<h2>Title:<a href="toDoItem.html">${obj.title}</a></h2>`);
  });
  res.end();
});

app.get('/toDoItem.html',(req,res)=>{
  displayContent(req,res);
  res.end();
});

app.post('/toDoItem.html',(req,res) =>{
  fs.writeFileSync('./data/toDoTitles.json',JSON.stringify(toDo,null,2));
  let object = {};

});
module.exports = app;
