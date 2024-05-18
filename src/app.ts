const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

interface Ball {
    x: number;
    y: number;
    radius: number;
    color: string;
    vx: number;
    vy: number;
    gravity: number;
    dampening: number;
}

const balls: Ball[] = [];

canvas.addEventListener('click', (event: MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;
    const ball: Ball = {
        x,
        y,
        radius: 20,
        color: getRandomColor(),
        vx: 0,
        vy: 0,
        gravity: 0.98,
        dampening: 0.7
    };


    balls.push(ball);


    if (balls.length > 15) {
        balls.shift();
    }
});

function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function update(deltaTime: number) {
    balls.forEach(ball => {
        ball.vy += ball.gravity;
        ball.y += ball.vy * deltaTime;

        if (ball.y + ball.radius > canvas.height) {
            ball.y = canvas.height - ball.radius;
            ball.vy *= -ball.dampening;
            if (Math.abs(ball.vy) < 0.1) {
                ball.vy = 0;
            }
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
    });
}

let lastTime = 0;

function tick(currentTime: number) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    update(deltaTime);
    draw();

    requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
