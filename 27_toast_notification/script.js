const button = document.getElementById("button")
const toasts = document.querySelector(".toasts")
const messages = [
    'Message A',
    'Message B',
    'Message C',
    'Message D',
]

button.addEventListener('click', ()=> createNotification())

function createNotification(){
    const toast = document.createElement('div')
    toast.classList.add("toast")

    toast.innerHTML = getRandomMessage()

    toasts.appendChild(toast)

    setTimeout(() => {
        toast.remove()
    }, 1500)
}

function getRandomMessage(){
    return messages[Math.floor(Math.random()*messages.length)]
}
