const chai = require('chai');
const assert = chai.assert;
const User = require('../public/user.js');

describe('user',()=>{
  describe('#getName',()=>{
    it('Should return name of the user',done=>{
      let user = new User('Madhuri');
      assert.equal(user.getName(),'Madhuri');
      done();
    })
  });

});
