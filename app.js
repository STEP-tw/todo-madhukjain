const fs = require('fs');
const http = require('http');
const timeStamp = require('./time.js').timeStamp;
const WebApp = require('./webapp');
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

let todoApp=new TodoApp();

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

let toS = o=>JSON.stringify(o,null,2);
let registered_users = [
  {userName:'veera',name:'veera venkata durga prasad'},
  {userName:'madhuri',name:'jain'}];

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
  let urls = ['/','/index.html','/logout','/viewList','/addList','/viewItems','/todoItem.html'];
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

app.post('/updateItem',updateItemHandler.getRequestHandler());
app.post('/updateStatus',updateStatusHandler.getRequestHandler());
app.post('/deleteItem',deleteItemHandler.getRequestHandler());
app.post('/addItem',addItemHandler.getRequestHandler());
app.post('/viewItems',viewItemsHandler.getRequestHandler());
app.post('/deleteList',deleteTodoHandler.getRequestHandler());
app.get('/viewList',viewListHandler.getRequestHandler());
app.post('/addList',addListHandler.getRequestHandler());
app.postprocess(staticFileHandler.getRequestHandler());
app.postprocess(resourceNotFound.getRequestHandler())
module.exports = app;
