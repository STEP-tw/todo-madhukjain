const fs = require('fs');
const http = require('http');
const timeStamp = require('./time.js').timeStamp;
const WebApp = require('./webapp');
const StaticFileHandler=require('./handlers/staticFileHandler.js');
const ResourceNotFound=require('./handlers/resourceNotFound.js');

const staticFileHandler=new StaticFileHandler('./public');
const resourceNotFound=new ResourceNotFound('resource not found');
let toS = o=>JSON.stringify(o,null,2);


let logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});

  console.log(`${req.method} ${req.url}`);
}

const app = WebApp.create();

app.use(logRequest);

app.postprocess(staticFileHandler.getRequestHandler());
app.postprocess(resourceNotFound.getRequestHandler())
module.exports = app;
