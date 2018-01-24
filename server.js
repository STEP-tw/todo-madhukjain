const http = require('http');
const fs = require('fs');
const PORT = 9099;
const app = require('./app.js');



const server = http.createServer((req,res)=>{
    app(req,res);
});
server.on('error',(e) => console.error('**error**',e.message));
server.on('listening',() => console.log(`server listening at ${server.address().port}`));
server.listen(PORT);
