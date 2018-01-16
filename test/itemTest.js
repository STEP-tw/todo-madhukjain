const chai = require('chai');
const assert = chai.assert;
const Item = require('../lib/item.js');

describe("Item",()=>{
  describe("#getItemText",()=>{
    it("Should return text of the item",()=>{
      let item = new Item("Write test");
      assert.equal(item.getItemText(),"Write test");
    })
  });

  describe("#getStatus",()=>{
    it("Should return status of the item for default",()=>{
      let item = new Item("Write test");
      assert.equal(item.getStatus(),false);
    });
    it("Should return status of the item for specified status",()=>{
      let item = new Item("Write test",true);
      assert.equal(item.getStatus(),true);
    });
  });

  describe("#markAsDone",()=>{
    it("Should set status as true",()=>{
      let item = new Item("Write test");
      item.markAsDone();
      assert.equal(item.getStatus(),true);
    });
  });

  describe("#markAsNotDone",()=>{
    it("Should set status as false",()=>{
      let item = new Item("Write test",true);
      item.markAsNotDone();
      assert.equal(item.getStatus(),false);
    });
  });

  describe("#editItemText",()=>{
    it("Should edit the item text",()=>{
      let item = new Item("Write test",true);
      item.editItemText("Read Book");
      assert.equal(item.getItemText(),"Read Book");
    });
  });
})
