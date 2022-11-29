console.log('Goodbye world!');

// object oriented
let ideas = [ {title: 'A very bad idea', desc: 'which should never be remembered'}];
const titleInput = document.querySelector('#title');
const descInput = document.querySelector('#desc');
const submitBtn = document.querySelector('#submit');
const cemetery = document.querySelector('#cemetery');

const pipeline = (...functions) => {
  if (functions.length === 0) return input => input;
  if (functions.length === 1) return input => head(functions)(input);

  return function(input) {
    return pipeline(...tail(functions))(head(functions)(input));
  }
}

const retrieveData = element => {
  return element.value;
}

const makeIdea = (title, desc) => {
  return {title, desc};
}

const addIdea = newIdea => {
  const allIdeas = ideas.map(idea => idea);
  allIdeas.push(newIdea);

  return allIdeas;
}

const clearInputs = (titleInput, descInput) => {
  titleInput.value = '';
  descInput.value = '';
}

const handleSubmit = event => {
  event.preventDefault();
  ideas = addIdea(makeIdea(retrieveData(titleInput), retrieveData(descInput)));

  clearInputs(titleInput, descInput);
  displayIdeas(ideas);
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
  cemetery.innerHTML = makeGraves(ideas);
}

submitBtn.addEventListener('click', handleSubmit);