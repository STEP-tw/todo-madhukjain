const chai = require('chai');
const assert = chai.assert;
const StaticFileHandler = require('../handlers/staticFileHandler.js');
const fs = require('./fsSimulator.js');
const request = require('./requestSimulator.js');
const th = require('./testHelper.js');

fs.addFile({name:'veera.html',content:'i am human'})
  .addFile({name:'mk/madhuri.css',content:'hello'})
  .addFile({name:'mk/index.html',content:'i am index of dummy site'});

describe('staticFileHandler',() => {
  describe('GET / ',() => {
    it('body should be contain content of index page ',(done) => {
      const staticFileHandler=new StaticFileHandler('mk',fs);
      const options = {method:'GET',url:'/'};
      request(staticFileHandler.getRequestHandler(),options,(res) => {
        th.body_contains(res,'i am index of dummy site');
        done();
      });
    });
  });
  describe('existing file ',() => {
    it('body should contain content',(done) => {
      const staticFileHandler=new StaticFileHandler('mk',fs);
      const options = {method:'GET',url:'/madhuri.css'};
      request(staticFileHandler.getRequestHandler(),options,(res) => {
        th.body_contains(res,'hello');
        done();
      });
    });
    it('header should contain contentType',(done) => {
      const staticFileHandler=new StaticFileHandler('',fs);
      const options = {method:'GET',url:'veera.html'};
      request(staticFileHandler.getRequestHandler(),options,(res) => {
        th.body_contains(res,'i am human');
        assert.equal(res.headers['Content-type'],'text/html');
        done();
      });
    });
  });
});
