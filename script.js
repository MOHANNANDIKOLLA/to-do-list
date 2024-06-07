document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToList(task.text, task.completed));
    };

    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('#todo-list li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTaskToList = (taskText, completed = false) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button>Remove</button>
        `;
        if (completed) {
            li.classList.add('completed');
        }

        li.querySelector('span').addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        li.querySelector('button').addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        todoList.appendChild(li);
    };

    todoForm.addEventListener('submit', e => {
        e.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText) {
            addTaskToList(taskText);
            saveTasks();
            todoInput.value = '';
        }
    });

    loadTasks();
});
