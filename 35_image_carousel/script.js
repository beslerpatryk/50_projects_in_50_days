const left = document.getElementById('left')
const right = document.getElementById('right')
const imgContainer = document.querySelector('.image-container')
let counter = 0;

function moveLeft(){
    if(counter > 0){
        counter--;
    }else {
        counter = 3;
    }
    imgContainer.style.transform = `translate(-${100 * counter}%)`
}

function moveRight(){
    if(counter < 3){
        counter++;
    } else {
        counter = 0;
    }
    imgContainer.style.transform = `translate(-${100 * counter}%)`
}

let interval = setInterval(moveRight, 2000)


function resetInterval(){
    clearInterval(interval)
    interval = setInterval(moveRight, 2000)
}



left.addEventListener('click', ()=> {
    moveLeft()
    resetInterval()
})

right.addEventListener('click', ()=> {
    moveRight()
    resetInterval()
})