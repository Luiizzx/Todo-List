function validateInput(firstDate, secondDate, inputField, regexValue){
    /**firstDate is current date, second date is an object that represents user input date 
     * inputField has the input value that will be compared with regexValue
     * just so before creating secondDate, at least the format matches
     * which leaves us to compare only if the date is valid (if it's at least equal to current) 
    */

    const boolValue = regexValue.test(inputField.value);

    if(boolValue){
        const concatDate = inputValue[2] + "-" + inputValue[1] + "-" + inputValue[0];
        secondDate = new Date(concatDate);
        if(secondDate < firstDate){
            alert("Invalid date. Start date must be at least equal to current date.");
        }
    }
    else{
        alert("Wrong date format.");
    }
    
}
/**
    *@type HTMLInputElement
    */
    let taskTitle = document.getElementById("taskTitle");

/**
    *@type HTMLInputElement 
    */
    let taskStart = document.getElementById("taskStart");
/**
    * @type HTMLInputElement
    */
    let taskEnd = document.getElementById("taskEnd");
    const mainButton = document.getElementById("actionButton");

    let titleContent;
    let inputDate;
    let concatDate;
    let userStartDate;
    let userEndDate;
    const currentDate = new Date();

    const myRegex = new RegExp("\\d\\d\/\\d\\d\/\\d\\d\\d\\d");
    
    mainButton.addEventListener("click", function(){
        titleContent = taskTitle.value;

        validateInput(currentDate, userStartDate, taskStart, myRegex);

        let endUserData; /** esse campo é opcional, por essa razão pode permancer vazio */
        /** nesse caso, a função validateInput é chamada somente se ele não for vazio */

    });