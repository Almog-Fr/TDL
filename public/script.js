document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const assigneeInput = document.getElementById("assigneeInput");
    const addButton = document.getElementById("addButton");
    const taskList = document.getElementById("taskList");

    addButton.addEventListener("click", () => {
        const task = taskInput.value.trim();
        const assignee = assigneeInput.value.trim();
        if (task) {
            addTask(task, assignee);
        }
    });

    taskList.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-button")) {
            const listItem = event.target.parentElement;
            removeTask(listItem.dataset.index);
        }
    });

    function addTask(task, assignee) {
        fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ task, assignee }),
        })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error("Invalid input");
            }
        })
        .then(() => {
            taskInput.value = "";
            assigneeInput.value = "";
            fetchTasks();
        })
        .catch((error) => {
            console.error(error);
        });
    }

    function removeTask(index) {
        fetch(`http://localhost:3000/tasks/${index}`, {
            method: "DELETE",
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Task not found");
            }
        })
        .then(() => {
            fetchTasks();
        })
        .catch((error) => {
            console.error(error);
        });
    }

    function fetchTasks() {
        fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((data) => {
            displayTasks(data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    function displayTasks(tasks) {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.dataset.index = index;
            listItem.innerHTML = `
                <span>${task.task}</span>
                <span>${task.assignee}</span>
                <button class="remove-button">Remove</button>
            `;
            taskList.appendChild(listItem);
        });
    }

    fetchTasks();
});
