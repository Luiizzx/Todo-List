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

    let titleContent = "";
    let inputDate;
    let concatDate;

    const currentDate = new Date();

    const mainButton = document.getElementById("actionButton");
    
    mainButton.addEventListener("click", function(){
        titleContent = taskTitle.value;
        inputDate = taskStart.value.split("/");
        
        console.log(inputDate);

        if(inputDate === ''){
            alert("Task start date can't be empty.");
        }
        else if(inputDate[0] === '' || inputDate[1] === '' || inputDate[2] === ''){
            alert("Invalid start date.");
        }
        else{
            concatDate = inputDate[2] + "-" +  inputDate[1] + "-" + inputDate[0];
        }

        const startUserDate = new Date(concatDate);
        let endUserData; /** esse campo é opcional, por essa razão pode permancer vazio */

        if(taskEnd.value === ""){
            endUserData = "";
            alert("Task created with no end date.");
        }
        else{
            inputDate = taskEnd.value.split("/");
            concatDate = inputDate[2] + "-" + inputDate[1] + "-" + inputDate[0];
            endUserData = new Date(concatDate);
        }
        console.log(startUserDate.getFullYear());
        console.log(endUserData.getFullYear());

    });