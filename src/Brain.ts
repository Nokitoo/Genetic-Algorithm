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
            const direction = new Vec2(
                getRandomNumber(-1, 1),
                getRandomNumber(-1, 1)
            );
            direction.normalize();
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

    public getOffspring(brainA: Brain, brainB: Brain): void {
        const from = getRandomNumber(0, this.size);
        const to = getRandomNumber(from, this.size);

        this.directions = [
            brainA.directions.slice(0, from),
            brainB.directions.slice(from, to),
            brainA.directions.slice(to, this.size)
        ].reduce((res: Vec2[], directions:  Vec2[]) => {
            return res.concat(directions);
        });
    }
}