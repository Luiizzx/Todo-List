window.onload = () => {
    const mainButton = document.querySelector("button");
    let titleInput = document.getElementById("taskTitle");
    
    mainButton.addEventListener("click", function() {

        titleContent = titleInput.getAttribute("this.value");

        if(titleContent == null){
            console.log(titleContent);
            alert("Empty field not allowed.");
        }
        else{
            console.log(titleContent);
            alert("All fields were filled.");
        }
    });
};