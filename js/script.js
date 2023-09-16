/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


// define how many items to display per page
const itemsPerPage = 9;

/*
   Create and insert the html to the ul with the class of student-list to show student list per page
   @param {array} list - an array of students
   @param {integer} page - the number of the page
*/
function showPage(list, page){
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = (page * itemsPerPage);
   const studentList = document.querySelector(".student-list");
   studentList.innerHTML = "";
   for (let i = startIndex; i < endIndex; i++){
      if (i >= startIndex && i < endIndex) {
         const html = `
            <li class="student-item cf">
               <div class="student-details">
                 <img class="avatar" src="${list[i].picture.medium}" alt="Profile Picture">
                 <h3>${list[i].name.first} ${list[i].name.last}</h3>
                 <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                 <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>
         `;
         studentList.insertAdjacentHTML("beforeend", html);
      }
   }
}

/*
   Create and insert the button elements to the ul with link-list class to display pagination buttons
   @param {array} list - an array of students
*/
function addPagination(list) {
   const numberOfButtons = Math.ceil(list.length / itemsPerPage);
   const linkList = document.querySelector(".link-list");
   linkList.innerHTML = "";
   for (let i = 1; i <= numberOfButtons; i++){
      const html = `
         <li>
            <button type="button">${[i]}</button>
         </li>
      `;
      linkList.insertAdjacentHTML("beforeend", html);
   }

   linkList.querySelector("button").classList.add("active");

   linkList.addEventListener("click", (e) => {
      if (e.target.closest("button")) {
         const activeButton = linkList.querySelector(".active");
         const selectedButton = e.target.closest("button");

         activeButton.classList.remove("active");
         selectedButton.classList.add("active");

         showPage(list, selectedButton.innerHTML);
      }
   });
}


// Call functions
addPagination(data);
showPage(data, 1);