import * as PIXI from 'pixi.js';

import {Vec2} from './Vectors';

export default class Rect {
    private graphics: PIXI.Graphics;
    private color: number = 0xFFFFFF;
    private alpha: number = 1.0;

    protected pos: Vec2 = new Vec2();
    protected size: Vec2;

    constructor(width: number, height: number, stage: PIXI.Container) {
        this.size = new Vec2(width, height);

        this.graphics = new PIXI.Graphics();
        stage.addChild(this.graphics);
    }

    public setColor(color: number, alpha?: number) {
        this.color = color;
        this.alpha = alpha;
    }

    public setPos(x: number, y: number) {
        this.pos.x = x;
        this.pos.y = y;
    }

    public draw() {
        this.graphics.clear();
        this.graphics.lineStyle(0);
        this.graphics.beginFill(this.color, this.alpha);
        this.graphics.drawRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        this.graphics.endFill();
    }
}