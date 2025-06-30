
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
// delared varibale for co-ordinates
let snake = [
    {x:100,y:100},
    {x:80,y:100},
    {x:60,y:100}
];

let dx = 20;
let dy = 0;

let food = {
    x: getRandomGenerator(canvas.width),
    y: getRandomGenerator(canvas.height)
};

let score = 0;


// function to draw on canvas

function getRandomGenerator(max){
    return  Math.floor(Math.random() * (max/20)) * 20;
}

function draw()
{
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };

    snake.unshift(head);

  

    if(head.x == food.x && head.y == food.y){
        score++;
        document.getElementById("score").innerText = "Score: " + score

        food = {
            x:getRandomGenerator(canvas.width),
            y:getRandomGenerator(canvas.height)
        };
    } else{
        snake.pop();
    }

      for(let i = 1; i< snake.length;i++){
        if(snake[i].x === head.x && snake[i].y === head.y){
           alert("Game Over");
           clearInterval(gameLoop);
        return;
        }
    }

    


    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    ctx.fillStyle = "red";
    ctx.fillRect(food.x,food.y,20,20);


    for(i = 0;i<snake.length;i++){
        ctx.fillStyle = "green";
        ctx.fillRect(snake[i].x,snake[i].y,20,20);
    }

    //collision logic
    if(head.x<0 || head.x>=canvas.width || head.y<0 || head.y>=canvas.height){
        alert("Game Over!");
        clearInterval(gameLoop);
        return;
    }

    
}
// calling fucntion after some interval after sometime
let gameLoop = setInterval(draw,100);

// this line takes event listner from keyboard
document.addEventListener("keydown", changeDirection);

// movent key bindings 
function changeDirection(e){
    const key = e.key;
    
    const goingUp = dy === -20;
    const goingDown = dy === 20;
    const goingLeft = dx === -20;
    const goingRight = dx === 20;

    
    if(key ===  "ArrowUp" && !goingDown){
        dx = 0;
        dy = -20;
    } else if(key === "ArrowDown" && !goingUp){
        dx = 0;
        dy = +20;
    }else if(key === "ArrowLeft" && !goingRight){
         dx = -20;
         dy = 0;
    } else if(key === "ArrowRight" && !goingLeft){
        dx = +20;
        dy = 0;
    }
}    
