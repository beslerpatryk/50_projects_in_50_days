const sliderVal = document.querySelector(".slider-value")
const sliderEl = document.querySelector(".slider")
sliderEl.value = 50;

sliderEl.addEventListener('input', e => {
    sliderVal.innerHTML = +e.target.value
    sliderVal.style.transform = `translateX(${(e.target.value-50)*2.85}px)`
})
