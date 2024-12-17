/** Global task array */
const taskArray = [];

/** Date validation regex (dd/mm/yyyy)*/
const dateValidationRegex = new RegExp("\\d\\d\/\\d\\d\/\\d\\d\\d\\d");

function validateTitle(taskTitle) {
    if (taskTitle === '') {
        alert("Titulo nao pode ser vazio.");
        return false;
    }

    if (taskTitle.length > 10) {
        alert("Titulo deve ter no maximo 10 caracteres.");
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
    const concatDate = inputArr[2] + "-" + inputArr[1] + "-" + inputArr[0];

    var formattedDate = new Date(concatDate);

    if (formattedDate < currentDate) {
        alert("Data inválida: data final deve ser após a inicial.");
        return false;
    }

    return true;
}

function mainButtonClick(taskTitle, taskDateEnd) {
    const currentDate = new Date();
    const formattedMonth = currentDate.getUTCMonth() + 1;
    currentDate.setUTCMonth(formattedMonth);

    console.log(currentDate.getUTCDate());
    console.log(currentDate.getUTCMonth());
    console.log(currentDate.getFullYear());

    /**valor booleano que verifica se o título é válido */
    const titleIsValid = validateTitle(taskTitle);
    if (!titleIsValid) {
        return;
    }

    /**valor booleano que verifica se a data final é válida  */
    const dateIsValid = validateInput(currentDate, taskDateEnd, dateValidationRegex);
    if (!dateIsValid) {
        return;
    }

    // TODO create task
    const newTask = new Task(taskTitle, formattedCurrentDate, taskDateEnd);

    // TODO add task to array
    taskArray[taskArray.length] = newTask;

    let list = document.getElementById("my-list");
    let dt = document.createElement("dt");
    let dd = document.createElement("dd");

    dt.innerText = newTask.objTitle;
    dd.innerText = "Inicio:" + newTask.objStartDate + " | " + "Fim:" + newTask.objEndDate;
    list.appendChild(dt);
    list.appendChild(dd);
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
    const mainButton = document.getElementById("action-button");

    mainButton.addEventListener("click", function (event) {
        mainButtonClick(taskTitle.value, taskDateEnd.value);
    });
}