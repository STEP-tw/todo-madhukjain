const chai = require('chai');
const assert = chai.assert;
const List = require('../lib/list.js');
const Item = require('../lib/item.js');

describe("List",()=>{
  describe("#getTitle",()=>{
    it("Should return title of the list",()=>{
      let list = new List("Today's Work","Planning of the day");
      assert.equal(list.getTitle(),"Today's Work");
    });
  });

  describe("#getDescription",()=>{
    it("Should return description of the list",()=>{
      let list = new List("Today's Work","Planning of the day");
      assert.equal(list.getDescription(),"Planning of the day");
    });
  });

  describe("#getItems",()=>{
    it("Should return whole empty ItemList from the list",()=>{
      let list = new List("Today's Work","Planning of the day");
      assert.deepEqual(list.getItems(),{});
    });
    it("Should return whole ItemList from the list",()=>{
      let list = new List("Today's Work","Planning of the day");
      list.addItem("Planning");
      list.addItem("Reading");
      let expected = {Planning:{itemText:"Planning",status:false},
                      Reading:{itemText:"Reading",status:false}}
      assert.deepEqual(list.getItems(),expected);
    });
  });

  describe("#getItem",()=>{
    it("Should return item from the list",()=>{
      let list = new List("Today's Work","Planning of the day");
      list.addItem("Planning");
      list.addItem("Reading");
      assert.deepEqual(list.getItem("Planning"),new Item("Planning"));
    });
  });

  describe("#addItem",()=>{
    it("Should add item in the items",()=>{
      let list = new List("Today's Work","Planning of the day");
      list.addItem("Planning");
      assert.deepEqual(list.getItems(),{Planning: new Item("Planning")});
    });
  });

  describe("#deleteItem",()=>{
    it("Should delete item from the items",()=>{
      let list = new List("Today's Work","Planning of the day");
      list.addItem("Planning");
      list.addItem("Reading");
      let expected = {Planning:{itemText:"Planning",status:false},
                      Reading:{itemText:"Reading",status:false}};
      assert.deepEqual(list.getItems(),expected);
      list.deleteItem("Planning");
      assert.deepEqual(list.getItems(),{Reading: new Item("Reading")});
    });
  });

  describe('#editListTitle',()=>{
    it('should edit title of the list',()=>{
      let list = new List("Today's Work","Planning of the day");
      list.editListTitle("Tomorrow's Work");
      assert.deepEqual(list.getTitle(),"Tomorrow's Work");
    });
  });

  describe('#editListDescription',()=>{
    it('should edit description of the list title',()=>{
      let list = new List("Today's Work","Planning of the day");
      list.editListDescription("Planning for tomorrow");
      assert.deepEqual(list.getDescription(),"Planning for tomorrow");
    })
})
});
