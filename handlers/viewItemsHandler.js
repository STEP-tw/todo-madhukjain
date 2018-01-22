let DefaultHandler = require('./defaultHandler.js');

class ViewItemsHandler extends DefaultHandler{
  constructor(todoApp) {
    super();
    this.todoApp = todoApp;
  }
  execute(req,res){
    let user = req.user;
    let todoID = req.body.todoID;
    let items=this.todoApp.getItems(user.userName,todoID);
    res.write(JSON.stringify(items));
    res.end();
  }
}

module.exports= ViewItemsHandler;
