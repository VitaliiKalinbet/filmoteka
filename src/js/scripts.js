const moviesList = document.querySelector('#js-moviesList');

let popularFilms = [];

const fetchPopularMoviesList = () => {
  fetch('https://api.themoviedb.org/3/movie/popular?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=1')
    .then(data => data.json())
    .then(res => {
      res.results.forEach(movie => {
        moviesList.insertAdjacentElement('beforeend', createCardFunc(movie.backdrop_path, movie.title))
      })
      return res.results;
    })
    .catch(err => console.log(err));
}

const createCardFunc = (imgPath, filmTitle) => {
  const listItem = document.createElement('li');
  listItem.classList.add('main__filmListItem');

  const img = document.createElement('img');
  img.classList.add('main__filmListItemImg');
  img.setAttribute('src', `https://image.tmdb.org/t/p/w500/${imgPath}`)

  const title = document.createElement('h2');
  title.classList.add('main__filmListItemTitle');
  title.textContent = filmTitle;

  listItem.append(img, title);

  return listItem;
};

(async function startApp() {
await fetchPopularMoviesList();
console.log(moviesList);
})();

