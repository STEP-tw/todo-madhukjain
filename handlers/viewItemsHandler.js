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
    res.setHeader('Content-Type','text/html');
    res.write(this.toHtml(todoID,items));
    res.end();
  }
  toHtml(todoID,items){
    let itemsID=Object.keys(items);
    let htmlStr='';
    itemsID.forEach(id=>{
      let style='text-decoration:'
      if(items[id].getStatus()) style += 'line-through'
      htmlStr += `<b style=${style}>${items[id].getObjective()}</b>
      ${this.generateButton(todoID,items[id],'deleteItem','Delete')}`;
    });
    return htmlStr;
  }
  generateButton(todoID,item,fnName,btText){
    return `<button onclick="${fnName}('${todoID}','${item.getId()}')">${btText}</button>`
  }
}

module.exports= ViewItemsHandler;
