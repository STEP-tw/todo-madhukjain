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
      htmlStr += `<b >${todos[id].getTitle()}</b>
       ${this.generateButton(todos[id],'deleteTodo','Delete')}
       ${this.generateButton(todos[id],'editTodo','Edit')}
       ${this.generateButton(todos[id],'viewItems','View Items')}`;
    });
    return htmlStr;
  }
  generateButton(todo,fnName,btText){
    return `<button onclick="${fnName}('${todo.getId()}')">${btText}</button>`
  }
}

module.exports=ViewListHandler;
