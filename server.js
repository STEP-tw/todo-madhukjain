const http = require('http');
const fs = require('fs');
const PORT = 9099;
const WebApp = require('./webapp');

let registered_users = [{userName:'madhu',name:'Madhuri Kondekar'}]
let toDo = JSON.parse(fs.readFileSync('./data/toDoItem.json','utf8'));
let obj = {};

let app = WebApp.create();

const displayContent = function(req,res){
  res.statusCode = 200;
  res.write(fs.readFileSync('./public' + req.url));
  res.end();
}

app.get('/',(req,res) =>{
  res.statusCode = 200;
  res.setHeader('Content-type','text/html');
  res.write(fs.readFileSync('./public/homePage.html'));
  res.end();
});

app.get('/homePage.html',(req,res) =>{
  res.setHeader('Content-type','text/html');
  displayContent(req,res);
});

app.get('/css/style.css',(req,res) =>{

  res.setHeader('Content-type','text/css');
  displayContent(req,res);
});

app.get('/logInPage.html',(req,res) =>{

  res.setHeader('Content-type','text/html');
  displayContent(req,res);
});

app.get('/toDoList.html',(req,res) =>{
  res.statusCode = 200;
  res.setHeader('Content-type','text/html');
  res.write(fs.readFileSync('./public' + req.url));
  toDo.forEach((obj)=> {
    res.write(`<a href="">${obj.item}</a><br>`)
  });
  res.end();
});

app.post('/toDoList.html',(req,res) =>{
  fs.writeFileSync('./data/toDoItem.json',JSON.stringify(toDo,null,2));
  obj.item = req.body.todo;
  toDo.push(obj);
  obj ={};
  res.statusCode = 200;
  res.setHeader('Content-type','text/html');
  res.write(fs.readFileSync('./public' + req.url));
  toDo.forEach((obj)=> {
    res.write(`<a href="/editPage.html">${obj.item}</a><br>`)
  });
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

app.get('/editPage.html',(req,res) =>{
  console.log("hi");
  res.statusCode = 200;
  res.setHeader('Content-type','text/html');
  res.write(fs.readFileSync('./public' + req.url));
  res.end();
});

const server = http.createServer(app);
server.on('error',e => console.error('**error**',e.message));
server.listen(PORT,(e) => console.log(`server listening at ${PORT}`));
