'use strict'

//---------------------------------------EMPLOYMENTS---------------------------------------
//-----------------------------------------------------------------------------------------

//Variabler 
const employmentURL = "http://portfolio.hilleviannfalt.se/employment.php";
//const employmentURL ="http://localhost/portfolio/employment.php";

//HTML element
const employmentList = document.getElementById("employmentList");
const addEmploymentButton = document.getElementById("addEmployment");

//Add new employment form
const employName = document.getElementById("employer");
const employTitle = document.getElementById("title");
const employStartDate = document.getElementById("employStartDate");
const employEndDate = document.getElementById("employEndDate");
const employDescription = document.getElementById("employDescription");

//Läser in Anställningar
function getEmployments() {
    employmentList.innerHTML = "";

    fetch(employmentURL)
    .then(res => res.json())
    .then(data => {
        employmentList.innerHTML = "<h2>Anställningar</h2>";
        data.forEach(employment => {
            employmentList.innerHTML +=`
            <article> <h3>${employment.EmploymentName}</h3> <h4>${employment.EmploymentTitle}</h4> <h5>${employment.StartDate} - ${employment.EndDate}</h5> <p>${employment.EmploymentDescription}</p> 
            <button onClick="showEmploymentUpdateForm(${employment.ID})">Redigera</button> <button onClick="deleteEmployment(${employment.ID})"> Ta bort </button> 
            
            <form id="employmentUpdateForm${employment.ID}" class="hidden">

                <label for="updateEmployer">Företag: </label><br/>
                <input type="text" id="updateEmployer${employment.ID}" name="updateEmployer" value="${employment.EmploymentName}"><br/> 
                <label for="updateTitle">Titel: </label><br/>
                <input type="text" id="updateTitle${employment.ID}" name="updateTitle" value="${employment.EmploymentTitle}"><br/>
                <label for="updateEmployStartDate">Startdatum (Månad/År):</label><br/>
                <input type="text" id="updateEmployStartDate${employment.ID}" name="updateEmployStartDate" value="${employment.StartDate}"><br/>
                <label for="updateEmployEndDate">Slutdatum (Månad/År):</label><br/>
                <input type="text" id="updateEmployEndDate${employment.ID}" name="updateEmployEndDate" value="${employment.EndDate}"><br/>
                <label for="updateEmployDescription">Beskrivning:</label><br/>
                <input type="text" id="updateEmployDescription${employment.ID}" name="updateEmployDescription" value="${employment.EmploymentDescription}"><br/>
                <input type="submit" onClick="updateEmployment(${employment.ID})" value="Spara">   

            </form></article>  `;
        })   
    })
}

//Visar formulär för uppdatering
function showEmploymentUpdateForm(id) {   
    const employUpdateForm = document.getElementById("employmentUpdateForm" + id);
    employUpdateForm.style.display = "block";
}

//Tar bort en anställning
function deleteEmployment(id) {
    fetch(employmentURL + "?ID=" + id, {
        method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {
        getEmployments();
    })
    .catch(error => {
        console.log(`Fel: ${error}`);
    })
}

//Lägger till ny anställning
function addEmployment() {

    let employer = employName.value;
    let title = employTitle.value;
    let startDate = employStartDate.value;
    let endDate = employEndDate.value;
    let description = employDescription.value;
    
    //Skapar nytt objekt med inskickad data
    let employment =  {"employer": employer, "title": title, "startDate": startDate, "endDate": endDate, "description": description};

    fetch(employmentURL, {
        method: "POST",
        body: JSON.stringify(employment),
    })
    .then(res => res.json())
    .then( data => {
        location.reload();     
    })
    .catch(error=> {
        console.log(`Fel: ${error}`);
    })    
}

//Uppdaterar anställning
function updateEmployment(id) {

//Update form
const updateEmployName = document.getElementById("updateEmployer" + id);
const updateEmployTitle = document.getElementById("updateTitle" + id);
const updateEmployStartDate = document.getElementById("updateEmployStartDate" + id);
const updateEmployEndDate = document.getElementById("updateEmployEndDate" + id);
const updateEmployDescription = document.getElementById("updateEmployDescription" +id);

    let employer = updateEmployName.value;
    let title = updateEmployTitle.value;
    let startDate = updateEmployStartDate.value;
    let endDate = updateEmployEndDate.value;
    let description = updateEmployDescription.value;

    //Skapar nytt objekt med inskickad data
    let employment =  {"employer": employer, "title": title, "startDate": startDate, "endDate": endDate, "description": description};

    fetch(employmentURL + "?ID=" + id, {
        method: "PUT",
        body: JSON.stringify(employment),
    })
    .then(res => res.json())
    .then( data => {
        location.reload();     
    })
    .catch(error=> {
        window.alert(`Fel: ${error}`);
    })
}