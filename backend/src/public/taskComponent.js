function taskComponent (content){ 
    let h1,h2,h3,h4,h5,h6,h7,h8 = ``;
 
    if (content.length > 0) { 
        const html = [];
        content.map((dataTask) => {
            h1 = `
                <div class="col-md-12">
                <div class="card bg-dark">
                <div class="card-header text-white d-flex justify-content-between align-items-center">
            `;
            if (dataTask.status === 'todo') {
                h2 = `
                <form method="PUT" onsubmit="event.preventDefault(); onPutTask(this);">
                    <div class="form-check form-switch">
                    <input type="hidden" name="status" value="done" name="id" value="${dataTask.id}" >
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onchange="onPutTask(${dataTask.id},'done')">
                    <label class="form-check-label" for="flexSwitchCheckDefault"></label>
                    </div>
                </form>`
            } else {
                h2 = `
                <form method="PUT" onsubmit="event.preventDefault(); onPutTask(this);">
                    <div class="form-check form-switch">
                        <input type="hidden" name="status" value="todo" name="id" value="${dataTask.id}" >
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked onchange="onPutTask(${dataTask.id},'todo')">
                        <label class="form-check-label" for="flexSwitchCheckDefault"></label>
                    </div>
                </form>`
            }
            h3 = `<div class="card-body text-light">`
            
            if (dataTask.status === "todo") {
                h4 = `${dataTask.task}`
            } else {
                h4 = `<del>${dataTask.task}</del>`
            }

            h5 = `</div>`
                        
            if (dataTask.status === "todo") {
                h6 = `<button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-task="${dataTask.task}" data-bs-taskId="${dataTask.id}">`
            } else {
                h6 = `<button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-task="${dataTask.task}" data-bs-taskId="${dataTask.id}" disabled>`
            }  
            
            h7 = `             
            <i class="bi bi-pencil-square"></i>
            </button>
            
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title text-secondary" id="exampleModalLabel">Edit task</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form action="#" id="myModalForm"  onsubmit="event.preventDefault(); onEdit(this,${dataTask.id});"  class="card bg-dark text-light card-body">
                        <div class="row">
                            <div class="col">
                                <input name="task" type="text" class="form-control rounded-0" placeholder="Task" autofocus required>
                                <input name="modalTaskId" type="text" hidden>
                            </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" id="closeModal" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="submit" class="btn btn-primary" onchange="onEdit(this,${dataTask.id})">Save changes</button>
                        </div>
                    </form>
                   
                    </div>
                    
                  </div>
                </div>
              </div>

              <form method="POST" onsubmit="event.preventDefault(); onDelete('${dataTask.id}');">
                <input type="hidden" name="_method" value="DELETE" name="id" value="${dataTask.id}" >
                <button type="submit" name="id" value="${dataTask.id}"  class="btn btn-danger btn-lg"><i class="bi bi-trash"></i></button>
              </form>

            </div>
        </div>
            </div>`
        html.push([h1,h2,h3,h4,h5,h6,h7].join("\n\t"))
           
        })
        h8 = html.join("\n");
    } else {
        h8 = `
        <div class="card card-body text-center">
            <p>No Task yet.</p>
        </div>`;
    }

   return h8;
}

                        
                       

         
       