const header = document.getElementById('header')
const title = document.getElementById('title')
const excerpt = document.getElementById('excerpt')
const profile_img = document.getElementById('profile_img')
const name = document.getElementById('name')
const date = document.getElementById('date')

const animated_bgs = document.querySelectorAll('.animated-bg')
const animated_bg_text = document.querySelectorAll('.animated-bg-text')

setTimeout(getData, 1500)

function getData(){
    header.innerHTML = '<img src="https://images.unsplash.com/photo-1661969090887-9797a6a23191?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1178&q=80" alt=""/>'

    profile_img.innerHTML = '<img src="https://randomuser.me/api/portraits/men/45.jpg" alt=""/>'

    title.innerHTML = "Lorem ipsum dolor sit amet"
    excerpt.innerHTML = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, soluta!"
    name.innerHTML = "John Doe"
    date.innerHTML = "06 Sept, 2022"

    animated_bgs.forEach((bg) => bg.classList.remove('animated-bg'))
    animated_bg_text.forEach((bg) => bg.classList.remove('animated-bg-text'))

}