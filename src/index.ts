import {Vec2} from './Vectors';
import Game from './Game';

function initGame() {
    const mapSize: Vec2 = new Vec2(
        800,
        600
    );
    const game = new Game(mapSize);

    bindKeyListener(game);
}

function bindKeyListener(game: Game) {
    window.document.addEventListener('keyup', (e) => {
        const code = e.keyCode || e.which;

        if (code == 107) {
            game.speed++;
        } else if (code == 109) {
            game.speed--;
        }
    });
}

window.onload = initGame;