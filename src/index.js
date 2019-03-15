const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const divTag = document.getElementById('toy-collection');
const submitBtn = document.querySelector('form');

const toyCard = (toy) => {
  return `
  <div data-id="${toy.id}"class="card">
    <button class = "remove-toy"> DELETE </button>
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p data-like="${toy.likes}">${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>
`
}
let addToy = false;

// YOUR CODE HERE

fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(parsedJson => {
    parsedJson.forEach(function(toy) {
      divTag.innerHTML += toyCard(toy)
    })
  })

addBtn.addEventListener('click', () => {
  submitBtn.addEventListener('submit', () => {
    event.preventDefault()
    const toyName = event.target.name.value;
    const toyImage = event.target.image.value;
    let toyLikes = event.target.likes;
    let defLikes = (toyLikes = 0);
      // debugger
      const postObj = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: toyName,
          image: toyImage,
          likes: toyLikes
        })
      };
      fetch('http://localhost:3000/toys', postObj)
        .then(res => res.json())
        .then(pJson => {
          divTag.innerHTML = toyCard(pJson) + divTag.innerHTML
        })
  })
  // hide & seek with the form

  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

//------ likes

divTag.addEventListener('click', function(){
  event.preventDefault()
  const toyId = event.target.parentElement.dataset.id
  if(event.target.className == "like-btn"){
    let pTag = event.target.previousElementSibling
    let likes = parseInt(event.target.previousElementSibling.dataset.like)
    let updatedLikes = likes + 1;
     uLikes(toyId, updatedLikes)
     .then(parsedJ => {
      pTag.dataset.like = parsedJ.likes
      pTag.innerText = `${parsedJ.likes} Likes`
    })
  } else if(event.target.className == "remove-toy"){
    event.target.parentElement.remove();
    deleteToy(toyId)

  }
  
  
})
const uLikes = (toyId, updatedLikes) => {
  return fetch(`http://localhost:3000/toys/${toyId}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ 
      likes: updatedLikes
    })
  })
  .then(res => res.json())  

}

const deleteToy = (toyId) => {
  return fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }

  })
}
