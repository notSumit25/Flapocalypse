import { Bird } from "./Bird";
import { Obstacle } from "./Obstacles";

export class RoomManager {
    birds: Bird[];
    context: CanvasRenderingContext2D;
    canvasHeight: number;
    backgroundImage: HTMLImageElement;
    birdImage: HTMLImageElement;
    upperObstacleImage: HTMLImageElement;
    lowerObstacleImage: HTMLImageElement;
    obstacles: Obstacle[];
    obstacleSpeed: number;
    obstacleInterval: number;
    lastObstacleTime: number;
    score: number;

    constructor(context: CanvasRenderingContext2D, canvasHeight: number) {
        this.birds = [];
        this.context = context;
        this.canvasHeight = canvasHeight;
        this.obstacles = []
        this.obstacleSpeed = 2
        this.obstacleInterval = 2000
        this.lastObstacleTime = Date.now()
        this.score = 0

        // Load images
        this.backgroundImage = new Image();
        this.backgroundImage.src = '/images/background.png';

        this.birdImage = new Image();
        this.birdImage.src = '/images/bird.png';

        this.upperObstacleImage = new Image();
        this.upperObstacleImage.src = '/images/upper.png';

        this.lowerObstacleImage = new Image();
        this.lowerObstacleImage.src = '/images/lower.png';
        this.context.canvas.addEventListener('click',()=>{
            this.birds.forEach(b=>b.flap());
        })
    }

    // Method to add a new bird to the room
    addBird(x: number, y: number): Bird {
        const newBird = new Bird(x, y);
        this.birds.push(newBird);
        return newBird;
    }

    // Method to remove a bird from the room
    removeBird(bird: Bird) {
        const index = this.birds.indexOf(bird);
        if (index > -1) {
            this.birds.splice(index, 1);
        }
    }

    // Method to update all birds
    updateBirds() {
        this.birds.forEach(bird => {
            bird.applyGravity();
            bird.checkBounds(this.canvasHeight);
        });
    }

    // Method to draw all birds
    drawBirds() {
        this.birds.forEach(bird => {
            this.context.drawImage(this.birdImage, bird.x, bird.y);
        });
    }

    // Method to draw the background
    drawBackground() {
        this.context.drawImage(this.backgroundImage, 0, 0, this.context.canvas.width, this.context.canvas.height);
    }
    addObstacle() {
        const gap = 150;
        const upperHeight = Math.random() * (this.canvasHeight / 2);
        const lowerHeight = this.canvasHeight - upperHeight - gap;

        const upperObstacle = new Obstacle(
            this.context.canvas.width,
            0,
            this.upperObstacleImage.width,
            upperHeight,
            '/images/upper.png'
        );

        const lowerObstacle = new Obstacle(
            this.context.canvas.width,
            this.canvasHeight - lowerHeight,
            this.lowerObstacleImage.width,
            lowerHeight,
            '/images/lower.png'
        );

        this.obstacles.push(upperObstacle, lowerObstacle);
    }


    // Method to draw obstacles
    updateObstacles() {
        const now = Date.now();
        if (now - this.lastObstacleTime > this.obstacleInterval) {
            this.addObstacle();
            this.lastObstacleTime = now;
        }

        this.obstacles.forEach(obstacle => {
            obstacle.move(this.obstacleSpeed);
        });

        // Remove obstacles that are off-screen
        this.obstacles = this.obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
    }
    drawObstacles() {
        this.obstacles.forEach(obstacle => obstacle.draw(this.context));
    }

    // Method to handle the game loop for all birds
    gameLoop() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.drawBackground();
        this.updateBirds();
        this.drawBirds();
        this.drawObstacles();
        this.updateObstacles();
        this.checkCollisions();
        this.updateScore();
        this.displayScore();

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    // Method to check for collisions between birds and obstacles
    checkCollisions() {
        this.birds.forEach(bird => {
            this.obstacles.forEach(obstacle => {
                if (
                    bird.x < obstacle.x + obstacle.width &&
                    bird.x + 50 > obstacle.x &&
                    bird.y < obstacle.y + obstacle.height &&
                    bird.y  > obstacle.y
                ) {
                    this.removeBird(bird);
                    this.displayGameOver();
                    this.resetGame();
                }
            });
        });
    }

    // Method to update the score

    updateScore() {
        this.obstacles.forEach(obstacle => {
            if (obstacle.x + obstacle.width < 50 && !obstacle.passed) {
                this.score++;
                obstacle.passed = true;
            }
        });
    }

    // Method to display the score

    displayScore() {
        this.context.font = '24px Arial';
        this.context.fillStyle = 'black';
        this.context.fillText(`Score: ${this.score}`, 10, 50);
    }

    resetGame() {
        this.birds = [];
        this.obstacles = [];
        this.score = 0;
        this.lastObstacleTime = Date.now();
        // Optionally, you can add a new bird to start the game again
        this.addBird(this.context.canvas.width / 2, this.canvasHeight / 2);
    }

    displayGameOver() {
        this.context.fillStyle = "red";
        this.context.font = "48px Arial";
        this.context.fillText("Game Over", this.context.canvas.width / 2 - 100, this.canvasHeight / 2);
    }

}
