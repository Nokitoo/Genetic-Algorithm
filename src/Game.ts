import * as PIXI from 'pixi.js';

import {Vec2} from './Vectors';
import Population from './Population';
import Rect from './Rect';

export default class Game {
    private app: PIXI.Application;
    private renderer: any;
    private stage: PIXI.Container;

    private population: Population;
    private goal: Rect;

    constructor(mapSize: Vec2) {
        this.renderer = PIXI.autoDetectRenderer(800, 600);
        this.stage = new PIXI.Container();
        document.body.appendChild(this.renderer.view);
        
        this.population = new Population(500, mapSize, this.stage);
        this.goal = new Rect(10, 10, this.stage);
        this.goal.setColor(0x0000FA);
        this.goal.setPos(mapSize.x / 2.0, 0);

        let ticker = PIXI.ticker.shared;
        ticker.autoStart = true;
        ticker.add(this.update, this);
    }

    private update(elapsed: number) {
        this.population.update(0.16);
        this.draw();
    }

    private draw() {
        this.population.draw();
        this.goal.draw();
        this.renderer.render(this.stage);
    }
}