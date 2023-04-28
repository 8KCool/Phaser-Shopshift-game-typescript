import { Game, Types } from 'phaser';
import Scenes from './scenes';

declare global {
    interface Window {
        sizeChanged: () => void;
        game: Phaser.Game;
    }
}
const gameConfig: Types.Core.GameConfig = {
    title: 'ShopShift',
    type: Phaser.WEBGL,
    parent: 'BrainGame',
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        },
    },
    render: {
        antialiasGL: false,
        pixelArt: true,
    },
    callbacks: {
        postBoot: () => {
            window.sizeChanged();
        },
    },
    canvasStyle: `display: block; width: 100%; height: 100%;`,
    autoFocus: true,
    audio: {
        disableWebAudio: false,
    },
    scene: Scenes,
};

window.sizeChanged = () => {
    // if (window.game.isBooted) {
        // setTimeout(() => {
        //     console.log("sdf");
        //     window.game.scale.resize(window.innerWidth, window.innerHeight);
        //     window.game.canvas.setAttribute(
        //         'style',
        //         `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,
        //     );
        // }, 100);
    // }
};

window.onresize = () => window.sizeChanged();

window.game = new Game(gameConfig);