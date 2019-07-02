'use strict'

let moviesList = document.querySelector('#js-moviesList');
let renderFilms = [];
let inputValue = "";
let pageNumber = 1;
let genres;

const fetchPopularMoviesList = () => {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${pageNumber}`)
    .then(data => data.json())
    .then(res => {
      if (res.results.length > 1) {
        moviesList.innerHTML = "";
      }
      res.results.forEach(movie => {
        moviesList.insertAdjacentElement('beforeend', createCardFunc(movie.backdrop_path, movie.title, movie.id))
      })
      renderFilms = res.results;
      return renderFilms;
    })
    .catch(err => console.log(err));
}

function fetchGenres() {
  fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US')
    .then(data => data.json())
    .then(res => {
      genres = [...res.genres];
    })
    .catch(err => console.log(err));
}

function createCardFunc(imgPath, filmTitle, movieId) {
  const listItem = document.createElement('li');
  listItem.classList.add('main__filmListItem');
  listItem.setAttribute('id', 'js-filmListItem');

  const img = document.createElement('img');
  img.classList.add('main__filmListItemImg');
  img.setAttribute('src', `https://image.tmdb.org/t/p/w500/${imgPath}`)

  const title = document.createElement('h2');
  title.classList.add('main__filmListItemTitle');
  title.textContent = filmTitle;

  listItem.append(img, title);

  // вешаю слушателя для переключения страниц функция activeDetailsPage в файле navigation.js
  listItem.addEventListener('click', () => activeDetailsPage(movieId));
  return listItem;
};

(async function startApp() {
  await fetchPopularMoviesList();
  await fetchGenres();
})();

const searchFilmForm = document.querySelector('#js-form');
const searchFilmInput = document.querySelector('#js-input');
const backButton = document.querySelector('#js-backButton');
backButton.classList.add('main__hide');
const nextButton = document.querySelector('#js-nextButton');
let plaginationPageNumber = document.querySelector('#js-plaginationPageNumber');

function fetchFilms() {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${pageNumber}&include_adult=false&query=${inputValue}`)
    .then(data => data.json())
    .then(res => {
      if (res.results.length > 1) {
        moviesList.innerHTML = "";
      }
      res.results.forEach(movie => {
        moviesList.insertAdjacentElement('beforeend', createCardFunc(movie.backdrop_path, movie.title, movie.id))
      })
      renderFilms = res.results;
      return renderFilms;
    })
    .catch(err => console.log(err));
}

function serchFilm(event) {
  event.preventDefault();
  inputValue = searchFilmInput.value;
  searchFilmForm.reset();
  console.log(inputValue);
  fetchFilms();
}

searchFilmForm.addEventListener('submit', serchFilm);

function plaginationNavigation(button) {
  pageNumber === 1 || pageNumber < 1 ? backButton.classList.add('main__hide') : backButton.classList.remove('main__hide');
  if (button === "backButton") {
    pageNumber = pageNumber - 1;
    plaginationPageNumber.textContent = pageNumber;
    if (inputValue === '') {
      fetchPopularMoviesList();
    } else {
      fetchFilms();
    }
  } else {
    pageNumber = pageNumber + 1;
    plaginationPageNumber.textContent = pageNumber;
    if (inputValue === '') {
      fetchPopularMoviesList();
    } else {
      fetchFilms();
    }
  }
  pageNumber === 1 || pageNumber < 1 ? backButton.classList.add('main__hide') : backButton.classList.remove('main__hide');
}

backButton.addEventListener('click', () => plaginationNavigation("backButton"));
nextButton.addEventListener('click', () => plaginationNavigation("nextButton"));
