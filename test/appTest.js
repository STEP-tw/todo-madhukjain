const chai = require('chai');
const assert = chai.assert;
const request = require('./requestSimulator.js');
const app = require('../app.js');
const th = require('./testHelper.js');

describe('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    });
  });
  describe('POST /login', () => {
  it('redirects to index.html for valid user', done => {
    request(app, {
      method: 'POST',
      url: '/login',
      body: 'userName=veera'
    }, res => {
      th.should_be_redirected_to(res, 'index.html');
      th.should_not_have_cookie(res, 'message');
      done();
    })
  })
  it('redirects to login.html with message for invalid user', done => {
    request(app, {
      method: 'POST',
      url: '/login',
      body: 'username=badUser'
    }, res => {
      th.should_be_redirected_to(res, '/login.html');
      done();
    })
  })
});




})
