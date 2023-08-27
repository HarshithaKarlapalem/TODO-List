const task = document.getElementById('tasks');
const usname=document.getElementByClassName('name');
const username = localStorage.getItem('usname') || '';

	usname.value = username;
        let todo = [];

        const addButton = document.querySelector('.add-btn');
        addButton.addEventListener('click', addTask);

        function sorttodo() {
            for (let i = 0; i < todo.length; i++) {
                for (let j = i + 1; j < todo.length; j++) {
                    if (todo[i].deadline > todo[j].deadline) {
                        let temp = todo[i];
                        todo[i] = todo[j];
                        todo[j] = temp;
                    }
                    if (todo[i].deadline === todo[j].deadline) {
                        if (todo[i].priority > todo[j].priority) {
                            let temp = todo[i];
                            todo[i] = todo[j];
                            todo[j] = temp;
                        }
                    }
                }
            }
            console.log(todo);
            displaytodo();
            saveToLocalStorage(); // Save the todo list to localStorage after sorting
        }

        function addTask() {
            const todoTask = document.querySelector('.input').value;
            const deadline = document.querySelector('.date').value;
            const priority = document.querySelector('.priority').value;

            const newTodo = {
                task: todoTask,
                deadline: deadline,
                priority: priority
            };

            todo.push(newTodo);
            sorttodo();
        }

        function deletetodo(event) {
            const taskName = event.target.parentElement.querySelector('.item.task').textContent;
            for (let i = 0; i < todo.length; i++) {
                if (todo[i].task === taskName) {
                    todo.splice(i, 1);
                    break;
                }
            }
            displaytodo();
            saveToLocalStorage(); // Save the updated todo list to localStorage
        }

        function displaytodo() {
            task.innerHTML = '';
            todo.forEach((todoItem, index) => {
                task.innerHTML += `
                <li class="list-item">            
                    <span class="item task">${todoItem.task}</span>
                    <span class="item">${todoItem.deadline}</span>
                    <span class="item">${todoItem.priority}</span>
                    <button class="delete-btn" data-index="${index}">X</button>
                </li>
                `;
            });

            // Add event listeners to delete buttons
            const deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', deletetodo);
            });
        }

        function saveToLocalStorage() {
            localStorage.setItem('todo', JSON.stringify(todo));
               localStorage.setItem('usname', JSON.stringify(usname));
        }

        function loadFromLocalStorage() {
            const storedTodo = localStorage.getItem('todo');
            if (storedTodo) {
                todo = JSON.parse(storedTodo);
                displaytodo();
            }
        }

        // Initial display
        loadFromLocalStorage();
