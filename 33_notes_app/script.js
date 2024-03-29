const addBtn = document.getElementById('add')
const notes = JSON.parse(localStorage.getItem('notes'))

if(notes.length > 0){
    notes.forEach(note => addNewNote(note))
}else{
    createTemplateNote()
}

addBtn.addEventListener('click', ()=> addNewNote())

function deleteNote(note){
    note.remove()
    updateLS()
}

function editNote(main, textArea){
    main.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
}

function addNewNote(text=''){
    const note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML = 

    `
        <div class="tools">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>

        <div class="${text?'':'hidden'} main"></div>
        <textarea class="${text?'hidden':''}"></textarea>
    `

    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked.parse(text)

    editBtn.addEventListener('click', () => editNote(main, textArea))
    deleteBtn.addEventListener('click', () => deleteNote(note))


    textArea.addEventListener('input', (e) => {
        const {value} = e.target
        main.innerHTML = marked.parse(value)
        updateLS()
    })

    document.body.append(note)
    updateLS()

}

function updateLS(){
        const notesText = document.querySelectorAll('textarea')

        const notes = []

        notesText.forEach(note => notes.push(note.value))

        localStorage.setItem('notes', JSON.stringify(notes))
}

function createTemplateNote(){
    const text =
`
# h1 Heading 
## h2 Heading
### h3 Heading
## Lists

Unordered

\+ Create a list by starting a line with \`\+\`, \`\-\`, or \`\*\`
\+ Sub-lists are made by indenting 2 spaces:
  \- Marker character change forces new list start:
    \* Ac tristique libero volutpat at
    \+ Facilisis in pretium nisl aliquet
    \- Nulla volutpat aliquam velit
\+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

## Code

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar\+\+;
};

console.log(foo(5));
\`\`\`

`   
    const note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML = 

    `
        <div class="tools">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>

        <div class="${text?'':'hidden'} main"></div>
        <textarea class="${text?'hidden':''}"></textarea>
    `

    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked.parse(text)

    editBtn.addEventListener('click', () => editNote(main, textArea))
    deleteBtn.addEventListener('click', () => deleteNote(note))
    textArea.addEventListener('input', (e) => {
        const {value} = e.target
        main.innerHTML = marked.parse(value)
        updateLS()
    })

    document.body.append(note)
}

