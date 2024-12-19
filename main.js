/** Global task array */
const taskArray = [];

/** Date validation regex (dd/mm/yyyy)*/
const dateValidationRegex = new RegExp("^\\d\\d\/\\d\\d\/\\d\\d\\d\\d$");

function fixTaskArray(taskArray) {
    let i;

    while (i < taskArray.length) {
        if (taskArray[i] == null) {
            i++;
        }
        else {
            let j = i;
            while (taskArray[j] == null && j > 0) {
                j--;
                if (j == 0) {
                    taskArray[0] = taskArray[i];
                }
                else if (taskArray[j] != null) {
                    taskArray[j + 1] = taskArray[i];
                }
            }
        }
    }

}

function delButtonCreator(taskIdConstructor) {
    let createdButton = document.createElement("button");
    createdButton.setAttribute("type", "button");
    createdButton.setAttribute("for", taskIdConstructor);
    createdButton.setAttribute("id", "del-task-button");
    createdButton.innerText = "Delete";

    return createdButton;
}

function taskCheckboxCreator(taskIdConstructor) {
    let createdBox = document.createElement("input");
    createdBox.setAttribute("type", "checkbox");
    createdBox.setAttribute("for", taskIdConstructor);
    createdBox.setAttribute("id", "task-check");

    return createdBox;
}

function validateTitle(taskTitle) {
    if (taskTitle === '') {
        alert("Titulo nao pode ser vazio.");
        return false;
    }

    if (taskTitle.length > 20) {
        alert("Titulo deve ter no maximo 20 caracteres.");
        return false;
    }

    return true;
}

function validateInput(currentDate, taskEndDate, regexValue) {
    if (taskEndDate === '') {
        alert("Task sem data final.")
        return true;
    }

    const dateFormatIsValid = regexValue.test(taskEndDate);
    if (!dateFormatIsValid) {
        alert("Erro no formato da data.");
        return false;
    }

    const inputArr = taskEndDate.split("/");
    const concatDate = inputArr[2] + "-" + (inputArr[1]) + "-" + inputArr[0];

    var formattedDate = new Date(concatDate);

    /**casos em que data está fora do intervalo, ex: dia > 31*/
    if (isNaN(formattedDate.getDate()) || isNaN(formattedDate.getMonth()) || isNaN(formattedDate.getFullYear())) {
        alert("Data invalida.");
        return false;
    }

    if (formattedDate < currentDate) {
        alert("Data invalida: data final deve ser apos a inicial.");
        return false;
    }

    alert("Task criada com sucesso.")
    return true;
}

function setTaskContent(innerContent, argTitle, argFormattedCDate, argEDate, idConstructor) {
    innerContent.setAttribute("id", idConstructor);
    if (argEDate === '') {
        innerContent.innerText = "Titulo: " + argTitle + " | " + "Inicio: " + argFormattedCDate + "|";
    }
    else {
        innerContent.innerText = "Titulo: " + argTitle + " | " + "Inicio: " + argFormattedCDate + " | " + "Fim: " + argEDate;;
    }
}

function delTaskButtonClick(clickedButton, taskArray, myTaskList) {
    const deletableId = clickedButton.getAttribute("for");

    for (i = 0; i < taskArray.length; i++) {

        if (deletableId === taskArray[i].getTaskId()) {
            if (!taskArray[i].getTaskState()) {
                alert("Task nao marcada como concluida. Deseja deletar mesmo assim?");
                return;
            }

            const deletableTask = document.getElementById(deletableId);
            myTaskList.removeChild(deletableTask);

            return;
        }
    }
}

function addTaskButtonClick(taskTitle, taskDateEnd, myTaskList) {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.getDate() + "/" + (currentDate.getUTCMonth() + 1) + "/" + currentDate.getFullYear();

    /**valor booleano que verifica se o título é válido */
    const titleIsValid = validateTitle(taskTitle);
    if (!titleIsValid) {
        return;
    }

    /**valor booleano que verifica se a data final é válida  */
    const dateIsValid = validateInput(currentDate, taskDateEnd, dateValidationRegex);
    if (dateIsValid == false) {
        return;
    }

    // TODO create task
    const newTask = new Task(taskTitle, formattedCurrentDate, taskDateEnd);

    // TODO add task to array
    taskArray[taskArray.length] = newTask;
    const taskIdConstructor = "TASK#" + taskArray.length;

    newTask.setTaskId(taskIdConstructor);

    let myTaskContent = document.createElement("li");
    setTaskContent(myTaskContent, taskTitle, formattedCurrentDate, taskDateEnd, taskIdConstructor);

    const delTaskButton = delButtonCreator(taskIdConstructor);
    const taskCheckbox = taskCheckboxCreator(taskIdConstructor);

    myTaskContent.appendChild(delTaskButton);
    myTaskContent.appendChild(taskCheckbox);
    myTaskList.appendChild(myTaskContent);

    delTaskButton.addEventListener("click", function (event) {
        const clickedButton = delTaskButton;
        delTaskButtonClick(clickedButton, taskArray, myTaskList, myTaskContent);
    })

    taskCheckbox.addEventListener("click", function (event) {

        const linkedTask = document.getElementById(taskCheckbox.getAttribute("for"));
        let objectTask;

        for (i = 0; i < taskArray.length; i++) {
            if (linkedTask === taskArray[i].getTaskId()) {
                objectTask = taskArray[i];
                break;
            }
        }
        if (taskCheckbox.checked) {
            linkedTask.style.textDecoration = "line-through";
            objectTask.setTaskState(true);
            return;
        }

        linkedTask.style.textDecoration = "none";
        objectTask.setTaskState(false);
        return;
    })
}

window.onload = () => {
    /**
    * @type HTMLInputElement
    */
    const taskTitle = document.getElementById("task-title");

    /**
    * @type HTMLInputElement
    */
    const taskDateEnd = document.getElementById("task-end");

    /**
    * @type HTMLButtonElement
    */
    const addTaskButton = document.getElementById("add-task-button");
    const myTaskList = document.getElementById("my-list");

    addTaskButton.addEventListener("click", function (event) {
        addTaskButtonClick(taskTitle.value, taskDateEnd.value, myTaskList);
    })
}