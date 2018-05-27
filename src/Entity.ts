import Brain from './Brain';
import Rect from './Rect';
import {Vec2} from './Vectors';

export default class Entity extends Rect {
    private goalPos: Vec2;
    private mapSize: Vec2;
    private speed: number = 30.0;
    private dead: boolean = false;

    private brain: Brain;
    private fitness: number;

    constructor(goalPos: Vec2, mapSize: Vec2, size: number, stage: PIXI.Container) {
        super(stage, size, size);

        this.goalPos = goalPos;
        this.mapSize = mapSize;
        this.brain = new Brain(500);
        this.setColor(0xFF0000);

        this.init();
    }

    private init() {
        this.dead = false;
        this.pos.x = this.mapSize.x / 2.0,
        this.pos.y = this.mapSize.y - (this.size.y * 3);
        this.brain.reset();
    }

    public isDead(): boolean {
        return this.dead;
    }

    public setDead(dead: boolean): void {
        this.dead = dead;
    }

    public getFitness() {
        return this.fitness;
    }

    public getBrain() {
        return this.brain;
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
    }

    public calculateFitness() {
        this.fitness = this.pos.dist(this.goalPos) * -1;
    }

    static makeChild(entityA: Entity, entityB: Entity): Entity {
        let entity = new Entity(entityA.goalPos, entityA.mapSize, entityA.size.x, entityA.stage);
        entity.getBrain().getOffspring(entityA.getBrain(), entityB.getBrain());

        return entity;
    }
}