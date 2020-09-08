{
    let doneTasksHidden = false;

    let tasks = [{
            content: "zjeść ciastka",
            done: true,
        },
        {
            content: "kupić mleko",
            done: false,
        },
        {
            content: "wypić herbatę",
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
        tasks = [
            ...tasks,
            {
                content: taskInput,
                done: false,
            }
        ];
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
                tasks = [
                    ...tasks.slice(0, index),
                    ...tasks.slice(index + 1),
                ];
                render();
            })
        });
    }

    const bindDoneButtons = () => {
        const doneButtons = document.querySelectorAll(".js-done");
        if (doneButtons) {
            doneButtons.forEach((doneButton, index) => {
                doneButton.addEventListener("click", () => {
                    tasks = [
                        ...tasks.slice(0, index),
                        {
                            ...tasks[index],
                            done: !tasks[index].done,
                        },
                        ...tasks.slice(index + 1),
                    ]
                    render();
                })
            });
        }
    }

    const bindHideAllTasksButton = () => {
        const hideButton = document.querySelector(".js-hide");
        if (hideButton) {
            hideButton.addEventListener("click", () => {
                doneTasksHidden = !doneTasksHidden;
                render();
            });
        }
    }

    const bindMarkAllTasksDoneButton = () => {
        const MarkAllDoneButton = document.querySelector(".js-markAllDone");

        if (MarkAllDoneButton) {
            MarkAllDoneButton.addEventListener("click", () => {

                tasks = tasks.map((task) => ({
                    ...task,
                    done: true,
                }));
                render();
            })
        }
    }

    const bindButtons = () => {

        bindDeleteButtons();

        bindDoneButtons();

        bindHideAllTasksButton();

        bindMarkAllTasksDoneButton();
    }

    const renderTasks = () => {
        const taskList = document.querySelector(".js-tasksContainer");

        let htmlContent = ``;
        if (tasks.length !== 0) {
            tasks.forEach(({ done, content }) => {
                htmlContent += `
            <li class="task js-task ${doneTasksHidden && done ? "js--hidden" : ""} ${done ? "task--done": ""}">
                <button class="task__doneButton js-done">✔</button>
                <p class="task__content">${content}</p>
                <button class="task__deleteButton js-delete">✖</button>
            </li>
            `
            });

            taskList.innerHTML = htmlContent;
        }
        taskList.innerHTML = htmlContent;
    }


    const renderFunctionButtons = () => {
        const functionButtonsContainer = document.querySelector(".main__buttons");

        let htmlContent = ``;

        const findUndoneTask = (task) => !task.done;

        if (tasks.length !== 0) {

            htmlContent = `
        <button class="main__functionButton js-hide">
        ${doneTasksHidden ? "Pokaż ukończone" : "Ukryj ukończone"}
        </button>
        <button ${tasks.find(findUndoneTask) ? "" : "disabled"} class="main__functionButton js-markAllDone">
        Ukończ wszystkie
        </button>
        `
        }

        functionButtonsContainer.innerHTML = htmlContent;
    }

    const render = () => {

        renderTasks();

        renderFunctionButtons();

        bindButtons();

    }

    const init = () => {

        document.querySelector(".js-form").addEventListener("submit", onFormSubmit);

        setFocus();

        render();
    }

    init();
}