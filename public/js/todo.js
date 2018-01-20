const doXmlRequest = function (method,url,callback,data) {
  let xml=new XMLHttpRequest();
  xml.open(method,url);
  xml.onload=callback;
  xml.send(data);
}


const displayList=function () {
  document.getElementById('lists').innerHTML=this.response;
}

const deleteTodo =function(todoID){
  let deleteUrl='/deleteList';
  doXmlRequest('post',deleteUrl,()=>{window.location.reload()},`todoID=${todoID}`);
}
window.onload=function () {
  doXmlRequest('get','/viewList',displayList);
}
