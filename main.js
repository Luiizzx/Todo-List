class Task{
    Task(t_Title, t_Start, t_End){
        this.t_Title = t_Title;
        this.t_Start = t_Start;
        this.t_End = t_End;
    }
}
function validateTitle(myTitle){
    const titleContent = myTitle.value;

    if(titleContent === ''){
        alert("Title must not be empty.");
        return false;
    }
    else if(titleContent.length > 10){
        alert("Title must have less than 10 chars.");
        return false;
    }
    else{
        return true;
    }
}
function validateInput(firstDate, secondDate, inputField, regexValue){
    /**firstDate is current date, second date is an object that represents user input date 
     * inputField has the input value that will be compared with regexValue
     * just so before creating secondDate, at least the format matches
     * which leaves us to compare only if the date is valid (if it's at least equal to current) 
    */

    const boolValue = regexValue.test(inputField.value);

    if(boolValue){
        const inputArr = inputField.value.split("/");
        const concatDate = inputArr[2] + "-" + inputArr[1] + "-" + inputArr[0];
        /**tratamento de erro para dia > 31 e mes > 12 faltando */
        secondDate = new Date(concatDate);

        if(secondDate < firstDate){
            alert("Invalid date. Start date must be at least equal to current date.");
            return false;
        }
        return true;
    }
    else{
        alert("Wrong date format.");
        return false;
    }
}
/**
    *@type HTMLInputElement
    */
    const taskTitle = document.getElementById("taskTitle");

/**
    *@type HTMLInputElement 
    */
    const taskStart = document.getElementById("taskStart");
/**
    * @type HTMLInputElement
    */
    const taskEnd = document.getElementById("taskEnd");

    const mainButton = document.getElementById("actionButton");
    let userStartDate;
    let userEndDate;
    
    const currentDate = new Date();
    const myRegex = new RegExp("\\d\\d\/\\d\\d\/\\d\\d\\d\\d");
    
    mainButton.addEventListener("click", function(){
        const titleBool = validateTitle(taskTitle);
        const startBool = validateInput(currentDate, userStartDate, taskStart, myRegex);
        console.log(taskTitle.value);
        let userTask;
        let endBool;

        if(taskEnd.value === '' && titleBool && startBool){ 
            /** Mensagem personalizada que só aparece se mesmo com os outros campos válidos
            * o usuário optar por não usar data final*/
            alert("Task created with no end date.");         
        }
        else if(taskEnd.value !== ''){
            /**Note que caso a data for vazia mas os outros campos não estejam válido
            * nada é informado. Essa foi uma escolha para não exibir repetidamente
            * que não há data final.*/
            endBool = validateInput(currentDate, userEndDate, taskStart, myRegex);
        }

        if(endBool && startBool && titleBool){
            userTask = new Task(taskTitle.value, taskStart.value, taskEnd.value);
            console.log(userTask.t_Title);
        }
    });