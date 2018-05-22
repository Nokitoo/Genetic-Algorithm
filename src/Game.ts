import * as Phaser from 'phaser';
import Level1 from './scenes/Level1';

export default class Game extends Phaser.Game {

    constructor() {
        var config: GameConfig = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scene: Level1
        };
        super(config)
    }
}