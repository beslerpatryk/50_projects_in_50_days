const resultEl = document.querySelector('.result')
const lengthEl = document.querySelector('.length')
const uppercaseEl = document.querySelector('.uppercase')
const lowercaseEl = document.querySelector('.lowercase')
const numberEl = document.querySelector('.numbers')
const symbolEl = document.querySelector('.symbols')
const generateEl = document.querySelector('.submit')
const clipboardEl = document.querySelector('.copy')
const form = document.querySelector('form')
const tooltip = document.querySelector('.tooltip');
const body = document.querySelector('body')

form.addEventListener('submit', (e) => {
    e.preventDefault();
})

// Object containing all Random Functions

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

// Clipboard button script

clipboardEl.addEventListener('click', (e)=> {

    // Disable button for 0.5s after a click
    clipboardEl.disabled = true;
    setTimeout(()=> clipboardEl.disabled = false , 500)

    // Check if password is not empty and put output into clipboard
    const password = resultEl.innerText
    if(!password) return
    navigator.clipboard.writeText(password)

    // Create Tooltip
    createToolTip(e);
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    const hasUpper = uppercaseEl.checked
    const hasLower = lowercaseEl.checked
    const hasNumber = numberEl.checked
    const hasSymbol = symbolEl.checked

    resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length)
})

function createToolTip(e){
    // Create tooltip element
    const tooltip = document.createElement('div')
    tooltip.classList.add('tooltip')
    tooltip.innerText = "Copied"

    // Get the information about cursor position
    const x = e.clientX
    const y = e.clientY

    // Position tooltip above cursor
    tooltip.style.left = x - 30 + "px"
    tooltip.style.top = y - 40 + "px"

    // Append and remove tooltip after 0.5s
    body.appendChild(tooltip)
    setTimeout(() => tooltip.remove(), 500)
}

function generatePassword(lower, upper, number, symbol, length){
    let generatedPassword = ''

    // Check how many options were selected
    const typesCount = lower + upper + number + symbol

    // Create array of all options selected
    let typesArray = [{lower},{upper},{number},{symbol}].filter(item => Object.values(item)[0])

    if(typesCount === 0) return ''


    for(let i=0; i<length; i+=typesCount){
        // Shuffle the order of types so that the output is not ex. "aA1bB2" and instead "123da21"
        typesArray = shuffleArray(typesArray)
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }

    return generatedPassword.slice(0,length)
}

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol(){
    const symbols = '!@#$%^&*(){}[]=<>/.,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}

function shuffleArray(array){
    const indexes = Array(array.length)
    const shuffledArray = []

    // Populate indexes array
    for(let i=0; i<array.length;i++){
        indexes[i] = i
    }

    for(let i=0; i<array.length;i++){
        // Pick random index from indexes array
        let newIndex = indexes[Math.floor((Math.random()*indexes.length))]
        
        // Remove picked index from indexes array
        indexes.splice(indexes.indexOf(newIndex), 1)
        
        // Assign value at newIndex to the shuffledArray
        shuffledArray[i] = array[newIndex]
    }

    return shuffledArray
}