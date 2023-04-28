import { Scene } from 'phaser';
import { getGameWidth, getGameHeight } from '../helper';

export class GameScene extends Scene {

    private gameTitle!: Phaser.GameObjects.Text;

    private signBg!: Phaser.GameObjects.Image;
    private signTitle!: Phaser.GameObjects.Text;

    private shopBg!: Phaser.GameObjects.TileSprite;
    private floorBg!: Phaser.GameObjects.TileSprite;


    constructor() {
        super('game-scene');
    }

    create(): void {
        this.initBoard();
        this.prepareGame();
        this.testGame();
        this.startGame();
    }

    private initBoard() {
        this.gameTitle = this.add.text(getGameWidth(this)/2, getGameHeight(this)/2, "Instruction")
            .setFontSize(40).setColor("#000000").setOrigin(.5, .5).setFontFamily("cursive").setFontStyle("bold");
        this.initInfoBoard();
        this.initGameBoard();
    }

    private initInfoBoard() {
        // set info bg
        const wallBg = this.add.tileSprite(0, 0, getGameWidth(this), getGameHeight(this) * 0.3, "bg-wall").setOrigin(0, 0);

        // set sign panel
        this.signBg = this.add.image(0, 0, "bg-sign").setOrigin(0, 0);
        this.signTitle = this.add.text(50, 120, "Goal: Buy products that are on sale.")
            .setFontSize(30).setColor("#FFFFFF").setOrigin(0, 0).setFontFamily("cursive");
        this.signTitle.setWordWrapWidth(420);

        const signContainer = this.add.container(getGameWidth(this) / 2 - this.signBg.width / 2, 0);
        signContainer.add(this.signBg);
        signContainer.add(this.signTitle);
    }

    private initGameBoard() {
        this.shopBg = this.add.tileSprite(0, 0, getGameWidth(this), 438, "bg-shelf").setOrigin(0, 0);
        this.floorBg = this.add.tileSprite(0, 438, getGameWidth(this), 438, "bg-floor").setOrigin(0, 0);
        const gameContainer = this.add.container(0, getGameHeight(this)*0.3);
        gameContainer.add(this.shopBg);
        gameContainer.add(this.floorBg);
    }

    private prepareGame() {
    }

    private testGame() {

    }

    private startGame() {

    }
}