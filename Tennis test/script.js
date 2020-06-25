var canvas;
var ctx;

//ball
var ballX = 50;
var ballY= 50;
var BallSpeedX = 10;
var BallSpeedY = 4;

//Padlley
var paddleY = 250;
const paddle_Height = 150;
var paddle2Y = 250;

//IMAGE

//Score
var scorePlayer1 = 0;
var scorePlayer2 = 0;
var winScore = 7;



//Mouse
function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return{
        x:mouseX, 
        y:mouseY
    };
}

window.onload = function (){
        canvas = document.getElementById('gameCanvas');
        ctx = canvas.getContext('2d');

        this.setInterval(callBoth, 25);

        this.canvas.addEventListener('mousemove',function(evt){
            var mousePos = calculateMousePos(evt);
            paddleY = mousePos.y -(paddle_Height/2);
        })

}

//IA movement
function computerMovement(){
    var  paddle2YCenter= paddle2Y + (paddle_Height/2);
    if (paddle2YCenter < ballY-55){
        paddle2Y = paddle2Y +8;

    }else{
        paddle2Y = paddle2Y-8;
    }
}
// Ball Reset
function ballReset(){
    BallSpeedX = -BallSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    if(scorePlayer1 >= winScore || scorePlayer2 >= winScore){
        scorePlayer1 = 0;
        scorePlayer2 = 0;
    }
    
    
}

function callBoth(){
 drawEverything();
 moveEverything();
}

//Movement

function moveEverything(){
    computerMovement();
    ballX = ballX + BallSpeedX ;
    ballY = ballY + BallSpeedY;
    if (ballX >775){
        if( ballY > paddle2Y && ballY < paddle2Y+paddle_Height){
            BallSpeedX = -BallSpeedX;
            var deltaY = ballY - (paddle2Y + paddle_Height/2);
            BallSpeedY = deltaY * 0.35;
        }
        else{
            scorePlayer2++;
            ballReset();
           
        }

    } else if(ballX < 25){
        if( ballY > paddleY && ballY < paddleY+paddle_Height){
            BallSpeedX = -BallSpeedX;
            var deltaY = ballY - (paddle1Y + paddle_Height/2);
            BallSpeedY = deltaY * 0.35;
        } else {
            scorePlayer1++; 
             ballReset();
       
    }       
    };
    if (ballY < 0){
        BallSpeedY = -BallSpeedY;

    } else if(ballY >canvas.height){
        BallSpeedY = -BallSpeedY;        
    };
    
    
}
//draw
function drawEverything (){
    
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 800, canvas.width); 
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(ballX, ballY, 10, 0, Math.PI*2, true);
        ctx.fill();
               
        ctx.fillStyle = 'white';
        ctx.fillRect(5, paddleY, 10, paddle_Height);

        ctx.fillStyle = 'white';
        ctx.fillRect(785, paddle2Y, 10, paddle_Height);

        ctx.fillStyle = 'white';
        ctx.fillText(scorePlayer2, 80, 100);
        ctx.font = '50px serif';
        ctx.fillStyle = 'white';
        ctx.fillText(scorePlayer1, canvas.width-100, 100 );



}