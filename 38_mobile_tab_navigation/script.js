const contents = document.querySelectorAll(".content")
const buttons = document.querySelectorAll("nav ul li")

buttons.forEach((button, idx) => {
    button.addEventListener('click', ()=>{
        hideAllActive()
        hideAllContents()
        button.classList.add("active")
        contents[idx].classList.add("show")
    })
})

function hideAllContents(){
    contents.forEach(content => content.classList.remove("show"))
}

function hideAllActive(){
    buttons.forEach(button => button.classList.remove("active"))
}