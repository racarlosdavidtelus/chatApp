let advance = 0;
const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit",onPost);

function onPost(event){ 
    event.preventDefault();
    const data = new FormData(form)
    const values = Array.from(data.entries())

    const [frmTask] = values;
    const task = frmTask[1];

    form.reset();
    //document.getElementById("nombre").focus();

    const dataT = {
        task: task
    }

    fetch(`/tasks`, {
        method: "POST",
        body: JSON.stringify(dataT),
        headers: {
            "content-type": "application/json"
        }
    })
    .then(response => {
        return response.json()
    })
    .then((content) => {
        console.log("Server res ",content.data) 
        draw(content.data)
    })
}

const promiseOfSomeData = fetch(`/tasks`)
        .then(r=>r.json())
        .then(content => {
        console.log('in async');
        return content;
    });

window.onload = async () => {
    let content = await promiseOfSomeData;
    draw(content.data)
    console.log("onload");    
};

function onDelete(taskID){ 

    fetch(`/tasks/${taskID}`, {
      method: "DELETE",
    })
    .then(response => {
        return response.json()
    })
    .then((content) => {
      console.log("Server res",content.data)
      draw(content.data)
    })
   
}

function onEdit(event,a){ 
    const data = new FormData(event)
    const values = Array.from(data.entries())
    
    const [frmTask,frmTaskId] = values;
    const task = frmTask[1]
    const id = frmTaskId[1]

    const dataT = {
      task: task
    }

    fetch(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(dataT),
      headers: {
        "content-type": "application/json"
      }
    })
    .then(response => {
        return response.json()
    })
    .then((content) => {
        console.log("Server res",content.data)
        var myModalEl = document.getElementById('exampleModal');
        var modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();
        draw(content.data)
    })
}

function onPutTask(taskID,taskStatus){ 
    const dataT = {
      status: taskStatus
    }

    fetch(`/tasks/${taskID}`, {
      method: "PUT",
      body: JSON.stringify(dataT),
      headers: {
        "content-type": "application/json"
      }
    })
    .then(response => {
        return response.json()
    })
    .then((content) => {
        console.log("Server res",content.data)
        draw(content.data)
    })
    
  }

function draw(taskArray){
    const resultHTML =  taskComponent(taskArray);
    //console.log(" el result html ", resultHTML)
    const target = document.getElementById("todoTasks");
    target.innerHTML = resultHTML; 
    
    var exampleModal = document.getElementById('exampleModal')
    
    if (exampleModal !== null) {
    exampleModal.addEventListener('show.bs.modal', function (event) {
          // Button that triggered the modal
          var button = event.relatedTarget
          // Extract info from data-bs-* attributes
          var task = button.getAttribute('data-bs-task')
          var taskId = button.getAttribute('data-bs-taskid')
          // If necessary, you could initiate an AJAX request here
          // and then do the updating in a callback.
          //
          // Update the modal's content.
          var modalTitle = exampleModal.querySelector('.modal-title')
          var modalBodyInput = exampleModal.querySelector('.modal-body input')
          var modalBodyInput2 = exampleModal.querySelector('.modal-body input[name=modalTaskId]')
          var modalAction = exampleModal.querySelector("myModalForm")
          //document.getElementById("myModalForm").action = `/tasks/${taskId}?_method=PUT`;
        
          //modalTitle.textContent = 'New message to ' + recipient 
          modalBodyInput2.value = `${taskId}`;
          modalBodyInput.value = task
    })
}
}

