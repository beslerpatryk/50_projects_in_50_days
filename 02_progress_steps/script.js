const progress = document.getElementById('progress')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const circles = document.querySelectorAll('.circle')
const formEl = document.querySelector("form")

console.log(formEl)

let currentActive = 1

formEl.querySelector(".password").classList.add('hidden')
formEl.querySelector(".email").classList.add('hidden')
formEl.querySelector("#submit").classList.add('hidden')

next.addEventListener('click', () =>{
    currentActive++

    if(currentActive > circles.length){
        currentActive = circles.length
    }
    update()
})

prev.addEventListener('click', () =>{
    currentActive--

    if(currentActive < 1){
        currentActive = 1
    }

    update()
})

function update() {
    circles.forEach((circle, idx) => {
        if(idx < currentActive){
            circle.classList.add('active')
        }
        else{
            circle.classList.remove('active')
        }
    })

    const actives = document.querySelectorAll('.active')
     
    progress.style.width = (actives.length-1)/(circles.length-1) * 100 + '%'

    if(currentActive == 1) {
        prev.disabled = true;
    } else if(currentActive == circles.length){
        next.disabled = true
    } else {
        prev.disabled = false
        next.disabled = false
    }

    if(currentActive == 1){
        formEl.querySelector(".username").classList.remove('hidden')
        formEl.querySelector(".password").classList.add('hidden')
        formEl.querySelector(".email").classList.add('hidden')
        formEl.querySelector("#submit").classList.add('hidden')
    } else if(currentActive == 2){
        formEl.querySelector(".username").classList.add('hidden')
        formEl.querySelector(".password").classList.remove('hidden')
        formEl.querySelector(".email").classList.add('hidden')
        formEl.querySelector("#submit").classList.add('hidden')
    } else if(currentActive == 3){
        formEl.querySelector(".username").classList.add('hidden')
        formEl.querySelector(".password").classList.add('hidden')
        formEl.querySelector(".email").classList.remove('hidden')
        formEl.querySelector("#submit").classList.add('hidden')
    } else if(currentActive == 4){
        formEl.querySelector(".username").classList.add('hidden')
        formEl.querySelector(".password").classList.add('hidden')
        formEl.querySelector(".email").classList.add('hidden')
        formEl.querySelector("#submit").classList.remove('hidden')
    } 
}