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

const getInputValue = function(id){
  return document.getElementById(id).value;
}

const updateTodo =function () {
  let editDiv= document.querySelector('.edit');
  let title=editDiv.querySelector('[name="todoTitle"]').value;
  let desc=editDiv.querySelector('[name="todoDes"]').value;
  let id=editDiv.querySelector('[name="todoID"]').value;
  let data=`title=${title}&todoID=${id}&description=${desc}`;

  doXmlRequest('post','/updateTodo',() => {window.location.reload();},data);
}

const editTodo = function(todoID){
  let editDiv= document.querySelector('.edit');
  editDiv.classList.remove('hidden');
  editDiv.querySelector('[name="todoTitle"]').value = getInputValue(`${todoID}_title`);
  editDiv.querySelector('[name="todoDes"]').value = getInputValue(`${todoID}_desc`);
  editDiv.querySelector('[name="todoID"]').value = todoID;
  editDiv.querySelector('[name="cancel"]').onclick = function(){
    editDiv.classList.add('hidden');
  }
  editDiv.querySelector('[name="save"]').onclick = updateTodo;
}

window.onload=function () {
  doXmlRequest('get','/viewList',displayList);
};
