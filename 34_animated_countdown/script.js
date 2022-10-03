const nums = document.querySelectorAll('.nums span')
const finalMsg = document.querySelector('.final')
const counter = document.querySelector('.counter')
const startBtn = document.querySelector('.start')
const replayBtn = document.querySelector('.replay')


function animate(){
    // Don't set the iter < 0.5 or the first number will end up choppy
    let iter = 0.5;
    setTimeout(()=>finalMsg.classList.toggle("show"), 1000*(nums.length+0.7))
    setTimeout(()=>counter.classList.toggle("hide"), 1000*(nums.length+0.5))

    nums.forEach(num => {
        setTimeout(()=>num.classList.add('in'), 1000*iter)
        setTimeout(()=>num.classList.remove('in'), 2000*iter)
        setTimeout(()=>num.classList.toggle('out'), 1000*(iter+0.5))
        setTimeout(()=>num.classList.remove('out'), 2000*(iter+0.5))
        iter++;    
    })
}

startBtn.addEventListener('click', () => {
    counter.classList.toggle("hide")
    animate()
    startBtn.classList.toggle("hide")
})

replayBtn.addEventListener('click', () => {
    counter.classList.toggle("hide")
    animate();
    finalMsg.classList.toggle("show")

})



