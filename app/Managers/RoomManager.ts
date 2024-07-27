import { Bird } from "./Bird";
export class RoomManager {
    birds: Bird[];
    context: CanvasRenderingContext2D;
    canvasHeight: number;

    constructor(context: CanvasRenderingContext2D, canvasHeight: number) {
        this.birds = [];
        this.context = context;
        this.canvasHeight = canvasHeight;
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
        this.birds.forEach(bird => bird.draw(this.context));
    }

    // Method to handle the game loop for all birds
    gameLoop() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        this.updateBirds();
        this.drawBirds();

        requestAnimationFrame(() => this.gameLoop());
    }
}
