import * as PIXI from 'pixi.js';

import {Vec2} from './Vectors';

export default class Rect {
    protected graphics: PIXI.Graphics;
    private color: number = 0xFFFFFF;
    private alpha: number = 1.0;

    protected pos: Vec2 = new Vec2();
    protected size: Vec2;
    protected stage: PIXI.Container;

    constructor(stage: PIXI.Container, width: number, height: number, x: number = 0, y: number = 0, color: number = 0xFFFFFF) {
        this.stage = stage;
        this.size = new Vec2(width, height);
        this.pos = new Vec2(x, y);
        this.color = color;

        this.graphics = new PIXI.Graphics();
        stage.addChild(this.graphics);
    }

    public setColor(color: number, alpha: number = 1.0) {
        this.color = color;
        this.alpha = alpha;
    }

    public setPos(x: number, y: number) {
        this.pos.x = x;
        this.pos.y = y;
    }

    public draw() {
        this.graphics.clear();
        this.graphics.lineStyle(1, this.color, this.alpha);
        this.graphics.beginFill(this.color, this.alpha);
        this.graphics.drawRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        this.graphics.endFill();
    }

    public getPos() {
        return this.pos;
    }

    public destroy() {
        this.stage.removeChild(this.graphics);
    }

    static collide(rectA: Rect, rectB: Rect) {
        return rectA.pos.x < rectB.pos.x + rectB.size.x &&
            rectA.pos.x + rectA.size.x > rectB.pos.x &&
            rectA.pos.y < rectB.pos.y + rectB.size.y &&
            rectA.size.y + rectA.pos.y > rectB.pos.y;
    }
}