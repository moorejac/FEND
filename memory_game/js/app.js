// Shuffle function from http://stackoverflow.com/a/2450976
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


function createCard(card) {
    return `<li class="card" data-card-type="${card}"><i class="fa ${card}"></i></li>`;
}

const starHTML = '<li><i class="fa fa-star"></i></li>';

function updateScore() {
    document.querySelector('.moves').innerHTML = (moves/2).toString();    
    document.querySelector('.stars').innerHTML += starHTML;
}


/*
 * Create a list that holds all of your cards
 */
const cards = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const cardDeck = shuffle(cards.concat(cards));
const cardHTML = cardDeck.map(card => createCard(card));
document.querySelector('.deck').innerHTML = cardHTML.join('');


let openCards = [];
let moves = 0;
let matches = 0;


document.querySelector('.deck').addEventListener('click', function(evt) {
    
    if (evt.target.className === 'card') {
        
        if (openCards.length < 2) {
            evt.target.classList.add('open', 'show');
            openCards.push(evt.target);
            
            if (openCards.length === 2) {
                // perform comparison
                if (openCards[0].dataset.cardType === openCards[1].dataset.cardType) {
                    openCards.map(card => card.classList = ('card match'));               
                    matches++;
                    openCards = [];
                } else {
                    setTimeout(function() {
                        openCards.map(card => card.classList.remove('open', 'show'));               
                        openCards = [];
                    }, 750);
                }
            }
        }
        moves++;
        if (moves % 2 === 0) {updateScore()}
    };
});


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
