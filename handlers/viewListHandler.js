let DefaultHandler = require('./defaultHandler.js');

class ViewListHandler extends DefaultHandler{
  constructor(todoApp) {
    super();
    this.todoApp=todoApp;
  }
  execute(req,res){
    let user=req.user;
    if(user.userName){
      let todos=this.todoApp.getTodos(user.userName);
      res.write(this.toHtml(todos));
      res.end();
    }
  }
  toHtml(todos){
    let todoIds=Object.keys(todos);
    let htmlStr='';
    todoIds.forEach(id=>{
      htmlStr += `<b >${todos[id].getTitle()}</b> ${this.generateDelete(todos[id])}`;
    });
    return htmlStr;
  }
  generateDelete(todo){
    let htmlStr='';
    htmlStr += `<button onclick="deleteTodo('${todo.getId()}')">delete</button>`;
    return htmlStr;
  }

}

module.exports=ViewListHandler;
