import { Application, Graphics } from "pixi.js";

const app = new Application<HTMLCanvasElement>({
    width: 600,
    height: 600,
    antialias: true,
});

let ball = new Graphics();

let radius = 20;
let speedy = 100.0;
let speedx = 1;
let accl = 1;
let damp = 0.55;

ball.beginFill(0xffffff);
ball.drawCircle(app.view.width / 2, app.view.height /  2, radius);
ball.endFill();

app.stage.addChild(ball);

let bouncing = true;
let prevspeed = 0;
app.ticker.add((delta) => {
    if (!bouncing) return;
    
    ball.y += speedy * delta;
    if (ball.y > app.view.height / 2 - radius) {
        if (!prevspeed) prevspeed = speedy;
        ball.y = app.view.height / 2 - radius;
        speedy = -Math.abs(prevspeed);
        speedy *= damp;
        prevspeed = speedy;
        speedx = -speedx;
        console.log(speedy);
        if (Math.abs(speedy) < 0.2) {
            speedy = 0;
            ball.y = app.view.height / 2  - radius;
            bouncing = false;
        }
    } else {
        speedy += accl * delta;
    }
})

document.body.appendChild(app.view);