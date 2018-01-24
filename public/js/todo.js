const doXmlRequest = function (method,url,callback,data) {
  const xml=new XMLHttpRequest();
  xml.open(method,url);
  xml.onload=callback;
  xml.send(data);
};


const displayList=function () {
  document.getElementById('lists').innerHTML=this.response;
};

const deleteTodo =function(todoID){
  const deleteUrl='/deleteList';
  doXmlRequest('post',deleteUrl,() => {window.location.reload();},`todoID=${todoID}`);
};

const viewItems=function (todoID) {
  document.getElementById('todo-id').value=todoID;
  document.getElementById('viewItems').submit();
};

const editTodo = function(todoID){
  document.getElementById('editTodo').style.display = "block";
};

window.onload=function () {
  doXmlRequest('get','/viewList',displayList);
};
