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

        //this.state.add('Level1', Level1);

       // super(800, 600, Phaser.AUTO, 'content', null);

/*         this.state.add('Level1', Level1, false);

        this.state.start('Level1'); */
    }

}