const content = document.querySelector(".content");
const container = document.querySelector(".page-container");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");

let recipiearray = [];
let page = 1;
let pagesize = 8;
let totalpages = 0;
let totalpagecount = 0;

function fetchdata() {
  fetch("https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json")
    .then((res) => res.json())
    .then((data) => {console.log(data)
      setdetails(data);
    });
}

function setdetails(data) {
  recipiearray = data;
  totalpages = recipiearray.length;
  totalpagecount = Math.ceil(totalpages / pagesize);
  showdata();
  addpagination();
}

function showdata() {
  const newdata = recipiearray.slice((page - 1) * pagesize, page * pagesize);
  content.innerHTML = ""; // Clear previous content
  pushdata(newdata);
  updateActive();
  addpagination();//by me
}

function pushdata(data) {
  data?.forEach((element) => {
    const newcard = document.createElement("div");
    newcard.classList.add("card");
    newcard.innerHTML=`<div>${element.name}</div>
     <div>${element.language}</div>`
    // newcard.innerHTML = element.name;
    // newcard.innerHTML=element.language;
    content.append(newcard);
  });
}

// This function dynamically adds pagination with ellipses
function addpagination() {
  container.innerHTML = ''; // Clear previous pagination

  // Add "<<" button
  const firstPage = document.createElement("div");
  firstPage.classList.add("btn");
  firstPage.innerHTML = "<<";
  container.appendChild(firstPage);
  firstPage.addEventListener("click", () => {
    page = 1;
    showdata();
    addpagination();
  });

  // Add "<" button
  const prevPage = document.createElement("div");
  prevPage.classList.add("btn");
  prevPage.innerHTML = "<";
  container.appendChild(prevPage);
  prevPage.addEventListener("click", () => {
    if (page > 1) {
      page--;
      showdata();
      addpagination();
    }
  });

  // Determine page range to display
  let startPage = Math.max(2, page - 2); // Show 2 pages before current page
  let endPage = Math.min(totalpagecount - 1, page + 2); // Show 2 pages after current page

  // Show first page
  const firstBtn = document.createElement("div");
  firstBtn.classList.add("btn");
  firstBtn.innerHTML = 1;
  container.appendChild(firstBtn);
  firstBtn.addEventListener("click", () => {
    page = 1;
    showdata();
    addpagination();
  });

  // Show "..." before current range if necessary
  if (startPage > 1) {
    const dotsBefore = document.createElement("div");
    dotsBefore.classList.add("btn");
    dotsBefore.innerHTML = "...";
    container.appendChild(dotsBefore);
  }

  // Show pages in the range (current +/- 2)
  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement("div");
    pageBtn.classList.add("btn");
    pageBtn.innerHTML = i;
    container.appendChild(pageBtn);
    pageBtn.addEventListener("click", () => {
      page = i;
      showdata();
      addpagination();
    });
  }

  // Show "..." after current range if necessary
  if (endPage < totalpagecount - 1) {
    const dotsAfter = document.createElement("div");
    dotsAfter.classList.add("btn");
    dotsAfter.innerHTML = "...";
    container.appendChild(dotsAfter);
  }

  // Show last page
  if (totalpagecount > 1) {
    const lastBtn = document.createElement("div");
    lastBtn.classList.add("btn");
    lastBtn.innerHTML = totalpagecount;
    container.appendChild(lastBtn);
    lastBtn.addEventListener("click", () => {
      page = totalpagecount;
      showdata();
      addpagination();
    });
  }

  // Add ">" button
  const nextPage = document.createElement("div");
  nextPage.classList.add("btn");
  nextPage.innerHTML = ">";
  container.appendChild(nextPage);
  nextPage.addEventListener("click", () => {
    if (page < totalpagecount) {
      page++;
      showdata();
      addpagination();
    }
  });

  // Add ">>" button
  const lastPage = document.createElement("div");
  lastPage.classList.add("btn");
  lastPage.innerHTML = ">>";
  container.appendChild(lastPage);
  lastPage.addEventListener("click", () => {
    page = totalpagecount;
    showdata();
    addpagination();
  });

  updateActive();
}

function updateActive() {
  const buttons = container.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    const btnPage = parseInt(btn.innerText);
    if (btnPage === page) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

fetchdata();
