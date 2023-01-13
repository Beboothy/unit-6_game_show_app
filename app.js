const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const button = document.getElementsByTagName('BUTTON');
const reset = document.getElementById('reset');

let missedCounter = 0;

const phrases = [
    'pitter patter',
    'thankee sai',
    'ride or die',
    'made you look',
    'great gatsby'
];

function resetKeys() {
    for(let i = 0; i < button.length; i++) {
        button[i].classList.remove('chosen');
    }
}

function resetHearts() {
    const hearts = document.getElementsByClassName('tries');

    for (let i = 0; i < hearts.length; i++) {
        hearts[i].innerHTML = '<img src="images/liveHeart.png" height="35px" width="30px">';
    }
}

// checks to see if ul has children; removes children if they exist
function removePhrase() {
    const ul = document.querySelector('#phrase ul');
    while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild);
    }
}

// return random phrase and split
function getRandomPhrasesArray(phrases) {
    const phraseIndex = Math.floor(Math.random() * phrases.length);
    const randomPhrase = phrases[phraseIndex];
    const split = randomPhrase.split('');
    return split;
}

let phraseArray = getRandomPhrasesArray(phrases);

// add letters to the display
function addPhraseToDisplay(phraseArray) {
    // for each item in phraseArray
    // find phrase ul
    // assign character block to array value
    // check and see if character is space or letter
    for (let i = 0; i < phraseArray.length; i++) {
        const ul = document.querySelector('#phrase ul');
        let block = phraseArray[i];
        const li = document.createElement('li');
        li.textContent = block;
        
        if (li.textContent === ' ') {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }

        // add to UL
        ul.appendChild(li);
    }
}

addPhraseToDisplay(phraseArray);

// start or reset game
reset.addEventListener('click', () => {
    const overlay = document.getElementById('overlay');
    
    if (reset.innerHTML === 'Try Again') {
        overlay.className = '';
        phrase.style.display = 'block';
        resetKeys();
        resetHearts();
        removePhrase();
    
        let newArray = getRandomPhrasesArray(phrases)
        addPhraseToDisplay(newArray);
    
        missedCounter = 0;
    }
    
    overlay.style.display = 'none';

    
});

// check if a letter is in the phrase
function checkIfLetterExists(clicked) {
    const totalLetters = document.getElementsByTagName('LI');
    console.log(totalLetters.length)
    let matchCharacter = null;

    for (let i = 0; i < totalLetters.length; i++) {
        let letter = '';
        letter = totalLetters[i].textContent;
        console.log(letter);

        if (letter === clicked) {
            totalLetters[i].classList.add('show');
            matchCharacter = letter;
        }

        
    } return matchCharacter;

    
}

// check if the game has been won or lost
function checkWin() {
    const overlay = document.querySelector('#overlay');
    const lettersInCurrentPhrase = document.getElementsByClassName('letter');
    const showing = document.querySelectorAll('.show');
    console.log('letters, showing', lettersInCurrentPhrase.length, showing.length);

    if (lettersInCurrentPhrase.length === showing.length) {
        overlay.classList.remove('hide');
        overlay.className = 'win';
        overlay.style.display = 'flex';
        phrase.style.display = 'none';
        overlay.querySelector('.title').innerHTML = 'You got it!';
        overlay.querySelector('.btn__reset').innerHTML = 'Try Again';
    } else if (missedCounter > 4) {
        overlay.classList.remove('hide');
        overlay.className = 'lose';
        overlay.style.display = 'flex';
        phrase.style.display = 'none';
        overlay.querySelector('.title').innerHTML = 'Better luck next time.';
        overlay.querySelector('.btn__reset').innerHTML = 'Try Again';
    }


}



// listen for keyboard
qwerty.addEventListener('click', e => {
    if (e.target === button || e.target.className !== 'chosen' && e.target.className !== 'keyrow' && e.target.className !== 'section') {
        let selectedButton = e.target;
        
        selectedButton.className = 'chosen';
        let selectedButtonContent = selectedButton.textContent;
        let guessLetter = checkIfLetterExists(selectedButtonContent);

        const hp = document.querySelector('ol');
        const heart = document.createElement('li');
        const removeHeart = document.querySelector('ol').lastElementChild;
        heart.className = 'tries';
        heart.innerHTML = `<img src="images/lostHeart.png" height="35px" width="30px">`;

        if (guessLetter === null) {
            hp.prepend(heart);
            removeHeart.remove();
            missedCounter++;
        }

        checkWin();

    }
});