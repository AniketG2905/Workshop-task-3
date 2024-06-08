document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Display tasks
    tasks.forEach(task => createTaskElement(task));

    // Add task
    addTaskBtn.addEventListener('click', () => {
        const taskName = taskInput.value.trim();
        if (taskName) {
            const task = { name: taskName, completed: false };
            tasks.push(task);
            createTaskElement(task);
            saveTasks();
            taskInput.value = '';
        }
    });

    // Create task element
    function createTaskElement(task) {
        const taskElement = document.createElement('li');
        taskElement.className = 'task';
        taskElement.innerHTML = `
            <span class="task-name">${task.name}</span>
            <div class="task-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        taskList.appendChild(taskElement);

        // Edit task
        const editBtn = taskElement.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            const newTaskName = prompt('Edit task:', task.name);
            if (newTaskName) {
                task.name = newTaskName;
                taskElement.querySelector('.task-name').textContent = newTaskName;
                saveTasks();
            }
        });

        // Delete task
        const deleteBtn = taskElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter(t => t !== task);
            taskElement.remove();
            saveTasks();
        });
    }

    // Save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
