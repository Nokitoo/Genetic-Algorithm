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

    public dist(point: Vec2) {
        return Math.sqrt(
            Math.pow(point.x - this.x, 2) +
            Math.pow(point.y - this.y, 2)
        )
    }

    static fromAngle(angle: number): Vec2 {
        return new Vec2(
            Math.cos(angle),
            Math.sin(angle)
        );
    }
}