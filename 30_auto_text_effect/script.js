const textEl = document.querySelector('.auto-text')
const speedEl = document.querySelector('#speed-input')
const text = "We love programming!"
let idx = 1
let speed = 300 / speedEl.value

writeText()

function writeText(){
    textEl.innerText = text.slice(0,idx)
    idx++
    if(idx > text.length){
        idx=1
    }

    setTimeout(writeText, speed)
}

speedEl.addEventListener('input', (e) => {
    if(speedEl.value) speed = 300 / speedEl.value
})