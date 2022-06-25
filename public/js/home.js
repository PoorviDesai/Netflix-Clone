const main = document.querySelector('.main');

fetch(genres_list_http + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    data.genres.forEach(item => {
        fetchMoviesListByGenres(item.id, item.name);
    })
});

const fetchMoviesListByGenres = (id, genres) => {
    fetch(movie_genres_http + new URLSearchParams({
        api_key: api_key,
        with_genres: id,
        page: Math.floor(Math.random() * 3) + 1
    }))
    .then(res => res.json())
    .then(data => {
        makeCategoryElement(`${genres}_movies`, data.results);
    })
    .catch(err =>  console.log(err));
}

const makeCategoryElement = (category, data) => {
    main.innerHTML += `
    <div class="movie-list">

        <button class="pre-btn"><img src="img/pre.png" alt=""></button>

        <h1 class="movie-category">${category.split("_").join(" ")}</h1>

        <div class="movie-container" id="${category}">

        </div>

        <button class="nxt-btn"><img src="img/nxt.png" alt=""></button>

    </div>
    `;
    makeCards(category, data);
}

const makeCards = (id, data) => {
    const movieContainer = document.getElementById(id);
    data.forEach((item, i) => {
        if(item.backdrop_path == null){
            item.backdrop_path = item.poster_path;
            if(item.backdrop_path == null){
                return;
            }
        }

        movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}'">
            <img src="${img_url}${item.backdrop_path}" alt="">
            <p class="movie-title">${item.title}</p>
        </div>
        `;
        //working card slider
        if(i == data.length - 1){
            setTimeout(() => {
                setupScrolling();
            }, 100);
        }
        //this condition means execute the following code
        //when we are done making all cards
    })
}


// //for creating dynamic elements
// //select main from document
// const main = document.querySelector('.main');

// fetch(genres_list_http + new URLSearchParams({
//     api_key : api_key
// }))
// .then(res => res.json())
// //console log the fetched data
// // .then(data => console.log(data));
// .then(data => {
//     data.genres.forEach(item => {
//         fetchMoviesListByGenres(item.id, item.name);
//     })
// });
// //we want to fetch the movie data accrding to the genres we fetched
// const fetchMoviesListByGenres = (id, genres) => {
//     fetch(movie_genres_http + new URLSearchParams({
//         api_key : api_key,
//         with_genres: id,
//         page: Math.floor(Math.random() * 3) + 1
//     }))
//     .then(res => res.json())
//     .then(data => {
//         makeCategoryElement(`${genres}_movies`, data.results);
//     })
//     .catch(err => console.log(err));
// }
// const makeCategoryElement = (category, data) => {
//     main.innerHTML += `
//     <div class="movie-list">

//     <button class="pre-btn"><img src="img/pre.png" alt=""></button>

//     <h1 class="movie-category">${category.split("_").join(" ")}</h1>

//     <div class="movie-container" id="${category}>

//     </div>

//     <button class="nxt-btn"><img src="img/nxt.png" alt=""></button>
//     </div>
    
//     `;
//     //function for creating movie cards
//     makeCards(category, data);
// }
// const makeCards = (id, data) => {
//     const movieContainer = document.getElementById(id);
//     data.forEach((item, i) => {
//         if(item.backdrop_path == null)
//         {
//             item.backdrop_path = item.poster_path;
//             if(item.backdrop_path == null)
//             {
//                 //if we get nothing return from the loop
//                 //to prevent from amkign a movie card
//                 return;
//             }
//         }
//         movieContainer.innerHTML += `
//         <div class="movie">
//             <img src="${img_url}${item.backdrop_path}" alt="">
//             <p class="movie-title">${item.title}</p>
//         </div>    
//         `;
//     })
// }