document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todoForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    let tasks = [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="task-name ${task.completed ? 'completed' : ''}" data-index="${index}">${task.name}</span>
                <div>
                    <button class="complete-btn" data-index="${index}">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            if (task.priority) {
                li.querySelector('.task-name').classList.add(`priority-${task.priority}`);
            }
            taskList.appendChild(li);
        });
    }

    // Function to add a task
    function addTask(name, priority) {
        tasks.push({ name, priority, completed: false });
        renderTasks();
        taskInput.value = '';
    }

    // Function to delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    // Function to toggle task completion
    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    // Event listener for form submission
    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskName = taskInput.value.trim();
        if (taskName !== '') {
            addTask(taskName);
        }
    });

    // Event delegation for complete and delete buttons, and task name clicks
    taskList.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('complete-btn')) {
            const index = target.dataset.index;
            toggleComplete(index);
        } else if (target.classList.contains('delete-btn')) {
            const index = target.dataset.index;
            deleteTask(index);
        } else if (target.classList.contains('task-name')) {
            const index = target.dataset.index;
            toggleComplete(index);
        }
    });

});
