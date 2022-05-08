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
  let words = data[Math.floor(Math.random() * data.length)];
  pairOfWords(words);
  createInput(words);
}

function createInput(words) {
  let number = words.startWord.length;
  for (let i = 0; i < number; i++) {
    let inputfield = document.createElement("input");
    inputfield.setAttribute("maxlength", 1);
    form.appendChild(inputfield);
    checkInput(inputfield.value, words);
  }

  let btn = document.createElement("button");
  btn.innerHTML = "try";
  btn.setAttribute("type", "button");
  form.appendChild(btn);
  btn.addEventListener("click", () => {});
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
    if (startwordArray[i] !== inputarray[i]) {
      console.log(startwordArray[i]);
      console.log(inputarray[i]);
      console.log("mismatch");
    } else {
      console.log("we have a mtach");
    }
  }
}

function pairOfWords(words) {
  // words is an object with id, startword and endword
  startW.innerText = words.startWord;
  endW.innerText = words.endWord;
}

function handleInput(e) {
  // check for data that was inputtted and if there is a next input, focus it
  const input = e.target;
  if (input.nextElementSibling && input.value) {
    input.nextElementSibling.focus();
  }
}
getWords();
form.addEventListener("input", handleInput);
