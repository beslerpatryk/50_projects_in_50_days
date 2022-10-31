const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
];

const quiz = document.querySelector(".quiz-container")
const submitBtn = document.querySelector("#submit")
const a_text = document.querySelector("#a_text")
const b_text = document.querySelector("#b_text")
const c_text = document.querySelector("#c_text")
const d_text = document.querySelector("#d_text")
const answerEls = document.querySelectorAll(".answer")

let idx = 0;
let score = 0;

function loadQuiz() {
    deselectAnswers()
    const currentQuizData = quizData[idx]

    question.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers(){
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected(){
    let answer

    answerEls.forEach(answerEl => {
        if(answerEl.checked){
            answer = answerEl.id
        }
    })

    return answer
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer){
        if(answer === quizData[idx].correct){
            score++
        }
        idx++
        console.log(idx)
        if(idx < quizData.length){
            loadQuiz()
        }else{
            quiz.innerHTML = 
            `
                <h2>You answered correctly at ${score}/${quizData.length} questions</h2>
                <button onclick="location.reload()">Reload</button>
            `
        }

    }
})

// function displayQuestion(idx){
//     quizHeader.innerHTML = 
//     `
//         <h2 id="question">${quizData[idx].question}</h2>
//             <ul>
//                 <li>
//                     <input type="radio" name="answer" id="a" class="answer">
//                     <label for="a" id="a_text">${quizData[idx].a}</label>
//                 </li>

//                 <li>
//                     <input type="radio" name="answer" id="b" class="answer">
//                     <label for="b" id="b_text">${quizData[idx].b}</label>
//                 </li>

//                 <li>
//                     <input type="radio" name="answer" id="c" class="answer">
//                     <label for="c" id="c_text">${quizData[idx].c}</label>
//                 </li>

//                 <li>
//                     <input type="radio" name="answer" id="d" class="answer">
//                     <label for="d" id="d_text">${quizData[idx].d}</label>
//                 </li>
//             </ul>
//     `
// }

// function displaySummary(rightAnswers){
//     quizHeader.innerHTML = 
//     `
//         <h2 id="question">You answered correctly at ${rightAnswers}/${quizData.length} questions</h2>
//     `

//     submitBtn.innerText = "Reload"
//     submitBtn.addEventListener('click', loadQuiz)
// }

// let idx
// let rightAnswers

// function loadQuiz(){
//     submitBtn.removeEventListener('click', loadQuiz)
//     submitBtn.innerText = "Submit"

//     idx = 0
//     rightAnswers = 0
//     displayQuestion(idx)
//     let answersEl
//     let answer

//     submitBtn.addEventListener('click', e => {
//         answersEl = document.querySelectorAll(".answer")
//         answersEl.forEach(answerEl => {
//                 if(answerEl.checked) {
//                     answer = answerEl.id
//                 }
//             }
//         )
//         if(answer === quizData[idx].correct){
//             rightAnswers++
//         }
//                 console.log(idx)
        
//             if(idx < quizData.length-1){
                
//                 displayQuestion(++idx)

                
//             } else {
//                 displaySummary(rightAnswers)
//                 return 0
//             }
//         }
//     )
// }

loadQuiz()