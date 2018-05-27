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
    private obstacles: Rect[];
    public speed: number = 30;

    constructor(mapSize: Vec2) {
        this.renderer = PIXI.autoDetectRenderer(800, 600);
        this.stage = new PIXI.Container();
        document.body.appendChild(this.renderer.view);
        
        // Setup goal
        this.goal = new Rect(this.stage, 10, 10);
        this.goal.setColor(0x00FF00);
        this.goal.setPos(mapSize.x / 2.0, 0);

        this.obstacles = [
            new Rect(this.stage, mapSize.x / 2, 5, 0, mapSize.y / 2, 0xFFFF00),
            new Rect(this.stage, mapSize.x / 2, 5, mapSize.x / 2 + 20, mapSize.y / 2, 0xFFFF00)
        ]

        this.population = new Population(this.goal.getPos(), 1000, mapSize, this.stage);


        // Setup ticker to call this.update every tick
        // Thus, we render manually
        let ticker = PIXI.ticker.shared;
        ticker.autoStart = true;
        ticker.add(this.update, this);
    }

    private update(elapsed: number) {
        // TODO: Get real elapsed
        this.population.update(this.speed, 0.16, this.obstacles);
        this.draw();
    }

    private draw() {
        for (const obstacle of this.obstacles) {
            obstacle.draw();
        }

        this.goal.draw();
        this.population.draw();
        this.renderer.render(this.stage);
    }
}