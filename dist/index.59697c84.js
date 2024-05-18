const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const balls = [];
canvas.addEventListener("click", (event)=>{
    const x = event.clientX;
    const y = event.clientY;
    const ball = {
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
    if (balls.length > 15) balls.shift();
});
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for(let i = 0; i < 6; i++)color += letters[Math.floor(Math.random() * 16)];
    return color;
}
function update(deltaTime) {
    balls.forEach((ball)=>{
        ball.vy += ball.gravity;
        ball.y += ball.vy * deltaTime;
        if (ball.y + ball.radius > canvas.height) {
            ball.y = canvas.height - ball.radius;
            ball.vy *= -ball.dampening;
            if (Math.abs(ball.vy) < 0.1) ball.vy = 0;
        }
    });
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach((ball)=>{
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
    });
}
let lastTime = 0;
function tick(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    update(deltaTime);
    draw();
    requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

//# sourceMappingURL=index.59697c84.js.map
