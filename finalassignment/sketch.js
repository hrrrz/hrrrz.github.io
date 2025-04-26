

var cards = [];
var cardBack;
var numCards = 77;
var cardWidth = 100;
var cardHeight = 160;
var spacing = 5;
var selectedCards = [];
var backgroundStars = [];
var colors = ["white", "yellow", "lightblue", "pink", "palegreen"];
var nextButton;

//https://p5js.org/reference/p5/preload/
function preload(){
    cardBack = loadImage('cardback.png');
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    arrayCards();
    createBackgroundStars();

    //https://codepen.io/alnero/pen/gPEWBe
    document.getElementById('overlay').addEventListener('click', hidePopup);
    document.getElementById('popup').addEventListener('click', hidePopup);

    function hidePopup(){
        document.getElementById('popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }

    //Button
    nextButton = createButton('Choose 6 Cards');
    nextButton.position(width/2-100, height-200);
    nextButton.size(200, 35);
    nextButton.style('font-size', '17px');
    nextButton.style('background-color', '#937c52');
    nextButton.style('color', 'white');
    nextButton.style('border', 'none');
    nextButton.style('border-radius', '30px');
    nextButton.mousePressed(showCards);

}

function draw(){
    background(0);
    drawBackgroundStars();
    
    var visibleWidth = cardWidth + spacing;

    // not selected card
    for (var card of cards){
        if (card.selected) continue;

        var hoverCard = mouseX > card.x && mouseX < card.x + visibleWidth 
                        && mouseY > card.y && mouseY < card.y + card.h;
        var offset = hoverCard ? -20 : 0;

        image(cardBack, card.x, card.y + offset, card.w, card.h);
    }

    // selected card
    for(var i = 0; i < selectedCards.length; i++){            
        var card = selectedCards[i];
        var spacingX =10;
        var totalWidth = selectedCards.length * cardWidth + (selectedCards.length - 1) * spacingX;
        var startX = (width - totalWidth) / 2;
        var x = startX + i * (cardWidth + spacingX);
        var y = 50;

        if(card.flipped){
            if (card.img){
                push();
                translate(x + card.w/2, y + card.h/2);
            if (card.rotated) {
                rotate(PI);
            }

                imageMode(CENTER); //https://p5js.org/reference/p5/imageMode/
                image(card.img, 0, 0, card.w, card.h);
                pop();
            } else {
                fill(255);
                rect(x, y, card.w, card.h, 10);
            }
        } else {
            image(cardBack, x, y, card.w, card.h);
        }
       
    }

}

function arrayCards(){
    cards = [];
    var totalWidth = numCards * cardWidth + (numCards - 1) * spacing;

    if(totalWidth > width){
        spacing = (width - numCards * cardWidth)/ (numCards -1);
        totalWidth = numCards * cardWidth + (numCards - 1) * spacing;

    }
    var startX = (width - totalWidth) /2;
    var y = height / 2 - cardHeight / 2;

    //mix https://p5js.org/reference/p5/shuffle/ && https://p5js.org/reference/p5/splice/ 
    var shuffledCards = shuffle(cardsRiderWaite).slice(0, numCards);

    for (var i = 0; i < numCards; i++){
        var x = startX + i * (cardWidth + spacing);
        var cardData = shuffledCards[i];

        cards.push({ 
            x: x,
            y: y, 
            w: cardWidth, 
            h: cardHeight,
            flipped: false,
            selected: false,
            info: cardData,
            img: null
        });
    }
}

function mousePressed(){
    for(var card of cards){
        if(selectedCards.length >= 6){
            return;
        }
        var visibleWidth = cardWidth + spacing;
        var mouseClicked = mouseX > card.x && mouseX < card.x + visibleWidth 
                        && mouseY > card.y && mouseY < card.y + card.h;
        if (mouseClicked && !card.selected){
            card.selected = true;
            selectedCards.push(card);
            break;
        }            
    }

    if(selectedCards.length === 6){
        nextButton.html('See Your Cards Info');
        flipSelectedCards();
    }
}

function createBackgroundStars(){
    for (var i = 0; i < 300; i++){
        backgroundStars.push({
            x: random(width),
            y: random(height),
            size: random(1,3),
            color: random(colors),
        });
    }
}

function drawBackgroundStars(){
    noStroke();
    for(var bs of backgroundStars){
        fill(bs.color);
        ellipse(bs.x, bs.y, bs.size);
    }
}

function flipSelectedCards(){
    for (var card of selectedCards){
        card.flipped = true;
        card.img = loadImage('https://raw.githubusercontent.com/alnero/Zipline-data/master/Taro/img/' + card.info.fileName);
        card.rotated = random([true, false]);

    }
}

function showCards(){
    if (selectedCards.length < 6) {
        alert("Please select 6 cards first!");
    } else {
        nextButton.hide();
        document.getElementById('card-selection').style.display = 'none';
        document.getElementById('card-result').style.display = 'block';
        showSelectedCardInfo();
    }
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    nextButton.position(width/2 - 100, height - 200);
}

// https://codepen.io/alnero/pen/gPEWBe
function showSelectedCardInfo(){
    var resultDiv = document.getElementById('result-cards');
    resultDiv.innerHTML = '';

    for (var i = 0; i < selectedCards.length; i++){
        var card = selectedCards[i];
        
        var cardBox = document.createElement('div');
        cardBox.style.marginBottom = '30px';
        cardBox.style.textAlign = 'center';
  
        var cardTitle = document.createElement('h2');
        cardTitle.innerText = card.info.name;
        cardBox.appendChild(cardTitle); // https://www.w3schools.com/jsref/met_node_appendchild.asp
  
        var cardImage = document.createElement('img');
        cardImage.src = 'https://raw.githubusercontent.com/alnero/Zipline-data/master/Taro/img/' + card.info.fileName;
        cardImage.style.width = '150px';
        cardBox.appendChild(cardImage);
  
        var cardDesc = document.createElement('p');
        cardDesc.innerHTML = card.info.descr;
        cardDesc.style.marginTop = '10px';
        cardDesc.style.color = '#8b8b8b';
        cardBox.appendChild(cardDesc);
  
        resultDiv.appendChild(cardBox);
    }
}