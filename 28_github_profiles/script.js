const APIURL = 'https://api.github.com/users/'
const form = document.querySelector('.user-form')
const search = document.querySelector('.search-box')
const main = document.querySelector('main')

let cardEl = document.createElement('div')


async function getUser(username){
    try {
        const { data } = await axios(APIURL + username)
        createUserCard(data)
        getRepos(username)

    }catch(err){
        if(err.response.status === 404)
        {
            createErrorCard('No profile with this username 😥')
        }
    }
}

async function getRepos(username){
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created')
        addRepos(data)

    }catch(err){
        createErrorCard('Problem fetching repo')
    }
}

function addRepos(repos){
    const reposEl = document.querySelector('.repos')


    repos
        .slice(0,5)
        .forEach( repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = "_blank"
            repoEl.innerText = repo.name
            reposEl.append(repoEl)
    })
}

function createErrorCard(message){

    cardEl.innerHTML = 
    `
        <div class="card">
            <h2 class="errorMsg">${message}</h2>
        </div>
    `

    main.appendChild(cardEl)
}


function createUserCard(user){

    cardEl.innerHTML = 
    `
            <div class="card">
                <div class="avatar-container">
                    <img class="avatar" src="${user.avatar_url}" alt="User image">
                </div>

                <div class="user-info">

                    <h2 class="user-name">${user.login}</h2>
                    <p class="user-description">${user.bio??""}</p>
                    
                    <ul class="stats">
                        <li><span class="followers-num">${user.followers}</span> Followers</li>
                        <li><span class="following-num">${user.following}</span> Following</li>
                        <li><span class="repos-num">${user.public_repos}</span> Repos</li>
                    </ul>
                    
                    <div class="repos">
                        
                    </div>

                </div>
                
            </div>
    `

    main.appendChild(cardEl)
}

form.addEventListener('submit', (e) => {

    e.preventDefault()
    const user = search.value

    if(user) {
        getUser(user)

        search.value = ''
    }
})