const doXmlRequest = function (method,url,callback,data) {
  const xml=new XMLHttpRequest();
  xml.open(method,url);
  xml.onload=callback;
  xml.send(data);
};
const toKeyValue = (kv) => {
  const parts = kv.split('=');
  return {key:parts[0].trim(),value:parts[1].trim()};
};

const accumulate = (o,kv) => {
  o[kv.key] = kv.value;
  return o;
};

const addItem = function () {
  const objective = document.getElementById('objective').value;
  doXmlRequest('post','/addItem',() => {window.location.reload();},`todoID=${id}&title=${objective}&redirect=${window.location.href}`);
};

const parseBody = function(text){
  return text && text.split('&').map(toKeyValue).reduce(accumulate,{}) || {};
};

const parseQuery = function(url){
  const urlOpts = url.split('?');
  return {url:urlOpts[0],query:parseBody(urlOpts[1])};
};

const displayItems=function () {
  document.getElementById('items').innerHTML=this.response;
};

const deleteItem =function(todoID,itemID){
  doXmlRequest('post','/deleteItem',() => {window.location.reload();},`todoID=${todoID}&itemID=${itemID}`);
};

const updateStatus =function(todoID,itemID){
  doXmlRequest('post','/updateStatus',() => {window.location.reload();},`todoID=${todoID}&itemID=${itemID}`);
};

// const viewItems=function (todoID) {
//   document.getElementById('todo-id').value=todoID;
//   document.getElementById('viewItems').submit();
// };

window.onload=function () {
  const url=window.location.href;
  id=parseQuery(url).query.todoID;
  console.log(id);
  if(!id) {
    window.location.href='/index.html';
    return ;
  }
  doXmlRequest('post','/viewItems',displayItems,`todoID=${id}`);
};
