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
      res.write(JSON.stringify(todos));
      res.end();
    }
  }
}

module.exports=ViewListHandler;
