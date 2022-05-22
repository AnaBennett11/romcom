// Create variables targetting the relevant DOM elements here 👇
var coverImg = document.querySelector('.cover-image')
var coverTitle = document.querySelector('.cover-title')
var coverTagline1 = document.querySelector('.tagline-1')
var coverTagline2 = document.querySelector('.tagline-2')
var showRandomCoverButton = document.querySelector('.random-cover-button')
var makeYourOwnCoverButton = document.querySelector('.make-new-button')
var form = document.querySelector('.form-view')
var homeView = document.querySelector('.home-view')
var saveCoverButton = document.querySelector('.save-cover-button')
var homeButton = document.querySelector(".home-button")
var viewSavedCoversButton = document.querySelector(".view-saved-button")
var savedCoversSection = document.querySelector(".saved-view")
var makeMyBookButton = document.querySelector(".create-new-book-button")
var formCover = document.querySelector(".user-cover")
var formTitle = document.querySelector(".user-title")
var firstDescriptor = document.querySelector(".user-desc1")
var secondDescriptor = document.querySelector(".user-desc2")
// We've provided a few variables below
var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];

var currentCover;
// Add your event listeners here 👇
// you'll have to have an onload evenlistener to load to your random functions
window.addEventListener("load", getRandomCover);
showRandomCoverButton.addEventListener("click", getRandomCover);
makeYourOwnCoverButton.addEventListener("click", displayForm);
viewSavedCoversButton.addEventListener("click", seeSavedCovers);
homeButton.addEventListener("click", goHome);
makeMyBookButton.addEventListener("click", makeMyBook);
saveCoverButton.addEventListener("click", saveCoversButton);
savedCoversSection.addEventListener("dblclick", performDelete);

// Create your event handlers and other functions here 👇// we need a random index for each of the data points we're going to need
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function getRandomCover(){
  var newCover = covers[getRandomIndex(covers)]
  var newTitle = titles[getRandomIndex(titles)]
  var newDescriptor1 = descriptors[getRandomIndex(descriptors)]
  var newDescriptor2 = descriptors[getRandomIndex(descriptors)]
  coverImg.src = newCover;
  coverTitle.innerText = newTitle;
  coverTagline1.innerText = newDescriptor1;
  coverTagline2.innerText = newDescriptor2;
  currentCover = new Cover(newCover, newTitle, newDescriptor1, newDescriptor2)
  };

  function displayForm() {
     homeView.classList.add('hidden')
     form.classList.remove('hidden')
     showRandomCoverButton.classList.add('hidden')
     saveCoverButton.classList.add('hidden')
     homeButton.classList.remove('hidden')
     savedCoversSection.classList.add('hidden')
 }

 function seeSavedCovers() {
   savedCoversSection.classList.remove('hidden')
   homeView.classList.add('hidden')
   showRandomCoverButton.classList.add('hidden')
   saveCoverButton.classList.add('hidden')
   homeButton.classList.remove('hidden')
   form.classList.add('hidden')
   viewSavedCovers();

 }

 function goHome() {
   homeView.classList.remove('hidden')
   homeButton.classList.add('hidden')
   showRandomCoverButton.classList.remove('hidden')
   saveCoverButton.classList.remove('hidden')
   form.classList.add('hidden')
   savedCoversSection.classList.add('hidden')
 }

 function makeMyBook(event) {
   event.preventDefault();
   currentCover = new Cover(formCover.value, formTitle.value, firstDescriptor.value, secondDescriptor.value);
   covers.push(formCover.value);
   titles.push(formTitle.value);
   descriptors.push(firstDescriptor.value);
   descriptors.push(secondDescriptor.value);
   displayData(formCover.value, formTitle.value, firstDescriptor.value, secondDescriptor.value)
   displayCustomCover();
   formCover.value = ""
   formTitle.value = ""
   firstDescriptor.value = ""
   secondDescriptor.value = ""

  }

 function displayData(cover, title, descriptor1, descriptor2) {
   coverImg.src = cover;
   coverTitle.innerText = title;
   coverTagline1.innerText = descriptor1;
   coverTagline2.innerText = descriptor2;

}

function displayCustomCover() {
  homeView.classList.remove('hidden')
  form.classList.add('hidden')
  showRandomCoverButton.classList.remove('hidden')
  saveCoverButton.classList.remove('hidden')
  homeButton.classList.add('hidden')
}

function saveCoversButton() {
  if(!savedCovers.includes(currentCover)) {
    savedCovers.push(currentCover);
    console.log(savedCovers)

  }
}

 function viewSavedCovers () {
   var htmladd = '';
   for(var i = 0; i < savedCovers.length; i ++) {
     htmladd += `<section class="mini-cover">
      <img  class="cover-image" id=${savedCovers[i].id} src=${savedCovers[i].cover}>
      <h2 class="cover-title">${savedCovers[i].title}</h2>
      <h3 class="tagline">A tale of <span class="tagline-1"> ${savedCovers[i].tagline1}</span> and <span class="tagline-2"> ${savedCovers[i].tagline2}</span></h3>
      <img class="price-tag" src="./assets/price.png">
      <img class="overlay" src="./assets/overlay.png">
      </section>`;
   }

   savedCoversSection.innerHTML = htmladd;

}

 function performDelete(e) {
   var deleteCover = document.getElementById(e.target.id)
   deleteCover.parentElement.remove()
   for (var i = 0; i < savedCovers.length; i ++) {
      if (savedCovers[i].id == e.target.id) {
      savedCovers.splice(i, 1);
      }
   }

  viewSavedCovers();
  }



//
//   1.  save the id to a varaiabel
//   2.  loop through savedcovers array to find the index of the targeted array elements
//   3.  remove the alement fomrt he array.
//   4.  call view saved posters to repaint the page with revised data.
//  }
//
//
// //loop thru saved covers array and inject inner html for each cover in that section
// //adding dynamic html to the page

//    seeSavedCovers();
// }




//loop thru saved covers array and inject inner html for each cover in that section
//adding dynamic html to the page
