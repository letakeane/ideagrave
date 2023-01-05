import app from './app.js';
const { getIdeas, setIdeas, createIdea, addIdea } = app();

// initial idea array
setIdeas(addIdea(createIdea('A very bad idea', 'which should never be remembered')));

// query selectors
const titleInput = document.querySelector('#title');
const descInput = document.querySelector('#desc');
const submitBtn = document.querySelector('#submit');
const cemetery = document.querySelector('#cemetery');

const retrieveData = element => {
    return element.value
  }

const clearInputs = (titleInput, descInput) => {
  titleInput.value = '';
  descInput.value = '';
}

const handleSubmit = event => {
  event.preventDefault();
  let newTitle = retrieveData(titleInput)
  let newDesc = retrieveData(descInput)
  setIdeas(addIdea(createIdea(newTitle, newDesc)));

  clearInputs(titleInput, descInput);
  displayIdeas(getIdeas());
}

const makeGraves = ideas => {
  return ideas.reduce((htmlStr, idea) => {
    htmlStr = htmlStr + (`
      <section class="grave">
        <h2>RIP</h2>
        <h3>${idea.title}</h3>
        <p class="details">${idea.desc}</p>
      </section>
      `);
    
    return htmlStr;
  }, '')
}

const displayIdeas = () => {
  cemetery.innerHTML = makeGraves(getIdeas());
}

submitBtn.addEventListener('click', handleSubmit);