'use strict'

//Variabler 
const projectURL = "http://portfolio.hilleviannfalt.se/project.php";
//const projectURL ="http://localhost/portfolio/project.php";

//HTML element
const addProjectButton = document.getElementById("addProject");
const projectList = document.getElementById("projectList");

//Add new project form
const projectTitle = document.getElementById("projectTitle");
const projectUrl = document.getElementById("projectUrl");
const projectDescription = document.getElementById("projectDescription");

//Läser in projekt
function getProjects() {
    projectList.innerHTML = "";

    fetch(projectURL)
    .then(res => res.json())
    .then(data => {
        projectList.innerHTML = "<h2>Projekt</h2>";
        data.forEach(project => {
            projectList.innerHTML +=`
            <article> <h3>${project.ProjectTitle}</h3> <h4><a href="${project.ProjectUrl}">Gå till projekt</a></h4> <p>${project.ProjectDescription}</p> 
            <button onClick="showProjectUpdateForm(${project.ID})">Redigera</button> <button onClick="deleteProject(${project.ID})"> Ta bort </button> 
            
            <form id="projectUpdateForm${project.ID}" class="hidden">

                <label for="updateProject">Projektnamn: </label><br/>
                <input type="text" id="updateProject${project.ID}" name="updateProject" value="${project.ProjectTitle}"><br/> 
                <label for="updateProjectUrl">Länk: </label><br/>
                <input type="text" id="updateProjectUrl${project.ID}" name="updateProjectUrl" value="${project.ProjectUrl}"><br/>
                <label for="updateProjectDescription">Beskrivning:</label><br/>
                <input type="text" id="updateProjectDescription${project.ID}" name="updateProjectDescription" value="${project.ProjectDescription}"><br/>
                <input type="submit" onClick="updateProject(${project.ID})" value="Spara">   

            </form></article>  `;
        })   
    })
}

//Visar formulär för uppdatering
function showProjectUpdateForm(id) {   
    const projectUpdateForm = document.getElementById("projectUpdateForm" + id);
    projectUpdateForm.style.display = "block";
}

//Tar bort projekt
function deleteProject(id) {
    fetch(projectURL + "?ID=" + id, {
        method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {
        getProjects();
    })
    .catch(error => {
        console.log(`Fel: ${error}`);
    })
}


//Lägger till nytt projekt
function addProject() {

    let projectName = projectTitle.value;
    let url = projectUrl.value;
    let description = projectDescription.value;
    
    //Skapar nytt objekt med inskickad data
    let project =  {"projectName": projectName, "url": url, "description": description};

    //--------Fungerar som det ska hit och ger heller inga felmeddelanden---------

    fetch(projectURL, {
        method: "POST",
        body: JSON.stringify(project),
    })
    .then(res => res.json())
    .then( data => {
        location.reload();     
    })
    .catch(error=> {
        console.log(`Fel: ${error}`);
    })    
} 

