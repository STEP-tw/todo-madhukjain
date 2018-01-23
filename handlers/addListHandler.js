const DefaultHandler = require('./defaultHandler.js');

class AddListHandler extends DefaultHandler{
  constructor(todoApp) {
    super();
    this.todoApp=todoApp;
  }
  execute(req,res){
    const user=req.user;
    const body=req.body;
    if(body.title && body.description){
      this.todoApp.addTodo(user.userName,body.title,body.description);
      res.redirect('index.html');
      return ;
    }
    res.end();
  }

}

module.exports=AddListHandler;
