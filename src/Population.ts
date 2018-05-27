import * as PIXI from 'pixi.js';

import Entity from './Entity';
import {Vec2} from './Vectors';
import {getRandomNumber} from './utils';
import Rect from './Rect';
import Brain from './Brain';

const BEST_SAMPLES_RATE = 0.1;
const RANDOM_SAMPLES_RATE = 0.03;
const ENTITY_SIZE = 3;
const MUTATION_RATE = 0.0001;

export default class Population {
    private entitiesNb: number;
    private mapSize: Vec2;
    private goalPos: Vec2;
    private entities: Entity[] = [];
    private generation: number = 0;

    private stage: PIXI.Container;

    constructor(goalPos: Vec2, entitiesNb: number, mapSize: Vec2, stage: PIXI.Container) {
        console.log('Created population of', entitiesNb, 'entities');
        console.log(
            'Every generation,',
            Math.round(entitiesNb * BEST_SAMPLES_RATE),
            ' best samples and',
            Math.round(entitiesNb * RANDOM_SAMPLES_RATE),
            ' will be choosen from the next generation'
        );

        if (BEST_SAMPLES_RATE + RANDOM_SAMPLES_RATE > 1.0) {
            throw new Error('best and random samples rate cannot be greater than 1');
        }

        this.entitiesNb = entitiesNb;
        this.mapSize = mapSize;
        this.goalPos = goalPos;
        this.entities.length = this.entitiesNb;
        this.stage = stage;

        for (let i = 0; i < this.entitiesNb; ++i) {
            this.entities[i] = new Entity(goalPos, mapSize, ENTITY_SIZE, stage);
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

    private makeChildrenFromParents(parentA: Entity, parentB: Entity) {
        const brainSize = parentA.brain.size;
        const crossoverPoint = getRandomNumber(0, brainSize);

        const brainADirs: Vec2[][] = [
            parentA.brain.directions.slice(0, crossoverPoint),
            parentA.brain.directions.slice(crossoverPoint, brainSize)
        ];
        const brainBDirs: Vec2[][] = [
            parentB.brain.directions.slice(0, crossoverPoint),
            parentB.brain.directions.slice(crossoverPoint, brainSize)
        ];

        const childA = new Entity(this.goalPos, this.mapSize, ENTITY_SIZE, this.stage);
        const childB = new Entity(this.goalPos, this.mapSize, ENTITY_SIZE, this.stage);

        childA.brain.directions = brainADirs[0].concat(brainBDirs[1]);
        childB.brain.directions = brainBDirs[0].concat(brainADirs[1]);

        this.entities.push(childA);
        this.entities.push(childB);
    }

    private makeChildren(newGeneration: Entity[]) {
        if (this.isGenerated()) {
            return;
        }

        for (let i = 0; i < newGeneration.length && !this.isGenerated(); ++i) {
            for (let j = 0; j < newGeneration.length && !this.isGenerated() && i + j + 1 < newGeneration.length; ++j) {
                this.makeChildrenFromParents(newGeneration[i + j], newGeneration[i + j + 1]);
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

    private mutate() {
        for (const entity of this.entities) {
            const brainSize = entity.brain.size;
            for (let i = 0; i < brainSize; ++i) {
                const random = getRandomNumber(0, 1);
                if (random < MUTATION_RATE) {
                    console.log('OKK');
                    entity.brain.directions[i].x = getRandomNumber(-1, 1);
                    entity.brain.directions[i].y = getRandomNumber(-1, 1);
                }
            }
        }
    }

    public update(gameSpeed: number, elapsed: number, obstacles: Rect[]) {
        // Move entities
        for (let i = 0; i < gameSpeed; ++i) {
            for (const entity of this.entities) {
                entity.update(elapsed);
                for (const obstacle of obstacles) {
                    if (Rect.collide(entity, obstacle)) {
                        entity.hasCollide(true);
                    }
                }
            }
        }

        if (this.allEntitiesDead()) {
            this.createNextGeneration();
            //this.mutate();
        }
    }

    public draw() {
        for (const entity of this.entities) {
            entity.draw();
        }
    }
}