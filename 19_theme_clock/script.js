const hourEl = document.querySelector('.hour')
const minuteEl = document.querySelector('.minute')
const secondEl = document.querySelector('.second')
const timeEl = document.querySelector('.time')
const dateEl = document.querySelector('.date')
const toggle = document.querySelector('.toggle')
var k = 0
var l = 0

const days = ["Sunday", "Saturday", "Friday", "Thursday", "Wednesday", "Tuesday", "Monday", ];

const months = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

toggle.addEventListener('click', (e) => {
    const html = document.querySelector('html')
    if(html.classList.contains('dark')) {
        html.classList.remove('dark')
        e.target.innerHTML = 'Dark mode'
    }else{
        html.classList.add('dark')
        e.target.innerHTML = 'Light mode'
    }
})

function setTime() {
    const time = new Date()
    const month = time.getMonth()
    const day = time.getDay()
    const date = time.getDate()
    const hours = time.getHours() % 12
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    const ampm = time.getHours() >= 12 ? 'PM' : 'AM'
    
    
    hourEl.style.transform = `translate(-50%, -100%) rotate(${hours*30}deg)`

    clockMinutes = l + (minutes*6) 

    if(clockMinutes == 59){
        l = l + 360
    } else if(clockMinutes == 11){
        l = 0
    }

    minuteEl.style.transform = `translate(-50%, -100%) rotate(${clockMinutes}deg)`

    clockSeconds = k + (seconds*6)
    console.log(clockSeconds, clockMinutes)

    if(seconds == 59){
        k = k + 360
    } else if(hours == 11 && minutes == 59){
        k = 0
    }

    secondEl.style.transform = `translate(-50%, -100%) rotate(${clockSeconds}deg)`

    timeEl.innerHTML = `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`
    dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`

}

setTime()
setInterval(setTime, 1000)
 