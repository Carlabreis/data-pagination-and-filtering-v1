/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
Reference element selectors
*/
const header = document.querySelector(".header");
const studentList = document.querySelector(".student-list");
const linkList = document.querySelector(".link-list");

// define how many items to display per page
const itemsPerPage = 9;

/*
Create and insert search bar
 */
const searchBar = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`;
header.insertAdjacentHTML("beforeend", searchBar);
const searchInput = document.querySelector("#search");

/*
Add event listener to search bar input to search dinamically
*/
searchInput.addEventListener("keyup", () => {
  const newList = [];
  const userInput = searchInput.value.toLowerCase();

  for (i = 0; i < data.length; i++) {
    let studentName = `${data[i].name.first} ${data[i].name.last}`;
    studentName = studentName.toLowerCase();

    if (studentName.includes(userInput)) {
      newList.push(data[i]);
    }
  }

  if (newList.length > 0) {
    addPagination(newList);
    showPage(newList, 1);
  } else {
    const html = "<h3>No results found.</h3>";
    studentList.innerHTML = html;
    linkList.innerHTML = "";
  }
});

/*
   Create and insert the html to the ul with the class of student-list to show student list per page
   @param {array} list - an array of students
   @param {integer} page - the number of the page
*/
function showPage(list, page) {
  const startIndex = page * itemsPerPage - itemsPerPage;
  const endIndex = page * itemsPerPage;
  studentList.innerHTML = "";
  for (let i = startIndex; i < list.length; i++) {
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
  linkList.innerHTML = "";
  for (let i = 1; i <= numberOfButtons; i++) {
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
