export class Bird {
    x: number;
    y: number;
    velocity: number;
    acceleration: number;
    gravity: number;
    lift: number;
    radius: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.velocity = 0;
        this.acceleration = 0;
        this.gravity = 0.6;
        this.lift = -15;
        this.radius = 12;
    }

    // Method to apply gravity to the bird
    applyGravity() {
        this.acceleration += this.gravity;
        this.velocity += this.acceleration;
        this.y += this.velocity;
        this.acceleration = 0;

        // Simulate air resistance
        this.velocity *= 0.9;
    }

    // Method to make the bird flap
    flap() {
        this.velocity += this.lift;
    }

    // Method to check if the bird hits the ground or the ceiling
    checkBounds(height: number) {
        if (this.y > height - this.radius) {
            this.y = height - this.radius;
            this.velocity = 0;
        } else if (this.y < this.radius) {
            this.y = this.radius;
            this.velocity = 0;
        }
    }

    // Method to draw the bird (assuming a 2D rendering context is provided)
    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = "yellow";
        context.fill();
        context.stroke();
    }
}
