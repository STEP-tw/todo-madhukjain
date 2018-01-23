const DefaultHandler = require('./defaultHandler.js');

class ViewItemsHandler extends DefaultHandler{
  constructor(todoApp) {
    super();
    this.todoApp = todoApp;
  }
  execute(req,res){
    const user = req.user;
    const todoID = req.body.todoID;
    const items=this.todoApp.getItems(user.userName,todoID);
    res.setHeader('Content-Type','text/html');
    res.write(this.toHtml(todoID,items));
    res.end();
  }
  toHtml(todoID,items){
    const itemsID=Object.keys(items);
    let htmlStr='';
    itemsID.forEach((id) => {
      let style='text-decoration:';
      let status='Done';
      if(items[id].getStatus()){
        style += 'red line-through';
        status='undone';
      }
      htmlStr += `<p style="${style}">${items[id].getObjective()}</p>
      ${this.generateButton(todoID,items[id],'deleteItem','Delete')}
      ${this.generateButton(todoID,items[id],'updateStatus',status)}`;
    });
    return htmlStr;
  }
  generateButton(todoID,item,fnName,btText){
    return `<button onclick="${fnName}('${todoID}','${item.getId()}')">${btText}</button>`;
  }
}

module.exports= ViewItemsHandler;
