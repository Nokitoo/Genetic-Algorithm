import Rect from './Rect';
import {Vec2} from './Vectors';

function getRandomNumber(from: number, to: number) {
    return (Math.random() * (from - to) + to);
}

export default class Entity extends Rect {
    private goalPos: Vec2;
    private mapSize: Vec2;
    private dir: Vec2 = new Vec2();
    private speed: number = 20.0;
    private dead: boolean = false;

    constructor(goalPos: Vec2, mapSize: Vec2, size: number, stage: PIXI.Container) {
        super(size, size, stage);

        this.goalPos = goalPos;
        this.mapSize = mapSize;

        this.init();
    }

    private init() {
        this.dead = false;
        this. pos.x = this.mapSize.x / 2.0,
        this.pos.y = this.mapSize.y - (this.size.y * 3);

        this.dir.x = getRandomNumber(-1, 1);
        this.dir.y = getRandomNumber(-1, 1);
        this.dir.normalize();
    }

    public isDead() {
        return this.dead;
    }

    public evolve() {
        this.init();
    }

    public update(elapsed: number) {
        if (this.isDead()) {
            return;
        }

        this.pos.x += this.dir.x * elapsed * this.speed;
        this.pos.y += this.dir.y * elapsed * this.speed;

        if (this.pos.x < 0 || this.pos.x >= this.mapSize.x ||
            this.pos.y < 0 || this.pos.y >= this.mapSize.y) {
                this.dead = true;
        }

        if (this.pos.dist(this.goalPos) <= this.size.x) {
            this.setColor(0x00FF00);
        }
    }
}