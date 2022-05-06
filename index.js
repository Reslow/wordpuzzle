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
  let btn = document.createElement("button");
  inputfield.setAttribute("maxlength", words.startWord.length);

  btn.innerHTML = "add";
  btn.setAttribute("type", "button");
  form.appendChild(inputfield);
  form.appendChild(btn);

  btn.addEventListener("click", () => {
    checkInput(inputfield.value, words);
  });
}

function checkInput(value, words) {
  // kolla om alla utom en bokstav skiljer sig.
  console.log(value);
  let valueUpper = value.toUpperCase();
  let startwordinArray = words.startWord.split("");
  let inputArray = valueUpper.split("");
  console.log(startwordinArray);
  console.log(inputArray);
  hasWordChanged(startwordinArray, inputArray);
}

function hasWordChanged(startwordArray, inputarray) {
  console.log(startwordArray);
  console.log(inputarray);

  for (let i = 0; i < startwordArray.length; i++) {
    if (startwordArray[i] === inputarr) console.log(startwordArray[i]);
    console.log(inputarray[i]);
  }
}

function pairOfWords(words) {
  // words is an object with id, startword and endword
  startW.innerText = words.startWord;
  endW.innerText = words.endWord;
}

getWords();
