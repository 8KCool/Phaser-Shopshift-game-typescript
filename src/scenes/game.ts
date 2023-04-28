import { Scene } from 'phaser';
import { getGameWidth, getGameHeight } from '../helper';

export class GameScene extends Scene {

    private wallBg!: Phaser.GameObjects.Image;

    private signBg!: Phaser.GameObjects.Image;
    private signTitle!: Phaser.GameObjects.Text;

    constructor() {
        super('game-scene');
    }

    create(): void {

        this.initGameBoard();

        this.prepareGame();
        this.testGame();
        this.startGame();
    }

    private initGameBoard() {
        this.initInfoBoard();

    }

    private initInfoBoard() {
        // set info bg
        this.wallBg = this.add.image(0, 0, "bg-wall").setOrigin(0, 0);
        this.wallBg.displayWidth = this.sys.canvas.width;
        this.wallBg.displayHeight = this.sys.canvas.height * 0.3;

        // set sign panel
        this.signBg = this.add.image(0, 0, "bg-sign").setOrigin(0, 0);
        this.signTitle = this.add.text(50, 120, "Goal: Buy products that are on sale.")
            .setFontSize(30).setColor("#FFFFFF").setOrigin(0, 0).setFontFamily("cursive");
        this.signTitle.setWordWrapWidth(420);

        const signContainer = this.add.container(getGameWidth(this) / 2 - this.signBg.width / 2, 0);
        signContainer.add(this.signBg);
        signContainer.add(this.signTitle);
    }

    private prepareGame() {
    }

    private testGame() {

    }

    private startGame() {

    }
}