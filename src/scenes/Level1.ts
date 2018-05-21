import * as Phaser from 'phaser';

import Population from '../Population';
import {Vec2} from '../Vectors';

export default class Level1 extends Phaser.Scene {
    private population: Population;

    constructor() {
        super('Level1');
    }

    create() {
        // TODO: Find a way to get map size
        const startPos: Vec2 = {
            x: 800 / 2.0,
            y: 600 - 20
        };
        const goalPos: Vec2 = {
            x: 800 / 2.0,
            y: 0
        };
        this.population = new Population(5, this, startPos, goalPos);
    }

    preload() {
    }

    update(time: number, delta: number) {
        this.population.update(delta);
    }
}