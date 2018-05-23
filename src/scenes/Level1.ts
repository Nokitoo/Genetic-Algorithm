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
        const mapSize: Vec2 = {
            x: 800,
            y: 600
        }
        this.population = new Population(500, this, mapSize);
    }

    preload() {
        this.load.image('block', 'assets/sprites/block.jpg');
    }

    update(time: number, delta: number) {
        if (this.population.allEntitiesDead()) {
            this.population.evolve();
        }
    }
}