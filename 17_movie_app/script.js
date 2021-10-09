const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const MOVIE_URL = "https://api.themoviedb.org/3/movie/{movie_id}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US"
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const CREDIT_IMG_PATH = 'https://image.tmdb.org/t/p/w185'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const homeBtn = document.getElementById('home-btn')

//Get initial movies
getMovies(API_URL)
homeBtn.addEventListener('click', show)

function show(){
    const detailCard = document.querySelector(".movie-detail")
    detailCard.remove()
    const popularMovies = document.querySelectorAll(".movie")
    popularMovies.forEach(card => {
        card.style.display = "initial";
    })
}

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

async function getDetails(movieId) {
    const res1 = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`)
    const data1 = await res1.json()

    const res2 = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=3fd2be6f0c70a2a598f084ddfb75487c&`)
    const data2 = await res2.json()

    const res3 = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=3fd2be6f0c70a2a598f084ddfb75487c&`)
    const data3 = await res3.json()

    const res4 = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=3fd2be6f0c70a2a598f084ddfb75487c&`)
    const data4 = await res4.json()


    showDetails(data1, data2, data3, data4)
}

function showMovies(movies){
    main.innerHTML = ''

    movies.forEach((movie,idx) =>{
        const { title, id, poster_path, vote_average, overview, release_date} = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie') 

        let overviewShort = getFirstFour(overview)
        movieEl.innerHTML = 
        `
            <div class="movie-card">
                <img class="poster" src="${IMG_PATH + poster_path}" alt="${title}">
                 <div class="overview">
                    <h3>Overview</h3>
                    ${overviewShort}
                </div>
                <span class="${getClassByRate(vote_average)}">${checkVote(vote_average*10)}</span>
                <div class="movie-info">
                    <h3>${title}</h3>
                    <h4>${release_date}</h4>
                </div>
            </div>
        `
        main.appendChild(movieEl)

        const poster = document.querySelectorAll(".poster")
        poster[idx].addEventListener('click', ()=> {
            getDetails(id);
        },{once:true})

    })
}

function showDetails(details,images,videos,credits){
    
    const popularMovies = document.querySelectorAll(".movie")
    popularMovies.forEach(card => {
        card.style.display = "none";
    })
        const { title, id, poster_path, vote_average, overview, release_date, budget, genres,runtime} = details
        const movieEl = document.createElement('div')
        let videoKey
        try{
            videoKey = videos.results[0].key
        } catch(error){
            videoKey = 0
        }
        movieEl.classList.add('movie-detail') 


        // add to markup later -- score
        // add later - button for play trailer
        //                 <button id="play-trailer-btn" class="play-trailer-btn" onclick="playVideo()">Play Trailer</button>
        console.log(credits.cast[0].profile_path)
        console.log(credits)

        creditList = makeCreditList(credits)

        if(videoKey !== 0){
             movieEl.innerHTML = 
        `
            <div class="header" style="background-image:url(${IMG_PATH}${images.backdrops[0].file_path})">
                <div class="custom-bg"></div>
                <img class="poster" src="${IMG_PATH + poster_path}" alt="${title}">
                <div class="movie-info">
                    <h3>${title} (${release_date.slice(0,4)})</h3>
                    <h4>${release_date} (US)
                        <span class="genres">${getGenres(genres)}</span>
                        <span class="runtime">${formatRuntime(runtime)}</span>
                    <button onclick="showTrailer()">Play trailer</button>
                    </h4>
                    <span class="${getClassByRate(vote_average)}">${checkVote(vote_average*10)}</span>

                    <div class="overview">
                        <h5>Overview</h5>
                        <p>${overview}</p>
                    </div>
                    <div id="trailer" class="trailer hidden pause-video">
                        <iframe id="frame" class="frame" src="https://www.youtube.com/embed/${videoKey}" controls="true" width="1100" height="630" frameborder="0" autoplay; encrypted-media; modestbranding" allowfullscreen></iframe>
                    </div>
                    <h6>Budget: ${formatBigNumber(budget)}$</h6>
                </div>    
            </div>
            <ul>${creditList}</ul>
        `
        }else{
             movieEl.innerHTML = 
        `
            <div class="header" style="background-image:url(${IMG_PATH}${images.backdrops[0].file_path})">
                <div class="custom-bg"></div>
                <img class="poster" src="${IMG_PATH + poster_path}" alt="${title}">
                <div class="movie-info">
                    <h3>${title} (${release_date.slice(0,4)})</h3>
                    <h4>${release_date} (US)
                        <span class="genres">${getGenres(genres)}</span>
                        <span class="runtime">${formatRuntime(runtime)}</span>
    
                    </h4>
                    <h5>Overview</h5>
                    <p>${overview}</p>
                    
                    <h6>Budget: ${formatBigNumber(budget)}$</h6>
                </div>    
            </div>
            <ul>${creditList}</ul>
        `
        }


        main.appendChild(movieEl)

}

function makeCreditList(credits){
    let out = ""
    for(let i = 0; i < 5; i++){
        out += `<li class="credit-card">
                    <img class="actor-photo" src="${CREDIT_IMG_PATH + credits.cast[i].profile_path}" alt="${credits.cast[i].name}">
                   <div class="actor-info">
                        <h5>${credits.cast[i].name}</h5>
                        <h6>${credits.cast[i].character}</h6>
                   </div>
                </li>`
    }
    return out
}

function showTrailer(){
    const trailer = document.getElementById("trailer")
    const frame = document.getElementById('frame')
    trailer.classList.remove('hidden')

    trailer.addEventListener('click', ()=>{
        trailer.classList.add('hidden')

        const source = frame.src
        frame.src = ''
        frame.src = source
    })
}

function formatRuntime(runtime){

    return Math.floor(runtime/60) + "h " + `${runtime%60}` + "min"

    // return full hours and rest of minutes
}


function getGenres(genres){
    let genreList = ""
    genres.forEach(genre => {
        genreList += genre.name + ", "
    })
    genreList = genreList.trimRight()
    return genreList.slice(0, -1)
}

function formatBigNumber(num) {
    num = num.toString()
    let out = num;
    for(let i=(num.length-3); i>0; i-=3){
        out = out.slice(0,i) + "," + out.slice(i)
    }
    return out
}


function getFirstFour(sentence){
    let commas = 0
    for(let i=0; i < sentence.length; i++){
        if(commas === 1)
        {
            return sentence.slice(0,i)
        }
        if(sentence[i] === "." && sentence.slice(i-2,i) !== "Dr" && sentence.slice(i-1,i) > "a"){
            commas++
        }
    }
    return sentence
}

function getClassByRate(vote) {
    if(vote >= 7){
        return 'green'
    } else if(vote >=5){
        return 'orange'
    }else{
        return 'red'
    }
}

function checkVote(vote){
    if(vote > 0){
        return vote + "%"
    }else{
        return '✕'
    }
}

form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})