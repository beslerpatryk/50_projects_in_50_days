const codeBoxes = document.querySelectorAll(".code")

codeBoxes[0].focus()

codeBoxes.forEach((code,idx) => {
    code.addEventListener('keydown', (e)=>{
        if(e.key >= 0 && e.key <=9 && idx !== codeBoxes.length-1){
            codeBoxes[idx].value = ''
            setTimeout(()=>codeBoxes[idx+1].focus(), 10)   
        }
        else if(e.key === 'Backspace' && idx!==0){
            setTimeout(()=>codeBoxes[idx-1].focus(), 10)
        }else{
            codeBoxes[idx].value = ''
        }
    })
})