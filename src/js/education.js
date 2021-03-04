'use strict';

//Variabler 
const educationURL = "http://portfolio.hilleviannfalt.se/education.php";
//const educationURL = "http://localhost/portfolio/education.php";

//HTML element
const educationList = document.getElementById("educationList");
const addEducationButton = document.getElementById("addEducation");

//Add new education form
const schoolName = document.getElementById("school");
const programName = document.getElementById("program");
const educationStartDate = document.getElementById("educationStartDate");
const educationEndDate = document.getElementById("educationEndDate");
const educationDescription = document.getElementById("educationDescription");

//Läser in Utbildningar
function getEducations() {

    educationList.innerHTML = "";

    fetch(educationURL)
    .then(res => res.json())
    .then(data => {
        educationList.innerHTML = "<h2>Utbildningar</h2>";
        data.forEach(education => {
            educationList.innerHTML +=`
            <article> <h3>${education.SchoolName}</h3> <h4>${education.ProgramName}</h4> <h5>${education.StartDate} - ${education.EndDate}</h5> <p>${education.ProgramDescription}</p>
            <button onClick="showEducationUpdateForm(${education.ID})">Redigera</button> <button onClick="deleteEducation(${education.ID})"> Ta bort </button> 
            
            <form id="educationUpdateForm${education.ID}" class="hidden">
                <label for="updateSchool">Skola: </label><br/>
                <input type="text" id="updateSchool${education.ID}" name="updateSchool" value="${education.SchoolName}"><br/> 
                <label for="updateProgram">Program: </label><br/>
                <input type="text" id="updateProgram${education.ID}" name="updateProgram" value="${education.ProgramName}"><br/>
                <label for="updateEducationStartDate">Startdatum (Månad/År):</label><br/>
                <input type="text" id="updateEducationStartDate${education.ID}" name="updateEducationStartDate" value="${education.StartDate}"><br/>
                <label for="updateEducationEndDate">Slutdatum (Månad/År):</label><br/>
                <input type="text" id="updateEducationEndDate${education.ID}" name="updateEducationEndDate" value="${education.EndDate}"><br/>
                <label for="updateEducationDescription">Beskrivning:</label><br/>
                <input type="text" id="updateEducationDescription${education.ID}" name="updateEducationDescription" value="${education.ProgramDescription}"><br/>
                <input type="submit" onClick="updateEducation(${education.ID})" value="Spara">   
            </form></article>  `;
        })   
    })
}

//Visar formulär för uppdatering
function showEducationUpdateForm(id) {   
    const educationUpdateForm = document.getElementById("educationUpdateForm" + id);
    educationUpdateForm.style.display = "block";
}

//Uppdaterar utbildning
function updateEducation(id) {

    //Update form
    const updateSchool = document.getElementById("updateSchool" + id);
    const updateProgram = document.getElementById("updateProgram" + id);
    const updateEducationStartDate = document.getElementById("updateEducationStartDate" + id);
    const updateEducationEndDate = document.getElementById("updateEducationEndDate" + id);
    const updateEducationDescription = document.getElementById("updateEducationDescription" +id);
    
        let school = updateSchool.value;
        let program = updateProgram.value;
        let startDate = updateEducationStartDate.value;
        let endDate = updateEducationEndDate.value;
        let description = updateEducationDescription.value;
    
        //Skapar nytt objekt med inskickad data
        let education =  {"school": school, "program": program, "startDate": startDate, "endDate": endDate, "description": description};
    
        fetch(educationURL + "?ID=" + id, {
            method: "PUT",
            body: JSON.stringify(education),
        })
        .then(res => res.json())
        .then( data => {
            //location.reload();     
        })
        .catch(error=> {
            console.log(`Fel: ${error}`);
        })
    }

//Tar bort en utbildning
function deleteEducation(id) {
    fetch(educationURL + "?ID=" + id, {
        method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {
        getEducations();
    })
    .catch(error => {
        console.log(`Fel: ${error}`);
    })
}

//Lägger till ny utbildning
function addEducation() {

    let school = schoolName.value;
    let program = programName.value;
    let startDate = educationStartDate.value;
    let endDate = educationEndDate.value;
    let description = educationDescription.value;
    
    //Skapar nytt objekt med inskickad data
    let education =  {"school": school, "program": program, "startDate": startDate, "endDate": endDate, "description": description};

    fetch(educationURL, {
        method: "POST",
        body: JSON.stringify(education),
    })
    .then(res => res.json())
    .then( data => {
        location.reload();     
    })
    .catch(error=> {
        console.log(`Fel: ${error}`);
    })    
}



