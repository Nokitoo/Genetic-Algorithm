import {Vec2} from './Vectors';
import Game from './Game';

window.onload = () => {
    const mapSize: Vec2 = new Vec2(
        800,
        600
    );
    var game = new Game(mapSize);
};