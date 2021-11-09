const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const MOVIE_URL = "https://api.themoviedb.org/3/movie/{movie_id}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US"
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const CREDIT_IMG_PATH = 'https://image.tmdb.org/t/p/w185'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&query="'

const contentContainer = document.querySelector('.content-wrapper')
const form = document.getElementById('form')
const search = document.getElementById('search')
const input = document.querySelector('input')
const suggestions = document.querySelector('.suggestions')
var previousSearchTerm = ""

let moviePages = 1;
let onlyOnce = false;

getMovies(API_URL)

//Header functionality

const searchObj = {
    term: "",
    previousTerm: "",
    run(){
        if(this.term !== this.previousTerm){
            suggestions.innerHTML = ""
            if(this.term && this.term !== ''){
                searchMovies(SEARCH_API + this.term).then((results) => {
                    results.forEach(result =>{
                        let entry = document.createElement("li")
                        entry.innerText = result
                        entry.addEventListener('click', ()=>{
                            search.value = result
                            getMovies(SEARCH_API + search.value)
                            suggestions.innerHTML = ""
                            search.value = ``
                        })
                        suggestions.append(entry)
                    })
                })
            }
        }
        this.previousTerm = this.term
    }
}

let debounceTimeout
let searchTerm = ""
input.addEventListener('keyup', e => {
    clearTimeout(debounceTimeout)
    searchTerm = e.target.value
    debounceTimeout = setTimeout(()=>{
        searchObj.term = searchTerm 
        searchObj.run()
    },200)
})

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


//Fetch Data Functions

async function searchMovies(url){
    const res = await fetch(url)
    const data = await res.json()
    var counter = 0;
    const results = []
    for(let i=0; i < data.results.length; i++){
        if(!results.includes(data.results[i].title)){
            results.unshift(data.results[i].title)
        }
        if(counter<4){
            counter++
        }else{
            return results
        }
    }
    return results
}

async function getMovies(url) {
    moviePages = 1
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    showMovies(data.results, data.total_pages, url)
}

async function getMoreMovies(url){
    const res = await fetch(url)
    const data = await res.json()
    appendPage(data.results, data.total_pages, url)
}

