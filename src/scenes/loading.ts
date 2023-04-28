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

    private initProgressBar() {
        const halfWidth = getGameWidth(this) * 0.5;
        const posY = getGameHeight(this) - 50;

        const progressBarHeight = 30;
        const progressBarWidth = halfWidth * 2 - 100;

        const progressBar = this.add.rectangle(
            halfWidth + 20 - progressBarWidth * 0.5,
            posY,
            10,
            progressBarHeight - 20,
            0xFFFFFF,
        );

        const loadingText = this.add.text(halfWidth - 75, posY - 100, 'Loading...').setFontSize(24);
        const percentText = this.add.text(halfWidth - 25, posY, '0%').setFontSize(24);
        const assetText = this.add.text(halfWidth - 25, posY + 100, '').setFontSize(24);

        var percent = 0;
        this.load.on('progress', (value: any) => {
            progressBar.width = (progressBarWidth - 30) * value * 0.2;  // temp progress real limit value

            percent = value * 100 * 0.2;
            percentText.setText(`${percent}%`);
        });

        this.load.on('fileprogress', (file: any) => {
            assetText.setText(file.key);
        });

        this.load.on('complete', () => {
            var intId = setInterval(function () {
                if(percent == 100) {
                    loadingText.destroy();
                    percentText.destroy();
                    assetText.destroy();
                    progressBar.destroy();
                    clearInterval(intId);
                }
                else {
                    progressBar.width = (progressBarWidth - 30) * percent / 100;
                    percent ++;
                    percentText.setText(`${percent}%`);
                }
            }, 100);  // temp progress speed
        })
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