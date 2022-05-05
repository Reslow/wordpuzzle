let startW = document.getElementById("startW");
let endW = document.getElementById("endW");
let form = document.getElementById("form");

async function getWords() {
  let response = await fetch("/words.json");
  const data = await response.json();
  console.log(data);
  getrandomwords(data);
}

function getrandomwords(data) {
  // data is array with wordpairs
  //  get random wordpair from the list
  let words = data[Math.floor(Math.random() * data.length)];
  pairOfWords(words);
  createInput(words);
}
function createInput(words) {
  let inputfield = document.createElement("input");
  inputfield.setAttribute("maxlength", words.startWord.length);

  form.appendChild(inputfield);
}

function pairOfWords(words) {
  // words is an object with id, startword and endword
  startW.innerText = words.startWord;
  endW.innerText = words.endWord;
}

getWords();
