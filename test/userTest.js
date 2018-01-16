const chai = require('chai');
const assert = chai.assert;
const User = require('../lib/user.js');

describe('user',()=>{
  describe('#getName',()=>{
    it('Should return name of the user',()=>{
      let user = new User('Madhuri');
      assert.equal(user.getName(),'Madhuri');
    })
  });

});
