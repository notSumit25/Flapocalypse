import { Bird } from "./Bird";

export class RoomManager {
    birds: Bird[];
    context: CanvasRenderingContext2D;
    canvasHeight: number;
    backgroundImage: HTMLImageElement;
    birdImage: HTMLImageElement;
    upperObstacleImage: HTMLImageElement;
    lowerObstacleImage: HTMLImageElement;

    constructor(context: CanvasRenderingContext2D, canvasHeight: number) {
        this.birds = [];
        this.context = context;
        this.canvasHeight = canvasHeight;

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

    // Method to draw obstacles
    drawObstacles() {
        // Implement obstacle drawing logic here
        // Example: this.context.drawImage(this.obstacleImage, obstacle.x, obstacle.y);
        const upperObstacleX = 100;
        const upperObstacleY = 0;
        const lowerObstacleX = 100;
        const lowerObstacleY = this.canvasHeight - this.lowerObstacleImage.height;

        // Draw upper obstacle
        this.context.drawImage(this.upperObstacleImage, upperObstacleX, upperObstacleY);

        // Draw lower obstacle
        this.context.drawImage(this.lowerObstacleImage, lowerObstacleX, lowerObstacleY);
    }

    // Method to handle the game loop for all birds
    gameLoop() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.drawBackground();
        this.updateBirds();
        this.drawBirds();
        this.drawObstacles();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}
