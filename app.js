const http = require('http');
const fs = require('fs');
const WebApp = require('./webapp');
const registered_users = [{userName:'madhu'}]
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
  let extension = getExtension(req.url);
  let contentType = getContentType(extension);
  res.setHeader('Content-type',contentType);
  res.write(fs.readFileSync('./public' + req.url));
};

app.get('/',(req,res) =>{
  res.redirect("/homePage.html");
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
    res.write(`<h2>Title: ${obj.body.title}</h2>`)
  });
  res.end();
});

app.get('/editToDo.html',(req,res) =>{
  displayContent(req,res);
  res.end();
});

app.get('/deleteToDo.html',(req,res) =>{
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
  fs.writeFileSync('./data/toDoTitles.json',JSON.stringify(toDo,null,2));
  let obj = {};
  obj.body = req.body
  toDo.push(obj);
  displayContent(req,res);
  toDo.forEach((obj)=> {
    res.write(`<h2>Title: ${obj.body.title}</h2>`);
  });
  res.end();
});

exports.app = app;
