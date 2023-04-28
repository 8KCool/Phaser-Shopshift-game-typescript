import { GameObjects, Scene } from 'phaser';
import { getGameWidth, getGameHeight } from '../helper';

export class LoadingScene extends Scene {

    private background!: GameObjects.Image;
    constructor() {
        super('loading-scene');
    }
    preload(): void {
        this.initProgressBar();
        this.loadAssets();
    }

    private loadAssets() {
        this.load.baseURL = 'assets/';
        this.load.image('bg-wall', 'sprites/bg-wall.png');
        this.load.image('bg-floor', 'sprites/bg-floor.png');
        this.load.image('bg-shelf', 'sprites/bg-shelf.png');
        this.load.image('bread', 'sprites/bread.png');
        this.load.image('hudCross', 'sprites/hudCross.png');
        this.load.image('hudTick', 'sprites/hudTick.png');
        this.load.image('playPause', 'sprites/playPause.png');
        this.load.image('shopshift', 'sprites/shopshift.png');

    }
}