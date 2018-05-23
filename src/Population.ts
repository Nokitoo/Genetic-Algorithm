import Entity from './Entity';
import {Vec2} from './Vectors';

function getRandomNumber(from: number, to: number) {
    return (Math.random() * (from - to) + to);
}

export default class Population {
    private mapSize: Vec2;
    private goalPos: Vec2;
    private entities: Entity[] = [];

    private scene: Phaser.Scene;

    constructor(entitiesNb: number, scene: Phaser.Scene, mapSize: Vec2) {
        this.scene = scene;
        this.mapSize = mapSize;
        this.goalPos =  {
            x: mapSize.x / 2.0,
            y: 0
        };
        this.entities.length = entitiesNb;

        for (let i = 0; i < entitiesNb; ++i) {
            var block = scene.physics.add.image(10, 10, 'block');
            this.entities[i] = new Entity(mapSize, 10, block);
        }
    }

    public allEntitiesDead() {
        for (const entity of this.entities) {
            if (!entity.isDead()) {
                return false;
            }
        }

        return true;
    }

    public evolve() {
        const entitiesNb = this.entities.length;
        for (let i = 0; i < entitiesNb; ++i) {
            this.entities[i].evolve();
        }
    }
}