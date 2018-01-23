const http = require('http');
const fs = require('fs');
const PORT = 9099;
const app = require('./app.js');

const server = http.createServer(app);
server.on('error',(e) => console.error('**error**',e.message));
server.listen(PORT,(e) => console.log(`server listening at ${PORT}`));
