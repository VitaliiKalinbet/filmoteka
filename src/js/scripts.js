const filmListUl = document.querySelector('#main__filmList');

let popularFilms = [];

const popularFilmsFetch = async () => {
  let resArr = null;
  fetch('https://api.themoviedb.org/3/movie/popular?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=1')
    .then(data => data.json())
    .then(res => {
      resArr = res.results;
      console.log('dfdfsdf');
    })
    .catch(err => console.log(err));
  return resArr;
}

const createCardFunc = (imgPath, filmTitle) => {
  const li = document.createElement('li');
  li.classList.add('main__filmListItem');
  const img = document.createElement('img');
  img.classList.add('main__filmListItemImg');
  img.setAttribute('src', `https://image.tmdb.org/t/p/w500/${imgPath}`)
  const title = document.createElement('h2');
  title.classList.add('main__filmListItemTitle');
  title.textContent = filmTitle;
  li.append(img, title);
  return li;
};

console.log('popularFilmsFetch :', popularFilmsFetch());
// console.log(popularFilms.map(el => console.log(el)));

// const liArr = [...popularFilms.map(el => {
//   console.log(el);
//   return el;
// })];

// console.log('liArr :', liArr);

// filmListUl.append();
