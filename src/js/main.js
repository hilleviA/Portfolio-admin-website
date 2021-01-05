'use strict';

//Variabler 
const URL = "http://courses.hilleviannfalt.se";

let courseList = document.getElementById("courseList");
let codeInput = document.getElementById("courseCode");
let nameInput = document.getElementById("courseName");
let progressionInput = document.getElementById("progression");
let syllabusInput = document.getElementById("syllabus");
let addCourseButton = document.getElementById("addCourse");

//Event hanterare
window.addEventListener("load", getCourses);

addCourseButton.addEventListener("click", function(event){
    event.preventDefault();
    addNewCourse();
});

//Läser in kurser
function getCourses() {
    courseList.innerHTML = "";

    fetch(URL)
    .then(res => res.json())
    .then(data => {
        courseList.innerHTML = "<tr><th>Kurskod</th> <th>Kursnamn</th> <th>Progression</th> <th>Kursplan</th> <th>Ta bort</th></tr>";
        data.forEach(course => {
            courseList.innerHTML +=`<tr><td> ${course.CourseCode}</td> <td>${course.CourseName}</td> <td> ${course.Progression}</td> <td><a href='${course.CourseSyllabus}'>Kursplan</a></td> <td><button id="${course.ID}" class="remove" onClick="deleteCourse(${course.ID})">X</button></td></tr>`;
        })   
    })
}
//Tar bort en kurs
function deleteCourse(id) {
    fetch(URL + "?ID=" + id, {
        method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {
        getCourses();
    })
    .catch(error => {
        console.log(`Fel: ${error}`);
    })
}

//Lägger till ny kurs
function addNewCourse() {

    let code = codeInput.value;
    let name = nameInput.value;
    let progression = progressionInput.value;
    let syllabus = syllabusInput.value;
    
    //Skapar nytt objekt med inskickad data
    let course =  {"code": code, "name": name, "progression": progression, "courseSyllabus": syllabus };

    fetch(URL, {
        method: "POST",
        body: JSON.stringify(course),
    })
    .then(res => res.json())
    .then( data => {
        location.reload();
    })
    .catch(error=> {
        console(`Fel: ${error}`);
    })    
}
