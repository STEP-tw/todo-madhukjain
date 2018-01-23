const DefaultHandler = require('./defaultHandler.js');

class ResourceNotFound extends DefaultHandler{
  constructor(message) {
    super();
    this.message = message;
  }
  execute(req,res){
    res.statusCode=404;
    res.write(this.message.toString());
    res.end();
  }

}

module.exports=ResourceNotFound;
