const chai = require('chai');
const assert = chai.assert;
const Item = require('../lib/item.js');

describe("Item",()=>{

   describe('accesing data',()=>{
     describe("#getObjective",()=>{
       it("should return objective of the item",()=>{
         let item = new Item("Write test",1);
         assert.equal(item.getObjective(),"Write test");
       });
     });

     describe("#getStatus",()=>{
       it("should return status of the item for default",()=>{
         let item = new Item("Write test",1);
         assert.equal(item.getStatus(),false);
       });
       it("should return status of the item for specified status",()=>{
         let item = new Item("Write test",1,true);
         assert.equal(item.getStatus(),true);
       });
     });

     describe("#getId",()=>{
       it("should return id of the item",()=>{
         let item = new Item("Write test",1);
         assert.equal(item.getId(),1);
       });
     });
   });

   describe('updating data',()=>{
     describe("#updateStatus",()=>{
       it("should set status as true",()=>{
         let item = new Item("Write test",1);
         item.updateStatus();
         assert.equal(item.getStatus(),true);
       });
       it("should set status as false",()=>{
         let item = new Item("Write test",1,true);
         item.updateStatus();
         assert.equal(item.getStatus(),false);
       });
     });

     describe("#updateObjective",()=>{
       it("should update the item objective",()=>{
         let item = new Item("Write test",1,true);
         item.updateObjective("Read Book");
         assert.equal(item.getObjective(),"Read Book");
       });
     });
   });
});
