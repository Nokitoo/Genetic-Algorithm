import * as Phaser from 'phaser';

import {Vec2} from './Vectors';

function getRandomNumber(from: number, to: number) {
    return (Math.random() * (from - to) + to);
}

export default class Entity {
    private pos: Vec2;
    private dir: Vec2;
    private speed: number = 50.0;
    private size: number;
    private dead: boolean = false;

    private graphics: Phaser.GameObjects.Graphics;
    private mapSize: Vec2;

    constructor(mapSize: Vec2, size: number, graphics: Phaser.GameObjects.Graphics) {
        this.size = size;
        this.graphics = graphics;
        this.mapSize = mapSize;

        this.init();
    }

    private init() {
        this.dead = false;
        this.pos = {
            x: this.mapSize.x / 2.0,
            y: this.mapSize.y - (this.size * 3)
        };;

        this.dir = {
            x: getRandomNumber(-1, 1),
            y: getRandomNumber(-1, 1)
        };
    }

    draw() {
        this.graphics.clear();
        this.graphics.fillStyle(0xff3300, 1);
        this.graphics.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    }

    update(delta: number) {
        if (this.dead) {
            return;
        }

        delta = 0.16;
        this.pos.x += (this.dir.x * delta) * this.speed;
        this.pos.y += (this.dir.y * delta) * this.speed;

        if (this.pos.x <= 0 || this.pos.x >= this.mapSize.x ||
            this.pos.y <= 0 || this.pos.y >= this.mapSize.y) {
            this.dead = true;
        }
    }

    public isDead() {
        return this.dead;
    }

    public evolve() {
        this.init();
    }
}