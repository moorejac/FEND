/*
**
** Define Game Functionality
**
*/

// Shuffle function from http://stackoverflow.com/a/2450976 shuffles the supplied array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// createCard function creates an card element based upon the template
function createCard(card) {
    return `<li class="card" data-card-type="${card}"><i class="fa ${card}"></i></li>`;
}

/*
** setCardClasses function accepts a cards array and a string representing HTML classes.
** The function sets the class attributes equal to the supplied string for each
** of the card elements in the array.
*/
function setCardClasses(cards, classes) {
    cards.map(card => card.classList = classes);
}

/*
** cardsMatch function accepts an array containing two card elements and checks to see if the
** card-type HTML data attributes are equal. Returns True when equal and False otherwise.
*/
function cardsMatch(cards) {
    return cards[0].dataset.cardType === cards[1].dataset.cardType
}

/*
** updateSeconds function increments the secs variable every 1 second and
** updates all of the timers on the page.
*/
function updateSeconds() {
    sec++;
    const timers = document.querySelectorAll('.seconds');
    for (const timer of timers) { timer.innerHTML = sec; }
}

/*
** updateScore function computes the number of full moves (1 full move contains 2 individual card moves)
** and updates all of move counters on the page.
*/
function updateScore() {
    moves++;
    const fullMoves = moves / 2;

    if (moves % 2 === 0) {
        for (const counter of moveCounters) { counter.innerHTML = fullMoves.toString(); }
    }
}

/*
** updateStars function updates the star rating based on the following performance:
** 5 stars: 08-10 moves
** 4 stars: 11-12 moves
** 3 stars: 13-14 moves
** 2 stars: 15-16 moves
** 1 stars: > 17 moves
*/
function updateStars() {
    if (moves > 16 && moves % 4 === 0 && stars.childElementCount > 1 ) {
        stars.lastElementChild.remove();
        document.querySelector('.star-total').innerHTML = (stars.childElementCount).toString();
    }
}

/* 
** winGameCheck function removes a match from available card types. When no matches remain
** the game is won and congratulations modal is displayed.
*/
function winGameCheck() {
    cards.pop();

    if (cards.length === 0) {
        document.querySelector('.container').classList = ('container hide');
        document.querySelector('.modal').classList = ('modal show');
         clearInterval(gameTimer);
    }
}

/*
**
** Set initial game state 
**
*/

let openCards = []; // stores opened cards
let moves = 0;  // stores number of moves
let sec = 0; // stores time elapsed
let gameTimer; // initializer for timer function

// Create a list that holds card types
let cards = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb'];

// Create shuffled card deck containing two of each card type
const cardDeck = shuffle(cards.concat(cards));

// Build HTML for each card in the deck using the template in the createCard function
const cardHTML = cardDeck.map(card => createCard(card));

/*
**
** Update game page and add game functionality 
**
*/

// Add card HTML to the page
document.querySelector('.deck').innerHTML = cardHTML.join('');

// Store the "move" class elements for updating the user's score
const moveCounters = document.querySelectorAll('.moves');

// Store the "star" class element for updating the user's star rating
let stars = document.querySelector('.stars');

// Add click event handler to game restart button
document.querySelector('.restart').addEventListener('click', function() { window.location.reload(); });

// Add click event handler to card deck container
document.querySelector('.deck').addEventListener('click', function(evt) {
    
    // Check that a card has been clicked. Any other click is ignored
    if (evt.target.className === 'card') {

        // Start game timer on first card click
        if (sec === 0 ) { gameTimer = setInterval(updateSeconds, 1000); }
        
        // Only allow 2 cards to be open at a time
        if (openCards.length < 2) {
            // reveal card and add the openCards list
            evt.target.classList.add('open', 'show');
            openCards.push(evt.target);
            
            // perform comparison when there are 2 open cards
            if (openCards.length === 2) {
                if (cardsMatch(openCards)) {
                    setCardClasses(openCards, 'card match');           
                    winGameCheck();
                    openCards = [];
                } else {
                    setCardClasses(openCards,'card not-match');
                    // rehide cards on not match
                    setTimeout(function() {
                        setCardClasses(openCards,'card');      
                        openCards = [];         
                    }, 500);
                }
            }
        }
        updateScore();
        updateStars();
    };
});