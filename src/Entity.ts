import * as Phaser from 'phaser';

import {Vec2} from './Vectors';

function getRandomNumber(from: number, to: number) {
    return (Math.random() * (from - to) + to);
}

export default class Entity {
    private size: number;
    private mapSize: Vec2;
    private dir: Vec2;
    private speed: number = 300.0;
    private dead: boolean = false;

    private block: Phaser.Physics.Arcade.Image;

    constructor(mapSize: Vec2, size: number, block: Phaser.Physics.Arcade.Image) {
        this.size = size;
        this.mapSize = mapSize;
        this.block = block;

        this.init();
    }

    private init() {
        this.dead = false;
        this.block.setPosition(this.mapSize.x / 2.0, this.mapSize.y - (this.size * 3));

        this.dir = {
            x: getRandomNumber(-1, 1),
            y: getRandomNumber(-1, 1)
        };
        this.block.setVelocity(
            this.dir.x * this.speed,
            this.dir.y * this.speed
        );
        this.block.setCollideWorldBounds(1);
    }

    public isDead() {
        return this.dead;
    }

    public evolve() {
        this.init();
    }

    public getBlock() {
        return this.block;
    }
}