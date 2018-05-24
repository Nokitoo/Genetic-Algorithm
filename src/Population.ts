import * as PIXI from 'pixi.js';

import Entity from './Entity';
import {Vec2} from './Vectors';

function getRandomNumber(from: number, to: number) {
    return (Math.random() * (from - to) + to);
}

export default class Population {
    private mapSize: Vec2;
    private goalPos: Vec2;
    private entities: Entity[] = [];

    constructor(entitiesNb: number, mapSize: Vec2, stage: PIXI.Container) {
        this.mapSize = mapSize;
        this.goalPos = new Vec2(
            mapSize.x / 2.0,
            0
        );
        this.entities.length = entitiesNb;

        for (let i = 0; i < entitiesNb; ++i) {
            this.entities[i] = new Entity(mapSize, 10, stage);
        }
    }

    private allEntitiesDead() {
        for (const entity of this.entities) {
            if (!entity.isDead()) {
                return false;
            }
        }

        return true;
    }

    private evolve() {
        for (const entity of this.entities) {
            entity.evolve();
        }
    }

    public update(elapsed: number) {
        for (const entity of this.entities) {
            entity.update(elapsed);
        }

        if (this.allEntitiesDead()) {
            this.evolve();
        }
    }

    public draw() {
        for (const entity of this.entities) {
            entity.draw();
        }
    }
}