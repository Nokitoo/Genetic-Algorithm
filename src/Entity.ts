import * as Phaser from 'phaser';

import {Vec2} from './Vectors';

export default class Entity {
    private pos: Vec2;
    private dir: Vec2;
    private size: number;
    private dead: boolean = false;

    private graphics: Phaser.GameObjects.Graphics;

    constructor(startPos: Vec2, size: number, graphics: Phaser.GameObjects.Graphics) {
        this.size = size;
        this.graphics = graphics;
        this.pos = startPos;

        this.dir = {
            x: 0,
            y: -1
        };
    }

    draw() {
        this.graphics.clear();
        this.graphics.fillStyle(0xff3300, 1);
        this.graphics.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    }

    update(delta: number) {
        this.pos.x = this.pos.x + (this.dir.x * (delta / 1000));
        this.pos.y = this.pos.y + (this.dir.y * (delta / 1000));
    }
}