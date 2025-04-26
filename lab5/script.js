let myData;

function preload() {
    myData = loadJSON('data.json');
}

function setup() {
    createCanvas(600, 400);
    background(245);
    textSize(18);
    fill(50);

    text("😴 Hours of Sleep: " + myData.sleep, 50, 50);

    text("☕️ Favorite Coffees:", 50, 120);
    for (let i = 0; i < myData.coffee.length; i++) {
        text("- " + myData.coffee[i], 70, 160 + i * 30);
    }
}
