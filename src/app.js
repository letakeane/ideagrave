const app = () => {
  let ideas = [];

  const getIdeas = () => {
    return ideas;
  }

  const setIdeas = value => {
    ideas = value;
  }
  
  const createIdea = (title, desc) => {
    return { id: Date.now(), title, desc }
  }

  const addIdea = newIdea => {
    return [...ideas, newIdea]
  }

  return {
    getIdeas,
    setIdeas,
    createIdea,
    addIdea
  }
}

export default app;