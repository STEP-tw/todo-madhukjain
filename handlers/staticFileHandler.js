let fs = require('fs');
let DefaultHandler = require('./defaultHandler.js');

class StaticFileHandler extends DefaultHandler{
  constructor(root,fs=fs) {
    super();
    this.fs = fs;
    this.root = root;
  }
  execute(req,res){
    this.writeFileContent(req,res);
  }
  getExtension(url) {
    let extension = url.slice(url.lastIndexOf('.'));
    return extension;
  }
  getContentType(extension){
    let contentType = {
      ".html": "text/html",
      ".css": "text/css",
      '.js':'text/javascript',
      ".jpg":"image/jpg",
      ".jpeg":"image/jpeg"
    }
    return contentType[extension];
  }
  getFilePath(url){
    if (url == '/'){
      return `${this.root}/index.html`;
    }
    return `${this.root}${url}`
  }
  writeFileContent(req,res){
    let extension = this.getExtension(req.url);
    let contentType = this.getContentType(extension);
    let path = this.getFilePath(req.url);
    res.setHeader('Content-type',contentType);
    if(this.fs.existsSync(path)){
      res.statusCode=200;
      res.write(this.fs.readFileSync(path));
    }
    res.end();
  }
}

module.exports = StaticFileHandler;
