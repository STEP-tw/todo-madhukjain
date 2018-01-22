let DefaultHandler = require('./defaultHandler.js');

class ViewListHandler extends DefaultHandler{
  constructor(todoApp) {
    super();
    this.todoApp=todoApp;
  }
  execute(req,res){
    let user=req.user;
      let todos=this.todoApp.getTodos(user.userName);
      res.write(this.toHtml(todos));
      res.end();
  }
  toHtml(todos){
    let todoIds=Object.keys(todos);
    let htmlStr='';
    todoIds.forEach(id=>{
      htmlStr += `<b >${todos[id].getTitle()}</b> ${this.generateDelete(todos[id])} ${this.generateEdit(todos[id])}`;
    });
    return htmlStr;
  }
  generateDelete(todo){
    let htmlStr='';
    htmlStr += `<button onclick="deleteTodo('${todo.getId()}')">delete</button>`;
    return htmlStr;
  }
  generateEdit(todo){
    let editButton = ''
    editButton += `<button onclick="editTodo('${todo.getId()}')">Edit</button>`;
    return editButton;
  }
}

module.exports=ViewListHandler;
