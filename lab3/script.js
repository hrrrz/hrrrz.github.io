// Two or more P5.dom GUI elements (slider, radio box, menu, input, etc.)
// Two or more  use of .value() (either to get or set the GUI value)
// Two or more callback functions (mousePressed, keyPressed, etc.)

//slider
//input
//random color

var inputBox;
var displayText = "Hello";
var fontSize = 32;
var fontColor;
var sizeSlider;
var colorButton;

function setup(){
    createCanvas(400,400);

    inputBox = createInput('Hello');
    textAlign(CENTER, CENTER);
    fontColor = color(255);

    sizeSlider = createSlider(12,150,50,1);
    
    colorButton = createButton('random colour');
    colorButton.mousePressed(changeColor);

}

function draw(){
    background(30);

    fill(fontColor);
    textSize(fontSize);
    text(displayText, width/2, height/2);

    displayText = inputBox.value();
    fontSize = sizeSlider.value();

}

function changeColor(){
    fontColor = color(random(255), random(255), random(255))
}

function keyPressed(){
    if (key === 'z' || key === 'Z'){
        inputBox.value('');
    }
}