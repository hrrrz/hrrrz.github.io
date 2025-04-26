// A text input for getting text from the user. 
// At least one P5.dom GUI elements (slider, radio box, menu, input, etc.)
// At least one global callback function (mousePressed, keyPressed, etc.)
// At least one p5.Element callback function (button.mousePressed, button.keyPressed, etc.)

// Input box
// textlist
// through enter to push the text
// Clear Button
// add rect front of the text
// click the rect - checkbox

var inputBox;
var addButton;
var clearButton;
var textList = [];
var yStart = 100;

function setup(){
    createCanvas(550, windowHeight);
    textSize(16);

    inputBox = createInput();
    inputBox.position(20,20);
    inputBox.size(200);

    addButton = createButton('Add to List');
    addButton.position(inputBox.x + inputBox.width + 15, 20);
    addButton.mousePressed(updateText);

    clearButton = createButton('Clear All');
    clearButton.position(inputBox.x + inputBox.width + 100, 20);
    clearButton.mousePressed(clearList);

    // checkbox = createCheckbox();
    // checkbox.position(20, y-15)

    fullscreenButton = createButton('Toggle Fullscreen');
    fullscreenButton.position(inputBox.x + inputBox.width + 170, 20);
    fullscreenButton.mousePressed(toggleFullscreen);

}

function draw(){
    background(220);
    fill(0);
    text("🛒Grocery List: ", 20, 70);

    //https://p5js.org/reference/p5/createCheckbox/ 
    // remix https://p5js.org/reference/p5/concat/ & filter
    var unchecked = textList.filter(item => !item.checkbox.checked());
    var checked = textList.filter(item => item.checkbox.checked());
    textList = unchecked.concat(checked);

    for (var i = 0; i < textList.length; i++){
        var y = yStart + i * 30

        textList[i].checkbox.position(20, y-7)

        // stroke(0);
        // rect(20, y-13, 15, 15);

        noStroke();
        fill(textList[i].checkbox.checked() ? 150:0);
        text(textList[i].text, 45, y);

    }
    
}

// push text to textlist
function updateText(){
    var input = inputBox.value().trim();
    if (input !== ''){
        var cb = createCheckbox('',false);
        var item = {
            text: input,
            checkbox: cb
        }
        textList.push(item);
        inputBox.value('');
    }
}

function toggleFullscreen() {
    var fs = fullscreen();
    fullscreen(!fs);
}

// use 'ENTER' to push textlist
function keyPressed(){
    if (keyCode === ENTER){
        updateText();
    }
    if (keyCode === ESCAPE){
        fullscreen(false); 
    }
        
}

// Clear Button
function clearList(){
    for (var item of textList){
        item.checkbox.remove();
    }
    textList = [];
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    button.show();
}
