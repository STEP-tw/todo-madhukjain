const DefaultHandler = require('./defaultHandler.js');

class UpdateStatusHandler extends DefaultHandler{
  constructor(todoApp) {
    super();
    this.todoApp = todoApp;
  }
  execute(req,res){
    const user = req.user;
    const todoID = req.body.todoID;
    const itemID = req.body.itemID;
    this.todoApp.updateStatus(user.userName,todoID,itemID);
    res.end();
  }
}
module.exports = UpdateStatusHandler;
