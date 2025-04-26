var stars = [];
var particles = [];
var backgroundStars = [];
var colors = ["yellow", "white", "lightblue", "pink", "palegreen"];
var infoTags;

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(0);
    createBackgroundStars();
    infoTags = document.getElementsByClassName("info");
}

function draw(){
    background(0, 20);
    
    drawBackgroundStars();

    // for (var i = 0; i < stars.length; i++){
    //     stars[i].display();
    // }
    
    for (var i = stars.length - 1; i >= 0; i--){
        stars[i].display();
        stars[i].update();
        if (stars[i].dead()){
            createParticles(stars[i].x, stars[i].y, stars[i].color);
            stars.splice(i, 1); // https://p5js.org/reference/p5/splice/
        }
    }

    for (var i = particles.length - 1; i >= 0; i--){
        particles[i].display();
        particles[i].update();
        if (particles[i].dead()){
            particles.splice(i, 1);
        }
    }

    if (infoTags.length > 0){
        //https://www.w3schools.com/jsref/prop_html_innerhtml.asp#gsc.tab=0
        //https://www.w3schools.com/js/js_string_templates.asp
        infoTags[0].innerHTML = `⭐️ ${stars.length}   ✨ ${particles.length}`;
    }

    /*
    for(particle of particles){
        for(otherParticles of particles){
            if(particle === particles){
                continue;
            }
            if(particle.pos.dist(otherParticles.pos) < particles.)
        }
    
    */

}

function mousePressed(){
    for (var i = 0; i < 10; i++){
        var offsetX = random(-50,50);
        var offsetY = random(-50,50);
        stars.push(Star(mouseX + offsetX, mouseY + offsetY, random(5,17)));

    }
}

function Star(x,y,size){
    var s = {
        x: x,
        y: y,
        size: size,
        color: random(colors),
        lifespan: 255,
        
        display: function(){
            noStroke();
            fill(this.color);
            ellipse(this.x, this.y, this.size);
        },

        update: function(){
            this.lifespan -= 2;
        },

        dead: function(){
            return this.lifespan < 0; //https://www.w3schools.com/jsref/jsref_return.asp
        }
    };

    return s;

}

function createParticles(x, y, length){
    for(var i = 0; i < 5; i++){
        particles.push(Particle(x,y,length));
    }
}

function Particle(x,y,length){
    var p = {
        x: x,
        y: y,
        vx: random(-1.2,1.2),
        vy: random(-1.2,1.2),
        color: random(colors),

        display: function(){
            noStroke();
            fill(this.color);
            ellipse(this.x, this.y, 3);
        },

        update: function(){
            this.x += this.vx;
            this.y += this.vy;
            this.length -= 3;
        },

        dead: function(){
            return this.length < 0;
        }
    };
    return p;

}

function createBackgroundStars(){
    for (var i = 0; i < 150; i++){
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
