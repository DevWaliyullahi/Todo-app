function addTask() {
    const input = document.getElementById('input');
    const text = input.value.trim();

    if (text !== '') {
        const task = {
            text,
            status: 'in-progress'
        };

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        input.value = '';
        loadTasks();
    }
}


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const list = document.getElementById('list');
    list.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;

        if (task.status === 'completed') {
            li.classList.add('completed');
        }

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit Task';
        editBtn.classList.add('btn');
        editBtn.addEventListener('click', function() {
            const newTask = prompt('Edit task:', li.textContent);
            if (newTask !== null) {
                li.textContent = newTask;
            }
        });
        
        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.status === 'completed' ? 'Completed' : 'In Progress';
        completeBtn.classList.add('btn');
        completeBtn.addEventListener('click', function() {
            if (li.classList.contains('completed')) {
                li.classList.remove('completed');
                completeBtn.textContent = 'In Progress';
                task.status = 'in-progress';
            } else {
                li.classList.add('completed');
                completeBtn.textContent = 'Completed';
                task.status = 'completed';
            }
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete Task';
        deleteBtn.classList.add('btn');
        deleteBtn.addEventListener('click', function() {
            list.removeChild(li);
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        li.appendChild(editBtn);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// Call loadTasks() function when the page is loaded
window.addEventListener('load', loadTasks);
