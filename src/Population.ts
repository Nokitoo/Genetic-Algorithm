import * as PIXI from 'pixi.js';

import Entity from './Entity';
import {Vec2} from './Vectors';
import {getRandomNumber} from './utils';

const BEST_SAMPLES_RATE = 0.2;
const RANDOM_SAMPLES_RATE = 0.07;

export default class Population {
    private entitiesNb: number;
    private mapSize: Vec2;
    private entities: Entity[] = [];
    private generation: number = 0;

    constructor(goalPos: Vec2, entitiesNb: number, mapSize: Vec2, stage: PIXI.Container) {
        this.entitiesNb = entitiesNb;
        this.mapSize = mapSize;
        this.entities.length = this.entitiesNb;

        for (let i = 0; i < this.entitiesNb; ++i) {
            this.entities[i] = new Entity(goalPos, mapSize, 10, stage);
        }
    }

    private allEntitiesDead() {
        for (const entity of this.entities) {
            if (!entity.isDead()) {
                return false;
            }
        }

        return true;
    }

    // Check if the new generation has been created
    private isGenerated() {
        return this.entities.length >= this.entitiesNb;
    }

    private makeChildren(newGeneration: Entity[]) {
        if (this.isGenerated()) {
            return;
        }

        for (let i = 0; i < newGeneration.length && !this.isGenerated(); ++i) {
            for (let j = 0; j < newGeneration.length && !this.isGenerated() && i + j + 1 < newGeneration.length; ++j) {
                const child = Entity.makeChild(newGeneration[i + j], newGeneration[i + j + 1]);
                this.entities.push(child);
            }
        }

        this.makeChildren(newGeneration);
    }

    private createNextGeneration() {
        // Calculate entities fitness
        for (const entity of this.entities) {
            entity.calculateFitness();
        }

        // Sort by fitness
        this.entities.sort((a: Entity, b: Entity): number => {
            return b.getFitness() - a.getFitness();
        });

        // Calculate which part of the current population
        // will be selected for the next generation
        const bestSampleNb = Math.round(this.entitiesNb * BEST_SAMPLES_RATE);
        const randomSampleNb = Math.round(this.entitiesNb * RANDOM_SAMPLES_RATE);

        let newGeneration = [];
        // Select best entities
        newGeneration = this.entities.slice(0, bestSampleNb);

        // Select random entities
        for (let i = 0; i < randomSampleNb; ++i) {
            const randIndex = Math.round(getRandomNumber(0, this.entities.length - 1));
            newGeneration.push(this.entities[randIndex]);
        }

        for (const entity of this.entities) {
            entity.destroy();
        }
        this.entities.length = 0;

        this.entities = newGeneration;
        this.makeChildren(newGeneration);

        console.log('Evolved to generation', ++this.generation);
        console.log('Entities nb:', this.entities.length);
    }

    public update(gameSpeed: number, elapsed: number) {
        // Move entities
        for (let i = 0; i < gameSpeed; ++i) {
            for (const entity of this.entities) {
                entity.update(elapsed);
            }
        }

        if (this.allEntitiesDead()) {
            this.createNextGeneration();
        }
    }

    public draw() {
        for (const entity of this.entities) {
            entity.draw();
        }
    }
}