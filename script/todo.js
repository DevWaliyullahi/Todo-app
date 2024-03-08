function addTask() {
    const input = document.getElementById('input');
    const text = input.value.trim();

    if (text !== '') {
        const task = {
            text,
            status: 'in-progress'
        };

        const tasks = getTasks();
        tasks.push(task);
        saveTasks(tasks);

        input.value = '';
        loadTasks(); 
    }
}

function getTasks() {

    try {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
        return [];
    }
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasks();
    const list = document.getElementById('list');
    list.innerHTML = ''; 

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;

        if (task.status === 'completed') {
            li.classList.add('completed');
        }

        const completeBtn = createButton(task.status === 'completed' ? 'Completed' : 'In Progress', 'btn', function() {
            if (li.classList.contains('completed')) {
                li.classList.remove('completed');
                completeBtn.textContent = 'In Progress';
                task.status = 'in-progress';
            } else {
                li.classList.add('completed');
                completeBtn.textContent = 'Completed';
                task.status = 'completed';
            }
            saveTasks(tasks);
        });

        const editBtn = createButton('Edit Task', 'btn', function() {
            const newTask = prompt('Edit task:', task.text);
            if (newTask !== null) {
                task.text = newTask;
                saveTasks(tasks);
                const textNode = li.childNodes[0]; 
                textNode.nodeValue = newTask; 
            }
        });

        const deleteBtn = createButton('Delete Task', 'btn', function() {
            list.removeChild(li);
            tasks.splice(index, 1);
            saveTasks(tasks);
        });

        li.appendChild(completeBtn);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });
}

function createButton(text, className, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add(className);
    button.addEventListener('click', clickHandler);
    return button;
}

window.addEventListener('load', loadTasks);
