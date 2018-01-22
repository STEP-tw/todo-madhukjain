const doXmlRequest = function (method,url,callback,data) {
  let xml=new XMLHttpRequest();
  xml.open(method,url);
  xml.onload=callback;
  xml.send(data);
}
const toKeyValue = kv=>{
  let parts = kv.split('=');
  return {key:parts[0].trim(),value:parts[1].trim()};
};

const accumulate = (o,kv)=> {
  o[kv.key] = kv.value;
  return o;
};

const addItem = function () {
  let objective = document.getElementById('objective').value;
  doXmlRequest('post','/addItem',function(){window.location.reload()},`todoID=${id}&title=${objective}&redirect=${window.location.href}`);
}

const parseBody = function(text){
  return text && text.split('&').map(toKeyValue).reduce(accumulate,{}) || {};
};

const parseQuery = function(url){
  let urlOpts = url.split('?');
  return {url:urlOpts[0],query:parseBody(urlOpts[1])}
}

const displayItems=function () {
  document.getElementById('items').innerHTML=this.response;
}

const deleteItem =function(todoID,itemID){
  let deleteUrl='/deleteItem';
  doXmlRequest('post',deleteUrl,()=>{window.location.reload()},`todoID=${todoID}&itemID=${itemID}`);
}

const viewItems=function (todoID) {
  document.getElementById('todo-id').value=todoID;
  document.getElementById('viewItems').submit();
}

window.onload=function () {
  let url=window.location.href;
  id=parseQuery(url).query.todoID;
  doXmlRequest('post','/viewItems',displayItems,`todoID=${id}`);
}
