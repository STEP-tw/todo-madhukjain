let DefaultHandler = require('./defaultHandler.js');

class AddItemHandler extends DefaultHandler{
  constructor(todoApp) {
    super();
    this.todoApp=todoApp;
  }
  execute(req,res){
    let user = req.user;
    let todoID = req.body.todoID;
    let title = req.body.title;
    this.todoApp.addItem(user.userName,todoID,title);
    res.redirect(req.originalUrl);
  }
}
module.exports=AddItemHandler;
