const chai = require('chai');
const assert = chai.assert;
const request = require('./requestSimulator.js');
process.env.COMMENT_STORE = "../data/toDoTitles.json";
const app = require('../app.js').app;
const th = require('./testHelper.js');

describe('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  });

  describe('GET /homePage.html',()=>{
    it('responds with 200',done=>{
      request(app,{method:'GET',url:'/homePage.html'},(res)=>{
        assert.equal(res.statusCode,200);
        done();
      })
    })
  });

  describe('GET /',()=>{
    it('redirects to homePage.html',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.should_be_redirected_to(res,'/homePage.html');
        assert.equal(res.body,"");
        done();
      })
    })
  });

  describe('GET /',()=>{
    it('responds with 302',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.should_be_redirected_to(res,'/homePage.html');
        assert.equal(res.statusCode,302);
        done();
      })
    })
  });
  
})
