const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
let missed = 0;
const startGameButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
let letterFound;
const scoreboard = document.querySelector('#scoreboard ol');
let winArrayLength = 0;
let showLettersCount = 0;

startGameButton.addEventListener('click', () => {
  if (startGameButton.textContent === 'Start Game') {
    overlay.style.display = 'none';
  } else if (startGameButton.textContent === 'Reset Game') {
    window.location.reload();
  }
});

function resetButtons() {
  let buttons = document.getElementsByTagName('BUTTON');

  setTimeout(win, 800);
  startGameButton.addEventListener('click', function() {
    window.location.reload();
  });
}

const phrases = [
  'May the Force be with you',
  'You talking to me',
  'I love the smell of napalm in the morning',
  'The stuff that dreams are made of',
  'Bond James Bond',
  'Hasta la vista baby'
];

function getRandomPhraseAsArray(arr) {
  randomNumber = Math.floor(Math.random() * arr.length);
  arr = arr[randomNumber];
  arr = arr.split('');
  return arr;
}

function addPhraseToDisplay(arr) {
  const phraseUl = document.querySelector('#phrase ul');

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== ' ') {
      const li = document.createElement('li');
      li.textContent = arr[i];
      li.className = 'letter';
      phraseUl.appendChild(li);
      winArrayLength += 1;
    } else {
      const li = document.createElement('li');
      li.textContent = arr[i];
      li.className = 'space';
      phraseUl.appendChild(li);
    }
  }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

function checkLetter(letterFound) {
  let passed = false;
  let letters = document.querySelectorAll('.letter');

  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i].textContent.toLowerCase();
    if (letterFound === letter) {
      let match = letters[i];
      match.className = 'show';
      passed = true;
      showLettersCount += 1;
    }
  }
  if (passed === false) {
    missed = missed + 1;
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = 'images/lostHeart.png';
    img.style = 'height: 35px';
    li.appendChild(img);
    scoreboard.appendChild(li);
    const scoreboardLi = scoreboard.firstElementChild;
    scoreboard.removeChild(scoreboardLi);
  }
  checkWin();
}

qwerty.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    e.target.className = 'chosen';
    letterFound = e.target.textContent;
    e.target.disabled = 'true';
    checkLetter(letterFound);
  }
});

function checkWin() {
  if (missed === 5) {
    loseScreen();
  }
  if (showLettersCount === winArrayLength) {
    winScreen();
  }
}

// win & lose screen

function winScreen() {
  overlay.className = 'win';
  overlay.style.display = '';
  overlay.firstElementChild.textContent = 'You Win!';
  startGameButton.textContent = 'Reset Game';
}

function loseScreen() {
  overlay.className = 'lose';
  overlay.style.display = '';
  overlay.firstElementChild.textContent = 'You Lose!';
  startGameButton.textContent = 'Reset Game';
}
