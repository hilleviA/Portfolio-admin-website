'use strict';

//Kontrollerar vilken sida som visas och kör funktion utifrån det (för att undvika fel vid med eventlisteners)
window.addEventListener("load", loadContent);

function loadContent() {

    if(document.getElementById("addEmployment")) {
        getEmployments();
        addEmploymentButton.addEventListener("click", function(event){
            event.preventDefault();
            addEmployment();
        });
    }
    else if (document.getElementById("addEducation")) {
        getEducations();
        addEducationButton.addEventListener("click", function(event){
            event.preventDefault();
            addEducation();
        });
    }
    else if (document.getElementById("addProject")) {
        getProjects();
        addProjectButton.addEventListener("click", function(event){
            event.preventDefault();
            addProject();
        });
        
    }  
}

