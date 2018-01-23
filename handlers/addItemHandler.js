const DefaultHandler = require('./defaultHandler.js');

class AddItemHandler extends DefaultHandler{
  constructor(todoApp) {
    super();
    this.todoApp=todoApp;
  }
  execute(req,res){
    const user = req.user;
    const todoID = req.body.todoID;
    const title = req.body.title;
    this.todoApp.addItem(user.userName,todoID,title);
    res.redirect(`/todoItem.html?todoID=${todoID}`);
  }
}
module.exports=AddItemHandler;
