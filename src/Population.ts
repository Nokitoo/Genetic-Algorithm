import Entity from './Entity';
import {Vec2} from './Vectors';

export default class Population {
    private goalPos: Vec2;
    private entities: Entity[] = [];

    constructor(entitiesNb: number, scene: Phaser.Scene, startPos: Vec2, goalPos: Vec2) {
        this.goalPos = goalPos;
        this.entities.length = entitiesNb;

        for (let i = 0; i < entitiesNb; ++i) {
            this.entities[i] = new Entity(startPos, 10, scene.add.graphics());
        }
    }

    public update(delta: number) {
        for (const entity of this.entities) {
            entity.update(delta);
            entity.draw();
        }
    }
}