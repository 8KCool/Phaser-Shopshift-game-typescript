import { Scene } from 'phaser';
import { getGameWidth, getGameHeight } from '../helper';
import { InfoBoardContainer } from '../class/infoBoardContainer';
import { ActorContainer } from '../class/actorContainer';

export class GameScene extends Scene {

    private gameTitle!: Phaser.GameObjects.Text;
    private shopBg!: Phaser.GameObjects.TileSprite;
    private floorBg!: Phaser.GameObjects.TileSprite;
    private signContainer!: InfoBoardContainer;
    private actorContainer!: ActorContainer;


    constructor() {
        super('game-scene');
    }

    create(): void {
        this.initBoard();
        this.initActor();
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
        this.signContainer = new InfoBoardContainer(this, 0, 0);
    }

    private initGameBoard() {
        // set game bg
        this.shopBg = this.add.tileSprite(0, 0, getGameWidth(this), 438, "bg-shelf").setOrigin(0, 0);
        this.floorBg = this.add.tileSprite(0, 438, getGameWidth(this), 438, "bg-floor").setOrigin(0, 0);
        const gameContainer = this.add.container(0, getGameHeight(this)*0.3);
        gameContainer.add(this.shopBg);
        gameContainer.add(this.floorBg);
    }

    private initActor() {
        this.actorContainer = new ActorContainer(this, getGameWidth(this)/2, this.signContainer.height + 438);
        // this.actorContainer.playAnimation("walk");
    }

    private prepareGame() {
    }

    private testGame() {

    }

    private startGame() {

    }
}