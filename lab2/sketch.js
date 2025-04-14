var greenBrick = {
    x: 10,
    y: 0,
    w: 40,
    h: 40,
    xSpeed: 2,
    ySpeed: 2,
    colour: 'green',
    
    draw: function(){
        fill(this.colour);
        rect(this.x, this.y, this.w, this.h);
    },
    
    move: function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.x < 0 || this.x > width - this.w){
            this.xSpeed *= -1;
        }
        if(this.y < 0 || this.y > height - this.h){
            this.ySpeed *= -1;
        }
    }
};

var yellowBrick = {
    x: 50,
    y: 10,
    w: 50,
    h: 50,
    xSpeed: 3,
    ySpeed: 2,
    colour: 'yellow',
    
    draw: function(){
        fill(this.colour);
        rect(this.x, this.y, this.w, this.h);
    },
    
    move: function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.x < 0 || this.x > width - this.w){
            this.xSpeed *= -1;
        }
        if(this.y < 0 || this.y > height - this.h){
            this.ySpeed *= -1;
        }
    }
};

function setup(){
    createCanvas(windowWidth, windowHeight);
}

function draw(){
    background(0, 150, 50);
    fill('aquamarine');
    stroke('white');
    for(var i = 0; i < 1000; i++){
        rect((i * 10) % width, (i * 10) % height, 10, 10, );
    }

    fill('blue');
    stroke('black');
    if(mouseX < 200){
        rect(mouseX, mouseY, 70, 70);
    } else {
        rect(mouseX, mouseY, 50, 50, 50);
    }

    greenBrick.draw();
    greenBrick.move();
    yellowBrick.draw();
    yellowBrick.move();
}
