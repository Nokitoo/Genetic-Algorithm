import Brain from './Brain';
import Rect from './Rect';
import {Vec2} from './Vectors';

export default class Entity extends Rect {
    private goalPos: Vec2;
    private mapSize: Vec2;
    private speed: number = 30.0;
    private dead: boolean = false;
    private collide: boolean = false;
    private reachedGoal: boolean = false;

    public brain: Brain;
    private fitness: number;

    constructor(goalPos: Vec2, mapSize: Vec2, size: number, stage: PIXI.Container) {
        super(stage, size, size);

        this.goalPos = goalPos;
        this.mapSize = mapSize;
        this.brain = new Brain(1000);
        this.setColor(0xFF0000);

        this.init();
    }

    private init() {
        this.dead = false;
        this.pos.x = this.mapSize.x / 2.0,
        this.pos.y = this.mapSize.y - (this.size.y * 3);
        this.brain.reset();
        this.collide = false;
        this.reachedGoal = false;
    }

    public isDead(): boolean {
        return this.dead;
    }

    public hasCollide(dead: boolean): void {
        this.dead = dead;
        this.collide = true;
    }

    public getFitness() {
        return this.fitness;
    }

    public evolve() {
        this.init();
    }

    public update(elapsed: number) {
        if (this.isDead() || this.reachedGoal) {
            return;
        }

        if (!this.brain.updatePos(this.pos, elapsed, this.speed)) {
            this.dead = true;
            return;
        }

        if (this.goalPos.dist(this.pos) <= this.size.x) {
            this.setColor(0x00FF00);
            this.reachedGoal = true;
            this.dead = true;
        }

        if (this.pos.x < 0 || this.pos.x >= this.mapSize.x ||
            this.pos.y < 0 || this.pos.y >= this.mapSize.y) {
                this.dead = true;
                return;
        }
    }

    public calculateFitness() {
        if (this.reachedGoal) {
            this.fitness = 1.0 / (this.brain.step * this.brain.step);
            return;
        }

        const dist = this.pos.dist(this.goalPos);
        this.fitness = 1.0 / (dist * dist);
    }
}