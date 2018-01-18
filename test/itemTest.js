const chai = require('chai');
const assert = chai.assert;
const Item = require('../lib/item.js');

describe("Item",()=>{
  describe("#getItemText",()=>{
    it("Should return text of the item",()=>{
      let item = new Item("Write test",1);
      assert.equal(item.getText(),"Write test");
    });
  });

  describe("#getStatus",()=>{
    it("Should return status of the item for default",()=>{
      let item = new Item("Write test",1);
      assert.equal(item.getStatus(),false);
    });
    it("Should return status of the item for specified status",()=>{
      let item = new Item("Write test",1,true);
      assert.equal(item.getStatus(),true);
    });
  });

  describe("#getId",()=>{
    it("Should return status of the item for default",()=>{
      let item = new Item("Write test",1);
      assert.equal(item.getId(),1);
    });
  });

  describe("#markAsDone",()=>{
    it("Should set status as true",()=>{
      let item = new Item("Write test",1);
      item.markAsDone();
      assert.equal(item.getStatus(),true);
    });
  });

  describe("#markAsNotDone",()=>{
    it("Should set status as false",()=>{
      let item = new Item("Write test",1,true);
      item.markAsNotDone();
      assert.equal(item.getStatus(),false);
    });
  });

  describe("#editText",()=>{
    it("Should edit the item text",()=>{
      let item = new Item("Write test",1,true);
      item.editText("Read Book");
      assert.equal(item.getText(),"Read Book");
    });
  });
});
