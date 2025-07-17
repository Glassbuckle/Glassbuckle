// 获取 DOM 元素
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// 获取本地任务数据
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 保存任务到本地
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 渲染任务列表
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item";

        // 复选框
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        // 任务内容
        const text = document.createElement("span");
        text.textContent = task.text;
        if (task.completed) {
            text.style.textDecoration = "line-through";
            text.style.color = "#aaa";
        }

        // 截止日期
        const date = document.createElement("small");
        if (task.dueDate) {
            date.textContent = `📅 截止：${task.dueDate}`;
        }

        // 删除按钮
        const delBtn = document.createElement("button");
        delBtn.textContent = "删除";
        delBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        // 编辑按钮
        const editBtn = document.createElement("button");
        editBtn.textContent = "编辑";
        editBtn.className = "edit-btn";
        editBtn.addEventListener("click", () => {
            const newText = prompt("修改任务内容：", task.text);
            const newDate = prompt("修改截止日期（格式：2025-08-01，可留空）：", task.dueDate || "");
            if (newText !== null && newText.trim() !== "") {
                tasks[index].text = newText.trim();
                tasks[index].dueDate = newDate?.trim() || "";
                saveTasks();
                renderTasks();
            }
        });

        // 添加到列表项
        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(date);
        li.appendChild(editBtn);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

// 添加任务
addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text !== "") {
        const dueDate = prompt("请输入截止日期（格式：2025-08-01，可留空）：");
        tasks.push({ text, completed: false, dueDate: dueDate?.trim() || "" });
        taskInput.value = "";
        saveTasks();
        renderTasks();
    }
});

// 回车添加任务
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addBtn.click();
    }
});

// 初始渲染
renderTasks();
