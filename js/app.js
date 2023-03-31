const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  // display 8 phones only
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 8) {
    phones = phones.slice(0, 8);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  //display not found!
  const notFound = document.getElementById("phone-not-found");
  if (phones.length === 0) {
    notFound.classList.remove("d-none");
  } else {
    notFound.classList.add("d-none");
  }
  //display all phones
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card p-3">
            <img src="${phone.image}" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                </p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-info">Show Details</button>
            </div>
        </div>
      `;
    phoneContainer.appendChild(phoneDiv);
  });
  //stop spinner
  toggleSpinner(false);
};

// handle process search
const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};

// searching phone with button
document.getElementById("btn-search").addEventListener("click", function () {
  //start spinner
  processSearch(8);
});

//toggle spinner
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// load show all data but this is not the best solution
document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

// Load phone details
const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.data);
};

// event handler search field with Enter button
document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    // console.log(e.key);
    if (e.key === "Enter") {
      processSearch(8);
    }
  });

// loadPhones();
