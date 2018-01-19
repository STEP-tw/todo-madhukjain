const chai = require('chai');
const assert = chai.assert;
const StaticFileHandler = require('../handlers/staticFileHandler.js');
const fs = require('./fsSimulator.js');
const request = require('./requestSimulator.js');
const th = require('./testHelper.js');

fs.addFile({name:'veera.html',content:'i am human'})
  .addFile({name:'mk/madhuri.css',content:'hello'})
  .addFile({name:'mk/index.html',content:'i am index of dummy site'})

describe('staticFileHandler',()=>{
  describe('GET /bad file',()=>{
    it('body should be empty for not existing files',done=>{
      let staticFileHandler=new StaticFileHandler('',fs);
      request(staticFileHandler.getRequestHandler(),{method:'GET',url:'bad file'},(res)=>{
        th.body_contains(res,'');
        done();
      });
    });
  });
  describe('GET / ',()=>{
    it('body should be contain content of index page ',done=>{
      let staticFileHandler=new StaticFileHandler('mk',fs);
      request(staticFileHandler.getRequestHandler(),{method:'GET',url:'/'},(res)=>{
        th.body_contains(res,'i am index of dummy site');
        done();
      });
    });
  });
  describe('existing file ',()=>{
    it('body should contain content',done=>{
      let staticFileHandler=new StaticFileHandler('mk',fs);
      request(staticFileHandler.getRequestHandler(),{method:'GET',url:'/madhuri.css'},(res)=>{
        th.body_contains(res,'hello');
        done();
      });
    });
    it('header should contain contentType',done=>{
      let staticFileHandler=new StaticFileHandler('',fs);
      request(staticFileHandler.getRequestHandler(),{method:'GET',url:'veera.html'},(res)=>{
        th.body_contains(res,'i am human');
        assert.equal(res.headers['Content-type'],'text/html');
        done();
      });
    });
  });
});
