const textInput = document.getElementById("text-input");
const listItem = document.getElementById("list-items");

function addTask() {
    if (textInput.value === '') {
        alert("Add Task First");
    } else {
        const li = document.createElement("li");

        // Task content container
        const taskContent = document.createElement("div");
        taskContent.className = "task-content";

        // Task text
        const taskText = document.createElement("span");
        taskText.textContent = textInput.value;
        taskText.className = "task-text";
        taskContent.appendChild(taskText);

        // Edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";
        editButton.onclick = () => editTask(li, taskText);
        taskContent.appendChild(editButton);

        li.appendChild(taskContent);

        // Task creation and completion dates
        const createdDate = new Date().toLocaleDateString();
        const taskDates = document.createElement("div");
        taskDates.className = "task-dates";

        const addedDate = document.createElement("p");
        addedDate.textContent = `Added: ${createdDate}`;
        taskDates.appendChild(addedDate);

        const completeByLabel = document.createElement("p");
        completeByLabel.innerHTML = `Complete by: <input type="date" class="completion-date">`;
        taskDates.appendChild(completeByLabel);

        li.appendChild(taskDates);

        // Delete button
        const deleteButton = document.createElement("span");
        deleteButton.innerHTML = "\u00d7";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = () => {
            li.remove();
            storage();
        };
        li.appendChild(deleteButton);

        listItem.appendChild(li);
        textInput.value = "";
        storage();
    }
}

function editTask(li, taskText) {
    const newTask = prompt("Edit your task:", taskText.textContent);
    if (newTask) {
        taskText.textContent = newTask;
        storage();
    }
}

listItem.addEventListener("change", function (e) {
    if (e.target.classList.contains("completion-date")) {
        storage(); // Save updated completion dates
    }
});

// Save the list to localStorage
function storage() {
    const tasks = [];
    listItem.querySelectorAll("li").forEach(li => {
        const taskText = li.querySelector(".task-text").textContent;
        const completionDate = li.querySelector(".completion-date").value;
        const isChecked = li.classList.contains("checked");
        tasks.push({ taskText, completionDate, isChecked });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load the task list from localStorage
function tasklist() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = document.createElement("li");
        if (task.isChecked) li.classList.add("checked");

        const taskContent = document.createElement("div");
        taskContent.className = "task-content";

        const taskText = document.createElement("span");
        taskText.textContent = task.taskText;
        taskText.className = "task-text";
        taskContent.appendChild(taskText);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";
        editButton.onclick = () => editTask(li, taskText);
        taskContent.appendChild(editButton);

        li.appendChild(taskContent);

        const taskDates = document.createElement("div");
        taskDates.className = "task-dates";

        const addedDate = document.createElement("p");
        addedDate.textContent = `Added: N/A (Loaded)`;
        taskDates.appendChild(addedDate);

        const completeByLabel = document.createElement("p");
        completeByLabel.innerHTML = `Complete by: <input type="date" class="completion-date" value="${task.completionDate || ''}">`;
        taskDates.appendChild(completeByLabel);

        li.appendChild(taskDates);

        const deleteButton = document.createElement("span");
        deleteButton.innerHTML = "\u00d7";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = () => {
            li.remove();
            storage();
        };
        li.appendChild(deleteButton);

        listItem.appendChild(li);
    });
}

// Initialize the task list on page load
tasklist();
