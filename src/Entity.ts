import Brain from './Brain';
import Rect from './Rect';
import {Vec2} from './Vectors';

export default class Entity extends Rect {
    private goalPos: Vec2;
    private mapSize: Vec2;
    private speed: number = 30.0;
    private dead: boolean = false;
    private brain: Brain;

    constructor(goalPos: Vec2, mapSize: Vec2, size: number, stage: PIXI.Container) {
        super(size, size, stage);

        this.goalPos = goalPos;
        this.mapSize = mapSize;
        this.brain = new Brain(500);

        this.init();
    }

    private init() {
        this.dead = false;
        this. pos.x = this.mapSize.x / 2.0,
        this.pos.y = this.mapSize.y - (this.size.y * 3);
        this.brain.reset();
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

        if (!this.brain.updatePos(this.pos, elapsed, this.speed)) {
            this.dead = true;
            return;
        }

        if (this.pos.x < 0 || this.pos.x >= this.mapSize.x ||
            this.pos.y < 0 || this.pos.y >= this.mapSize.y) {
                this.dead = true;
                return;
        }

        if (this.pos.dist(this.goalPos) <= this.size.x) {
            this.setColor(0x00FF00);
        }
    }
}