// connecting to html
let startW = document.getElementById("startW");
let endW = document.getElementById("endW");
let form = document.getElementById("form");
let inputCon = document.getElementById("input--con");

// fetch words from words.json
async function getWords() {
  let response = await fetch("/words.json");
  const data = await response.json();
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
  console.log(words);
  let inputvalue = "";
  let number = words.startWord.length;
  //  for each letter create input
  for (let i = 0; i < number; i++) {
    let inputfield = document.createElement("input");
    inputfield.setAttribute("maxlength", 1);
    inputCon.appendChild(inputfield);
    inputfield.classList.add("input");
  }

  // create a btn
  let btn = document.createElement("button");
  btn.innerHTML = "try";
  btn.setAttribute("type", "button");
  btn.classList.add("btn");
  form.appendChild(btn);
  btn.addEventListener("click", () => {
    console.log("click");
    let input = document.getElementsByClassName("input");
    console.log(input);
    let word = "";
    for (item of input) {
      word += item.value;
      console.log(item.value);
      checkInput(word, words);
    }
  });
}

// turn value of inpuit to uppercases, then turn strings to arrays and compare them
function checkInput(inputvalue, words) {
  // to uppercases
  let valueUpper = inputvalue.toUpperCase();
  // from str to array
  let startwordinArray = words.startWord.split("");
  let inputArray = valueUpper.split("");

  console.log(startwordinArray);
  console.log(inputArray);

  isitaword(inputvalue);
}

async function isitaword(word) {
  try {
    const response = fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (!response.ok) {
      throw new Error(`error ${response.status}`);
    } else {
      let data = await response.json();
      console.log(data);
    }

    return data;
  } catch (err) {
    console.log(err);
    console.log("word does not exist");
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
