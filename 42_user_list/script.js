const filter = document.getElementById("filter") 
const result = document.getElementById("result")
const listItems = []

getData()
filter.addEventListener('input', (e) => filterData(e.target.value))

async function getData(){
    const res = await fetch ('https://randomuser.me/api?results=50')
    const {results} = await res.json();

    // Clear loading li Element
    result.innerHTML = ""

    results.forEach(user => {
        const li = document.createElement('li')
        li.classList.add("profile")
        listItems.push(li)

        li.innerHTML = 
        `
            <img src="${user.picture.large}" alt="${user.name.first}">
                <div class="user-info">
                    <h2>${user.name.first} ${user.name.last}</h2>
                    <p>${user.location.city}, ${user.location.country}</p>
            </div>
        `

        result.append(li)
    })
}

function filterData(searchTerm){
    listItems.forEach(item => {
        if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())){
            item.classList.remove("hide")
        } else {
            item.classList.add("hide")
        }
    })
}