async function getDetails(movieId) {
    if(onlyOnce === false){
        onlyOnce = true
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
}

//DOM Manipulation Functions

function showMovies(movies, pages, url){
    contentContainer.innerHTML = ''

    movies.forEach((movie,idx) =>{
        const { title, id, poster_path, vote_average, overview, release_date} = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie') 
        let overviewShort = shortenOverview(overview)
        movieEl.innerHTML = 
        `
            <div class="movie-card">
                ${checkPoster(poster_path, title)}
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
        contentContainer.appendChild(movieEl)

        const poster = document.querySelectorAll(".poster")
        poster[idx].addEventListener('click', ()=> {
            getDetails(id);
        })

    })
        if(pages > 1){
            loadMoreBtn = document.createElement('button')
            loadMoreBtn.classList.add('load-more-btn')
            loadMoreBtn.addEventListener('click', () => {
                moviePages++
                url = url.replace(`page=${moviePages-1}`, `page=${moviePages}`)
                getMoreMovies(`${url}`);
            })
            loadMoreBtn.innerHTML = "Load More"
            contentContainer.appendChild(loadMoreBtn)
        } else if (pages == 0){
            contentContainer.innerHTML = 'No results found'
            contentContainer.style = "color: white; margin-top: 4rem;"
        }
}

function showDetails(details,images,videos,credits){
    
        const {title,  poster_path, vote_average, overview, release_date, budget, genres, runtime, vote_count, original_title, original_language, revenue} = details
        const trailerAvailable = checkTrailer(videos)
        const movieEl = document.createElement('div')
        const bodyEl = document.getElementById('body')
        bodyEl.classList.add("stop-scrolling")
        


        let videoKey
        try{
            videoKey = videos.results[0].key
        } catch(error){
            videoKey = 0
        }
        movieEl.id = "movie-detail"
        movieEl.classList.add('movie-detail') 


        // creditList = makeCreditList(credits)
                // <ul class="credits-list">${creditList}</ul>

        if(trailerAvailable){
             movieEl.innerHTML = 
        `
                <img class="close-btn" onclick="removeDetail()" src="images/close.png" width="32" height="32"></img>
                ${checkBackdrop(images)}
                    <div class="custom-bg"></div>
                    ${checkPoster(poster_path, title)}
                    <div class="movie-info">
                        <h3>
                            ${title} (${release_date.slice(0,4)})
                            
                        </h3>
                        <h4>${release_date} (US)
                            <span class="genres">${makeGenreList(genres)}</span>
                            <span class="runtime">${formatRuntime(runtime)}</span>
                        <button class="trailer-btn" onclick="showTrailer()">Play trailer</button>
                        </h4>
                        <ul class="detail-list">
                            <li>
                                <h6>Score</h6>
                                <span>
                                    <span class="${getClassByRate(vote_average)}">${checkVote(vote_average*10)}</span>
                                    /${vote_count}
                                </span>
                            </li>
                            <li>
                                <h6>Budget</h6>
                                <span>${formatBigNumber(budget)} USD</span>
                            </li>
                            <li>
                                <h6>Original Title</h6>
                                <span>${original_title}</span>
                            </li>
                            <li>
                                <h6>Revenue</h6>
                                <span>${formatBigNumber(revenue)} USD</span>
                            </li>
                        </ul>
                        <div class="overview-detail">
                            <h5>Overview</h5>
                            <p>${overview}</p>
                        </div>
                        <div id="trailer" class="trailer hidden pause-video">
                            <iframe id="frame" class="frame" src="https://www.youtube.com/embed/${videoKey}" controls="true" width="1100" height="630" frameborder="0" autoplay; encrypted-media; modestbranding" allowfullscreen></iframe>
                        </div>
                    </div>    
                </div>
        `
        }else{
             movieEl.innerHTML = 
        `
            <img class="close-btn" onclick="removeDetail()" src="images/close.png" width="32" height="32"></img>

                           ${checkBackdrop(images)}

                <div class="custom-bg"></div>
                <img class="poster" src="${IMG_PATH + poster_path}" alt="${title}">
                <div class="movie-info">
                    <h3>${title} (${release_date.slice(0,4)})</h3>
                    <h4>${release_date} (US)
                        <span class="genres">${makeGenreList(genres)}</span>
                        <span class="runtime">${formatRuntime(runtime)}</span>
                    </h4>
                    <span class="${getClassByRate(vote_average)}">${checkVote(vote_average*10)}</span>
                        <ul class="detail-list">
                            <li>
                                <h6>Vote/Votes</h6>
                                <span>${vote_average}/${vote_count}</span>
                            </li>
                            <li>
                                <h6>Budget</h6>
                                <span>${formatBigNumber(budget)} USD</span>
                            </li>
                            <li>
                                <h6>Original Title</h6>
                                <span>${original_title}</span>
                            </li>
                            <li>
                                <h6>Revenue</h6>
                                <span>${formatBigNumber(revenue)} USD</span>
                            </li>
                        </ul>
                        <div class="overview-detail">
                            <h5>Overview</h5>
                            <p>${overview}</p>
                        </div>
                </div>    
            </div>
        `
        }
        contentContainer.appendChild(movieEl)
}


function appendPage(movies, pages, url){
    const oldLoadMoreButton = document.querySelector(".load-more-btn")
    oldLoadMoreButton.remove()
    movies.forEach((movie,idx) =>{
        const { title, id, poster_path, vote_average, overview, release_date} = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie') 

        let overviewShort = shortenOverview(overview)
        movieEl.innerHTML = 
        `
            <div class="movie-card">
                ${checkPoster(poster_path, title)}
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
        contentContainer.appendChild(movieEl)
        const poster = document.querySelectorAll(".poster")
        poster[idx+(moviePages-1)*20].addEventListener('click', ()=> {
            getDetails(id);
        },{once:true})

        })
        console.log(pages, moviePages)
        if(pages > moviePages){
            const loadMoreBtn = document.createElement('button')
            loadMoreBtn.classList.add('load-more-btn')
            loadMoreBtn.addEventListener('click', () => {
                moviePages++
                url = url.replace(`page=${moviePages-1}`, `page=${moviePages}`)
                getMoreMovies(`${url}`);
            })
             loadMoreBtn.innerHTML = "Load More"
                contentContainer.appendChild(loadMoreBtn)
        }
        

}

//Supplementary Functions

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

function makeCreditList(credits){
    let creditsList = ""
    for(let i = 0; i < 5; i++){
        creditsList += `<li class="credits-card">
                ${checkCredits(credits, i)}
                  
                </li>`
    }
    return creditsList
}

function formatRuntime(runtime){
    return Math.floor(runtime/60) + "h " + `${runtime%60}` + "min"
}


function makeGenreList(genres){
    let genreList = ""
    genres.forEach(genre => {
        genreList += genre.name + ", "
    })
    genreList = genreList.trimRight()
    return genreList.slice(0, -1)
}

function formatBigNumber(num) {
    let result = num.toString()
    let length = result.length

    for(let i=(length-3); i>0; i-=3){
        result = result.slice(0,i) + "," + result.slice(i)
    }
    return result
}


function shortenOverview(overview){
    let commas = 0
    for(let i=0; i < overview.length; i++){
        if(commas === 1)
        {
            return overview.slice(0,i)
        }
        if(overview[i] === "." && overview.slice(i-2,i) !== "Dr" && overview.slice(i-1,i) > "a"){
            commas++
        }
    }
    return overview
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

function checkPoster(posterPath,title){
    if(posterPath === null){
       return `<img class="poster" src="images/posterBackup.jpg" alt="${title}"></img>`
    }else {
        return `<img class="poster" src="${IMG_PATH + posterPath}" alt="${title}"></img>`
    }
}

function checkCredits(credits, i){
    if(credits.cast[i].profile_path === null){
        const d = 
        `
         <img class="actor-photo" src="images/castBackup.jpg" alt="${credits.cast[i].name}"></img>
                <div class="actor-info">
                        <h5>${credits.cast[i].name}</h5>
                        <h6>${credits.cast[i].character}</h6>
                   </div>
        `
       return d
       
    }else {
        const a = 
        `
        <img class="actor-photo" src="${CREDIT_IMG_PATH + credits.cast[i].profile_path}" alt="${credits.cast[i].name}"></img>
            <div class="actor-info">
                <h5>${credits.cast[i].name}</h5>
                <h6>${credits.cast[i].character}</h6>
            </div>
        `
        
        return a
    }
}

function checkTrailer(videos){
    if(videos.results[0] !== undefined){
        return true
    }else{
        return false
    }
}

function checkBackdrop(images){
    if(images.backdrops[0] != undefined){
        return `<div class="detail-header" style="background-image:url(${IMG_PATH + images.backdrops[0].file_path})">`
    }else{
        return `<div class="detail-header">`
    }
}

function removeDetail(){
    const bodyEl = document.getElementById('body')
    bodyEl.classList.remove("stop-scrolling")
    onlyOnce = false;
    const detailEl = document.getElementById("movie-detail")
    detailEl.remove();
}