const linkHomePage = document.querySelector('#js-linkHomePage');
const linkLibraryPage = document.querySelector('#js-linkLibraryPage');
const sectionHomePage = document.querySelector('#js-homePage');
const sectionLibraryPage = document.querySelector('#js-libraryPage');
const sectionDetailsPage = document.querySelector('#js-detailsPage');
let selectFilm = {};
const queueListButton = document.querySelector('#js-navigationLibraryButtonQueue');
const watchedListButton = document.querySelector('#js-navigationLibraryButtonWatched');

sectionLibraryPage.classList.add('main__hide');
sectionDetailsPage.classList.add('main__hide');

function activeHomePage() {
  sectionLibraryPage.classList.add('main__hide');
  sectionDetailsPage.classList.add('main__hide');
  sectionHomePage.classList.remove('main__hide');

  addQueueButton.removeEventListener('click', toggleToQueue);
  addWatchedButton.removeEventListener('click', toggleToWatched);

  queueListButton.removeEventListener('click', drawQueueFilmList);
  watchedListButton.removeEventListener('click', drawWatchedFilmList);
}

function activeLibraryPage() {
  sectionHomePage.classList.add('main__hide');
  sectionDetailsPage.classList.add('main__hide');
  sectionLibraryPage.classList.remove('main__hide');

  drawQueueFilmList();
  queueListButton.classList.add('main__navigationLibraryButtonActive');

  queueListButton.addEventListener('click', drawQueueFilmList);
  watchedListButton.addEventListener('click', drawWatchedFilmList);

  addQueueButton.removeEventListener('click', toggleToQueue);
  addWatchedButton.removeEventListener('click', toggleToWatched);
}

function activeDetailsPage(movieId, itsLibraryFilm) {
  sectionHomePage.classList.add('main__hide');
  sectionLibraryPage.classList.add('main__hide');
  sectionDetailsPage.classList.remove('main__hide');
  if (itsLibraryFilm) {
    let queueAndWatchedFilmListFromLS = [...JSON.parse(localStorage.getItem('filmsQueue')), ...JSON.parse(localStorage.getItem('filmsWatched'))];
    selectFilm = queueAndWatchedFilmListFromLS.find(el => el.id === movieId);
  } else {
    selectFilm = renderFilms.find(el => el.id === movieId);
  }
  showDetails(selectFilm);

  queueListButton.removeEventListener('click', drawQueueFilmList);
  watchedListButton.removeEventListener('click', drawWatchedFilmList);
};

linkHomePage.addEventListener('click', activeHomePage);
linkLibraryPage.addEventListener('click', activeLibraryPage);
