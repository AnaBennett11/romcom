// 👇🏼 Cover Book image components 👇🏼
var coverImg = document.querySelector('.cover-image')
var coverTitle = document.querySelector('.cover-title')
var coverTagline1 = document.querySelector('.tagline-1')
var coverTagline2 = document.querySelector('.tagline-2')

// 👇🏼 Screen views 👇🏼
var homeView = document.querySelector(".home-view")
var form = document.querySelector(".form-view")
var savedCoversSection = document.querySelector(".saved-view")

// 👇🏼 Buttons 👇🏼
var homeButton = document.querySelector(".home-button")
var showRandomCoverButton = document.querySelector('.random-cover-button')
var saveCoverButton = document.querySelector('.save-cover-button')
var viewSavedCoversButton = document.querySelector('.view-saved-button')
var makeYourOwnCoverButton = document.querySelector('.make-new-button')
var makeMyBookButton = document.querySelector('.create-new-book-button')

// 👇🏼 Form input fields 👇🏼
var formCover = document.querySelector(".user-cover")
var formTitle = document.querySelector(".user-title")
var firstDescriptor = document.querySelector(".user-desc1")
var secondDescriptor = document.querySelector(".user-desc2")

// 👇🏼 Variables provided for us 👇🏼
var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];
var currentCover;

// 👇🏼 Add Event listeners here 👇🏼
window.addEventListener("load", getRandomCover);
homeButton.addEventListener("click", goHome);
showRandomCoverButton.addEventListener("click", getRandomCover);
saveCoverButton.addEventListener('click', saveCoversButton);
viewSavedCoversButton.addEventListener("click", seeSavedCovers);
makeYourOwnCoverButton.addEventListener("click", displayForm);
makeMyBookButton.addEventListener("click", makeMyBook);
savedCoversSection.addEventListener('dblclick', performDelete);


// 👇🏼 Event handlers and functions 👇🏼
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function displayData(cover, title, descriptor1, descriptor2) {
  coverImg.src = cover;
  coverTitle.innerText = title;
  coverTagline1.innerText = descriptor1;
  coverTagline2.innerText = descriptor2;
}

// 👇🏼 Displays new random cover when "Show New Random Cover" Button is clicked
function getRandomCover(){
  var newCover = covers[getRandomIndex(covers)];
  var newTitle = titles[getRandomIndex(titles)];
  var newDescriptor1 = descriptors[getRandomIndex(descriptors)];
  var newDescriptor2 = descriptors[getRandomIndex(descriptors)];
  currentCover = new Cover(newCover, newTitle, newDescriptor1, newDescriptor2);
  displayData(newCover, newTitle, newDescriptor1, newDescriptor2);
  };

// 👇🏼 Displays form when "Make Your Own Cover" button is clicked
  function displayForm() {
     homeView.classList.add('hidden');
     form.classList.remove('hidden');
     showRandomCoverButton.classList.add('hidden');
     saveCoverButton.classList.add('hidden');
     homeButton.classList.remove('hidden');
     savedCoversSection.classList.add('hidden')
 }

// 👇🏼 Takes user home when "Home" button is clicked
 function goHome() {
   homeView.classList.remove('hidden');
   homeButton.classList.add('hidden');
   showRandomCoverButton.classList.remove('hidden');
   saveCoverButton.classList.remove('hidden');
   form.classList.add('hidden');
   savedCoversSection.classList.add('hidden');
 }

// 👇🏼 Creates custom book cover when "Make My Book" button is clicked
 function makeMyBook(event) {
   event.preventDefault();
   // 👇🏼 Variables with data from user input fields
   var userCover = formCover.value
   var userTitle = formTitle.value
   var userDesc1 = firstDescriptor.value
   var userDesc2 = secondDescriptor.value
   // 👇🏼 create new object instance
   currentCover = new Cover(userCover, userTitle, userDesc1, userDesc2);
   // 👇🏼 Push user input data to arrays
   covers.push(userCover);
   titles.push(userTitle);
   descriptors.push(userDesc1);
   descriptors.push(userDesc2);
   // 👇🏼 View custom created cover
   displayData(userCover, userTitle, userDesc1, userDesc2);
   displayCustomCover();
   clearFields();
  }

// 👇🏼 Takes user to view custom cover used in makeMyBook function
function displayCustomCover() {
  homeView.classList.remove('hidden');
  form.classList.add('hidden');
  showRandomCoverButton.classList.remove('hidden');
  saveCoverButton.classList.remove('hidden');
  homeButton.classList.add('hidden');
}

// 👇🏼 Clears the input fields in "Make Your Own Cover" form used in makeMyBook function
function clearFields() {
  userCover = "";
  userTitle = "";
  userDesc1 = "";
  userDesc2 = "";
}

// 👇🏼 Displays saved covers section when "View Saved Covers" button is clicked
 function seeSavedCovers() {
   savedCoversSection.classList.remove('hidden');
   homeView.classList.add('hidden');
   showRandomCoverButton.classList.add('hidden');
   saveCoverButton.classList.add('hidden');
   homeButton.classList.remove('hidden');
   form.classList.add('hidden');
   viewSavedCovers();
 }

// 👇🏼 Saves the current cover with "Save Cover" button is clicked
function saveCoversButton() {
  if(!savedCovers.includes(currentCover)) {
    savedCovers.push(currentCover);
    console.log(savedCovers)
  } else {
    window.alert ("This Book Cover Has Already Been Saved")
  }
}

// 👇🏼 Displays saved covers section when "View Saved Covers" button is clicked
function viewSavedCovers() {
  var htmladd = '';
  for(var i = 0; i < savedCovers.length; i ++) {
    htmladd += `<section class="mini-cover">
      <img class="cover-image" id=${savedCovers[i].id} src=${savedCovers[i].cover}>
      <h2 class="cover-title">${savedCovers[i].title}</h2>
      <h3 class="tagline">A tale of <span class="tagline-1">${savedCovers[i].tagline1}</span> and <span class="tagline-2">${savedCovers[i].tagline2}</span></h3>
      <img class="price-tag" src="./assets/price.png">
      <img class="overlay" src="./assets/overlay.png">
      </section>`;
  }
  savedCoversSection.innerHTML = htmladd;
}

// 👇🏼 Deletes book cover from Saved Covers when cover is double clicked
function performDelete(event) {
  var deleteCover = document.getElementById(event.target.id)
  deleteCover.parentElement.remove();
  for (var i = 0; i < savedCovers.length; i ++) {
    if (savedCovers[i].id == event.target.id) {
      savedCovers.splice(i, 1);
    }
  }
  viewSavedCovers();
}
