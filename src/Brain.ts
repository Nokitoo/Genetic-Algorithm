import {Vec2} from './Vectors';
import {getRandomNumber} from './utils';

export default class Brain {
    public size: number = 0;
    public directions: Vec2[] = [];
    public step: number = 0;

    constructor(size: number) {
        this.size = size;
        this.directions.length = this.size;

        for (let i = 0; i < this.size; ++i) {
            const randomAngle = getRandomNumber(Math.PI * -1, Math.PI);
            const direction = Vec2.fromAngle(randomAngle);
            this.directions[i] = direction;
        }
    }

    public updatePos(pos: Vec2, elapsed: number, speed: number): boolean {
        if (this.step >= this.size) {
            return false;
        }

        const dir = this.directions[this.step++];
        pos.x += dir.x * elapsed * speed;
        pos.y += dir.y * elapsed * speed;

        return true;
    }

    public reset() {
        this.step = 0;
    }
}