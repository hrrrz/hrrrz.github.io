let cubes = []; 

function setup(){
    createCanvas(720,480);
    for (let i = 0; i < 20; i++) {
        cubes.push({
            x: random(width),
            y: random(height),
            speedX: random(1, 3),
            speedY: random(1, 3),
        });
    }
}

function draw(){
    background('#b333ff');

    for (let i = 0; i < cubes.length; i++){
        let c = cubes[i];
        rect(c.x, c.y, 10, 10);
        
        c.x += c.speedX;
        c.y += c.speedY;
    }
}