const card = document.querySelectorAll('.faq')

card.forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active')
    })
})

