export class Vec2 {
    x: number = 0.0;
    y: number = 0.0;

    constructor(x?: number, y?: number) {
        this.x = x;
        this.y = y;
    }

    public normalize() {
        const length = Math.sqrt(this.x * this.x + this.y * this.y);
        this.x /= length;
        this.y /= length;
    }
}