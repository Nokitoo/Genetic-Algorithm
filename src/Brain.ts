import {Vec2} from './Vectors';
import {getRandomNumber} from './utils';

export default class Brain {
    directions: Vec2[] = [];
    step: number = 0;

    constructor(size: number) {
        this.directions.length = size;

        for (let i = 0; i < size; ++i) {
            const direction = new Vec2(
                getRandomNumber(-1, 1),
                getRandomNumber(-1, 1)
            );
            direction.normalize();
            this.directions[i] = direction;
        }
    }

    public updatePos(pos: Vec2, elapsed: number, speed: number): boolean {
        if (this.step >= this.directions.length) {
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