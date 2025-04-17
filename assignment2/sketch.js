var colourPicker;
var strokeWeightSlider;
var bgColourPicker;
var symmetrySlider; // set number of symmetrical sections 
var symmetry = 6; // set default number of symmetry sections
var symmetryLabel; // label to display symmetry value
var angle; // the angle between each symmetry section
var eraserMode = false; // the eraser is off by default

function setup(){
    createCanvas(500,500);
    angleMode(DEGREES); //from p5js.org/examples/kaleidoscope/
    background(0); //set default canvas background is black

    colourPicker = createColorPicker('deeppink');
    strokeWeightSlider = createSlider(1, 10, 3, 1);
    bgColourPicker = createColorPicker('black');

    var bgButton =createButton('Clear Canvas');
    bgButton.mousePressed(repaint);
    bgColourPicker.changed( repaint );

    // form p5js.org/reference/createSpan()/
    symmetryLabel = createSpan('symmetry: 6 '); // create label text 
    symmetrySlider = createSlider(2, 12, 6, 1); // set symmetry slider

    // mix with p5js.org/reference/createDiv()/ and /child()/
    createDiv().child(symmetryLabel).child(symmetrySlider); //put label and slider together

    // mix with p5js.org/reference/createButton()/ and /mousePressed()/
    // create eraser button
    var eraserButton = createButton('Eraser: Off');
    eraserButton.mousePressed(function(){
        eraserMode = !eraserMode; // toggle eraser mode
        eraserButton.html(eraserMode ? 'Eraser: ON': 'Eraser: OFF') //from other web. find a similiar example to learn this format
    })
} 

function draw(){
    //from p5js.org/examples/kaleidoscope/
    symmetry = symmetrySlider.value();
    angle = 360 / symmetry;

    symmetryLabel.html('symmetry: '+ symmetry); // from other web. find a similiar example to learn this format

    // from p5js.org/examples/kaleidoscope/
    translate(width / 2, height / 2); //put origin to center of canvas

    strokeWeight( strokeWeightSlider.value() );
    stroke( colourPicker.value() );   

    // from p5js.org/examples/kaleidoscope/
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        var x = mouseX - width / 2;
        var y = mouseY - height / 2;
        var px = pmouseX - width / 2;
        var py = pmouseY - height / 2;
        
        // remixed from p5js.org/reference/mouseispressed/
        // remixed from p5js.org/examples/kaleidoscope/
        if (mouseIsPressed) {
            for (var i = 0; i < symmetry; i++){
                rotate(angle);

                if (eraserMode){
                    noErase();
                    stroke(bgColourPicker.value());
                } else {
                    noErase();
                    stroke(colourPicker.value());
                }

                line(x, y, px, py); // draw primary line

                push();
                scale(1, -1); // mirror the line vertically
                line(x, y, px, py); // draw mirrored line
                pop();
            }
        }
    }
}

function repaint(){
    background(bgColourPicker.value());
}
