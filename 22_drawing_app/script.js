const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const decrease = document.getElementById('decrease')
const increase = document.getElementById('increase')

const sizeEL = document.getElementById('size')

const colorPicker = document.getElementById('color')
const clear = document.getElementById('clear')


let size = 20
let color 

let isPressed = false
let x
let y

colorPicker.addEventListener('change', () =>
    color = colorPicker.value
)

clear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})



document.addEventListener('wheel', (e) => {
    sizeEL.innerHTML = size - parseInt(e.deltaY / 100);
    size = sizeEL.innerHTML

    if(size > 50){
        size = 50
        sizeEL.innerHTML = size
    } else if(size < 1){
        size = 1
        sizeEL.innerHTML = size
    }
})

increase.addEventListener('click', () => {
    if(size < 50) {
        sizeEL.innerHTML = parseInt(sizeEL.innerHTML)+1
        size = sizeEL.innerHTML
    }
})

decrease.addEventListener('click', () => {
    if(size > 1) {
        sizeEL.innerHTML = parseInt(sizeEL.innerHTML)-1
        size = sizeEL.innerHTML
    }
})



canvas.addEventListener('mousedown', (e) => {
    isPressed = true
    
    x = e.offsetX
    y = e.offsetY

})

canvas.addEventListener('mouseup', (e) => {
    isPressed = false
    
    x = undefined
    y = undefined

})

canvas.addEventListener('mousemove', (e) => {
    
    if(isPressed == true) {
        const x2 = e.offsetX
        const y2 = e.offsetY

        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)

        x = x2
        y = y2
    }

})

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = size * 2
    ctx.stroke()
}

