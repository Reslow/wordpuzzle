// connecting to html
let startW = document.getElementById("startW");
let endW = document.getElementById("endW");
let form = document.getElementById("form");

// fetch words from words.json
async function getWords() {
  let response = await fetch("/words.json");
  const data = await response.json();
  console.log(data);
  getrandomwords(data);
}

// select a random pair of words from words.json
function getrandomwords(data) {
  let words = data[Math.floor(Math.random() * data.length)];
  // display words in html
  startW.innerText = words.startWord;
  endW.innerText = words.endWord;

  createInput(words);
}

// create inputfields from numbers of letters

function createInput(words) {
  let number = words.startWord.length;
  //  for each letter create input
  for (let i = 0; i < number; i++) {
    let inputfield = document.createElement("input");
    inputfield.setAttribute("maxlength", 1);
    form.appendChild(inputfield);
  }
  // create a btn
  let btn = document.createElement("button");
  btn.innerHTML = "try";
  btn.setAttribute("type", "button");
  form.appendChild(btn);
  btn.addEventListener("click", () => {
    console.log("click");
    checkInput(inputfield.value, words);
  });
}

// turn value of inpuit to uppercases, then turn strings to arrays and compare them
function checkInput(value, words) {
  // to uppercases and str into arrays
  let valueUpper = value.toUpperCase();
  let startwordinArray = words.startWord.split("");
  let inputArray = valueUpper.split("");

  // go through the listsand compare each letter if they matches
  for (let i = 0; i < startwordinArray.length; i++) {
    if (startwordinArray[i] !== inputArray[i]) {
      console.log(startwordinArray[i]);
      console.log(inputArray[i]);
      console.log("mismatch");
    } else {
      console.log("we have a match");
    }
  }
}

function handleInput(e) {
  // check for data that was inputtted and if there is a next input, focus it
  const input = e.target;
  if (input.nextElementSibling && input.value) {
    input.nextElementSibling.focus();
  }
}

// listen for input
form.addEventListener("input", handleInput);

getWords();
