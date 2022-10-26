const ratings = document.querySelectorAll(".rating")
const sendBtn = document.querySelector(".btn")
const panelContainer = document.querySelector(".ratings-container")
let feedback = ""

sendBtn.addEventListener('click', e => {
    const panel = document.querySelector("#panel")
    panel.innerHTML = 
    `
        <i class="fas fa-heart"></i>
        <strong>Thank You!</strong>
        <br>
        <strong>Feedback: ${feedback}</strong>
        <p>We'll use your feedback to improve our customer support.</p>
    `
})

panelContainer.addEventListener('click', e => {
    if(e.target.parentNode.classList.contains("rating")){
        clearSelected()
        e.target.parentNode.classList.add('selected')
        feedback = document.querySelector('.selected').innerText
    } else if(e.target.classList.contains("rating")){
        clearSelected()
        e.target.classList.add('selected')
        feedback = document.querySelector('.selected').innerText
    }
})

function clearSelected(){
    ratings.forEach(ratingEl => {
        ratingEl.classList.remove("selected")
    })
}