const button = document.querySelectorAll('.faq-toggle')

button.forEach(toggle => {
    toggle.addEventListener('click', ()=> {
        toggle.parentNode.classList.toggle('active')
    })
});