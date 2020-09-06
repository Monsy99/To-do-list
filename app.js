{
    let tasks = [{
            content: "zjeść ciastka",
            done: true,
        },
        {
            content: "kupić mleko",
            done: false,
        }
    ];

    const setFocus = () => {
        const submitButton = document.querySelector(".js-newTaskButton");
        const taskInput = document.querySelector(".js-taskContent");

        submitButton.addEventListener("click", () => {
            taskInput.focus();
        })
    }

    const createNewTask = (taskInput) => {
        tasks.push({
            content: taskInput,
            done: false,
        });
        render();
    }

    const onFormSubmit = () => {

        event.preventDefault();

        const taskInput = document.querySelector(".js-taskContent").value.trim();

        if (taskInput === "") {
            return;
        }

        createNewTask(taskInput);

        document.querySelector(".js-taskContent").value = "";
    }

    const bindDeleteButtons = () => {
        const deleteButtons = document.querySelectorAll(".js-delete");

        deleteButtons.forEach((deleteButton, index) => {
            deleteButton.addEventListener("click", () => {
                tasks.splice(index, 1);
                render();
            })
        });
    }

    const bindDoneButtons = () => {
        const doneButtons = document.querySelectorAll(".js-done");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                tasks[index].done = !tasks[index].done;
                render();
            })
        });
    }

    const bindButtons = () => {
        bindDeleteButtons();
        bindDoneButtons();
    }

    const render = () => {
        const taskList = document.querySelector(".js-tasksContainer");

        let htmlContent = ``;

        tasks.forEach(({ done, content }) => {
            htmlContent += `
            <li class="tasks__task js-task ${done ? "task--done": ""}">
                <button class="tasks__doneButton js-done">✔</button>
                <p class="tasks__content">${content}</p>
                <button class="tasks__deleteButton js-delete">✖</button>
            </li>
            <hr>
            `
        })

        taskList.innerHTML = htmlContent;

        bindButtons();

    }

    const init = () => {

        document.querySelector(".js-form").addEventListener("submit", onFormSubmit);

        setFocus();

        render();
    }

    init();
}