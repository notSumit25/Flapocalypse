export class Obstacle {
	x: number;
	y: number;
	width: number;
	height: number;
	image: HTMLImageElement;
	passed: boolean;

	constructor(x: number, y: number, width: number, height: number, imageSrc: string) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.image = new Image();
		this.image.src = imageSrc;
		this.passed = false;
	}

	move(speed: number) {
		this.x -= speed;
	}

	draw(context: CanvasRenderingContext2D) {
		context.drawImage(this.image, this.x, this.y, this.width, this.height);
	}
}