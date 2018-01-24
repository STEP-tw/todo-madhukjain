const fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
/* ================================*/
const StaticFileHandler = require('./handlers/staticFileHandler.js');
const ResourceNotFound = require('./handlers/resourceNotFound.js');
const AddListHandler = require('./handlers/addListHandler.js');
const ViewListHandler = require('./handlers/viewListHandler.js');
const DeleteTodoHandler = require('./handlers/deleteTodoHandler.js');
const DeleteItemHandler = require('./handlers/deleteItemHandler.js');
const ViewItemsHandler = require('./handlers/viewItemsHandler.js');
const AddItemHandler = require('./handlers/addItemHandler.js');
const UpdateStatusHandler = require('./handlers/updateStatusHandler.js');
const UpdateItemHandler = require('./handlers/updateItemHandler.js');
const TodoApp = require('./lib/todoApp');


const todoApp=new TodoApp();

todoApp.addUser('veera','pwd')
    .addUser('madhuri','pass');

const staticFileHandler = new StaticFileHandler('./public');
const resourceNotFound = new ResourceNotFound('resource not found');
const addListHandler = new AddListHandler(todoApp);
const viewListHandler = new ViewListHandler(todoApp);
const deleteTodoHandler = new DeleteTodoHandler(todoApp);
const deleteItemHandler = new DeleteItemHandler(todoApp);
const viewItemsHandler = new ViewItemsHandler(todoApp);
const addItemHandler = new AddItemHandler(todoApp);
const updateStatusHandler = new UpdateStatusHandler(todoApp);
const updateItemHandler = new UpdateItemHandler(todoApp);

/*=========================*/

const toS = (o) => JSON.stringify(o,null,2);
const registered_users = [
  {userName:'veera',name:'veera venkata durga prasad'},
  {userName:'madhuri',name:'jain'}];

const logRequest = (req,res,next) => {
  const text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  // fs.appendFile('request.log',text,() => {});
  console.log(`${req.method} ${req.url} `);

  next();
};



const loadUser = (req,res,next) => {
  const sessionid = req.cookies.sessionid;
  const user = registered_users.find((u) => u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
  next();
};

const redirectLoggedOutUserToLogin = function (req,res,next) {
  let urls=['/','/index.html','/logout','/viewList','/addList','/viewItems','/todoItem.html'];
  if(urls.includes(req.url)&&!req.user) {
    res.redirect('login.html');
    return ;
  }
  next();
};

const app = express();



app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true,type:()=>true }));

app.use(loadUser);
app.use(redirectLoggedOutUserToLogin);
app.use(logRequest);

app.get('/',(req,res,next)=>{
  req.url='/index.html';
  next();
})

app.use(express.static('public'));
app.post('/login',(req,res) => {
  const user = registered_users.find((u) => u.userName==req.body.userName);
  if(!user) {
    res.setHeader('Set-Cookie',`logOn=false`);
    res.redirect('/login.html');
    return;
  }
  const sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('index.html');
});
app.get('/logout',(req,res) => {
  res.setHeader('Set-Cookie',[`loginFailed=false,Expires=${new Date(1).toUTCString()}`,`sessionid=0,Expires=${new Date(1).toUTCString()}`]);
  delete req.user.sessionid;
  res.redirect('/login.html');
});
app.post('/updateItem',updateItemHandler.getRequestHandler());
app.post('/updateStatus',updateStatusHandler.getRequestHandler());
app.post('/deleteItem',deleteItemHandler.getRequestHandler());
app.post('/addItem',addItemHandler.getRequestHandler());
app.post('/viewItems',viewItemsHandler.getRequestHandler());
app.post('/deleteList',deleteTodoHandler.getRequestHandler());
app.get('/viewList',viewListHandler.getRequestHandler());
app.post('/addList',addListHandler.getRequestHandler());
module.exports = app;
