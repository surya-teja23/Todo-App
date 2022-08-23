//Model Section

let todos;

let savedTasks = JSON.parse(localStorage.getItem('Tasks'))

if(Array.isArray(savedTasks)){
  todos = savedTasks
} else {
todos = [
  {
    title : 'Get groceries',
    duedate : '23-08-2022',
    id : 'id1',
    completed : 'No'
  } , {
    title : 'Wash clothes',
    duedate : '28-07-2021',
    id : 'id2',
    completed : 'No'
  } ,{
    title : 'Prepare Dinner',
    duedate : '02-01-2020',
    id : 'id3',
    completed : 'No'
  }  
]
}
let addTaskBtn = document.querySelector('#addTaskBtn')
addTaskBtn.addEventListener( 'click' , addTask )
let deleteTaskBtn = document.querySelector('#removeAllTasksBtn')
deleteTaskBtn.addEventListener( 'click' , removeAllTasks )


function createTask( title , dueDate) {
  let id = '' + new Date().getTime()
  todos.push(
    {
      title : title,
      duedate : dueDate,
      id : id,
      completed : 'No'
    }
  )
  saveTasks()
}

function removeTask(id){
  todos = todos.filter( todo => {
    if(todo.id == id){
      return false
    }
    else{
      return true
    }
  })
  saveTasks()
}

function removeAllTasks(){
  todos = []
  render()
  saveTasks()
}

function markCompletedTask(id){
  let element = document.getElementById(id)
  let checkbox = element.querySelector('input')
  if(checkbox.checked){
    todos = todos.filter(todo => {
      if(todo.id == id){
        todo.completed = 'Yes'
        return true
      }
      else {
        return true
      }
    })
  } else {
    todos = todos.filter(todo => {
      if(todo.id == id){
        todo.completed = 'No'
        return true
      }
      else {
        return true
      }
    })
  }
  saveTasks()
}

function updateTask(e){
  let element = document.getElementById(e.target.id)
  let inputs = element.querySelectorAll('input')

  let title = inputs[0].value
  let dueDate = inputs[1].value

  if(title == '' && dueDate == ''){
    alert('Task Title and Duedate cannot be empty')
  } else if(title == ''){
    alert('Task Title cannot be empty')
  } else if(dueDate == ''){
    alert('Task Duedate cannot be empty')
  } else{
    todos.forEach(todo => {
      if(todo.id == e.target.id){
        todo.title = title
        todo.duedate = dueDate
      }
    })
  }
  saveTasks()
  render()
}


//Control Section


function addTask(){
  let taskTitle = document.querySelector('#todo-title')
  let title = taskTitle.value

  let taskDueDate = document.querySelector('#todo-dueDate')
  let dueDate = taskDueDate.value
  console.log(dueDate)
  if(title == '' && dueDate == ''){
    alert('Task Title and Duedate cannot be empty')
  } else if(title == ''){
    alert('Task Title cannot be empty')
  } else if(dueDate == ''){
    alert('Task Duedate cannot be empty')
  } else{
    createTask( title , dueDate )
  }
  taskTitle.value = ''
  taskDueDate.value = ''
  render()
}

function completedTask(e){
  let checkbox = e.target

  markCompletedTask(checkbox.id)
  render()
}

function editTask(e){
  let idToEdit = e.target.id
  let element = document.getElementById(idToEdit)
  element.innerHTML = ''

  let container = document.createElement('div')
  container.classList.add('input-group')
  container.style.width = '550px'

  let form = document.createElement('div')
  form.classList.add('form-floating')

  let textBox = document.createElement('input')
  textBox.type = 'text'
  textBox.classList.add('form-control' , 'my-1')
  textBox.placeholder = 'Update Task'
  textBox.id = idToEdit

  let label = document.createElement('label')
  label.innerText = 'Enter updated Task'

  let datePicker = document.createElement('input')
  datePicker.type = 'date'
  datePicker.classList.add('form-control' , 'my-1' , 'rounded-end')
  datePicker.id = idToEdit

  let updateBtn = document.createElement('button')
  updateBtn.classList.add('btn' , 'btn-primary' , 'mx-3' , 'my-1' , 'rounded')
  updateBtn.innerText = 'Update'
  updateBtn.addEventListener('click' , updateTask)
  updateBtn.id = idToEdit

  let cancelBtn = document.createElement('button')
  cancelBtn.classList.add('btn' , 'btn-warning' , 'my-1' , 'rounded')
  cancelBtn.innerText = 'Cancel'
  cancelBtn.id = idToEdit
  cancelBtn.addEventListener('click' , render)

  form.append(textBox)
  form.append(label)

  container.append(form)
  container.append(datePicker)
  container.append(updateBtn)
  container.append(cancelBtn)
  element.append(container)
  
  let btns = document.querySelectorAll('button')
  btns.forEach(btn => {
    if(btn.id != idToEdit){
      btn.setAttribute('disabled' , 'disabled')
    }
  })

}

function deleteTask(e){
  let idToDelete = e.target.id

  removeTask(idToDelete)

  render()
}

function saveTasks(){
  localStorage.setItem('Tasks' , JSON.stringify(todos))
}

//View Section


function leftTasks(){
  let count = 0
  todos.forEach( todo => {
    if(todo.completed == 'No'){
      count += 1
    }
  })
  let leftTasksNumber = document.querySelector('h2')
  leftTasksNumber.innerHTML = `Number of Tasks left to do : ${count}`
}

function completedStatus(element){
  let id = element.id
  let btns = element.querySelectorAll('button')
  todos.forEach(todo => {
    if (todo.id == id && todo.completed == 'Yes'){
      element.classList.add('text-decoration-line-through')
      btns.forEach(btn => btn.setAttribute('disabled' , 'disabled'))
    }
  })
}

function render(){
  let todoList = document.getElementById('todo-list')
  todoList.innerHTML = ''
  todos.forEach( todo => {
    let element = document.createElement('div')
    element.innerText = `${todo.title} : ${todo.duedate}`
    element.id = todo.id

    let editBtn = document.createElement('button')
    editBtn.innerText = 'Edit'
    editBtn.classList.add('btn' , 'btn-primary' , 'mx-3' , 'my-1')
    editBtn.id = todo.id
    editBtn.addEventListener('click' , editTask)
    
    let deleteBtn = document.createElement('button')
    deleteBtn.innerText = 'Delete'
    deleteBtn.classList.add('btn' , 'btn-danger' , 'my-1')
    deleteBtn.id = todo.id
    deleteBtn.addEventListener('click' , deleteTask)

    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.classList.add('form-check-input' , 'mx-2')
    checkbox.id = todo.id
    checkbox.style.verticalAlign = 'text-top'
    checkbox.onchange = completedTask
    checkbox.checked = todo.completed == 'Yes' ? true : false

    element.append(editBtn)
    element.append(deleteBtn)
    element.prepend(checkbox)

    todoList.append(element)
    completedStatus(element)

  })
  leftTasks()
  addTaskBtn.removeAttribute('disabled')
  deleteTaskBtn.removeAttribute('disabled')
}

render()
