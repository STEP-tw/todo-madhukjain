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
  




})
