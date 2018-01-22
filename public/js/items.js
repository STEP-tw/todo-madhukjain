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



const deleteTodo =function(todoID){
  let deleteUrl='/deleteList';
  doXmlRequest('post',deleteUrl,()=>{window.location.reload()},`todoID=${todoID}`);
}

const viewItems=function (todoID) {
  document.getElementById('todo-id').value=todoID;
  document.getElementById('viewItems').submit();
}

window.onload=function () {
  let url=window.location.href;
  let id=parseQuery(url).query.todoID;
  doXmlRequest('post','/viewItems',displayItems,`todoID=${id}`);
}
