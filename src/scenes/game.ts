import { Scene } from 'phaser';
import { getGameWidth, getGameHeight } from '../helper';
import { InfoBoardContainer } from '../class/infoBoardContainer';
import { ActorContainer } from '../class/actorContainer';
import {Actor_Sprite_Key, Game_Sprite_Key} from '../const';

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
        this.initGameAnimate();
        this.initBoard();
        this.initActor();
        this.prepareGame();
        this.testGame();
        this.startGame();
    }

    private initGameAnimate() {
        var walkAnim = this.anims.generateFrameNames(Actor_Sprite_Key, {
            start: 1, end: 9, 
            prefix: 'walk_', suffix: '.png'
        });
        this.anims.create({ key: "walk", frames: walkAnim, frameRate: 10, repeat: -1 });
    }

    private initBoard() {
        this.initInfoBoard();
        this.initGameBoard();
        this.gameTitle = this.add.text(getGameWidth(this)/2, getGameHeight(this)/2, "Instruction")
            .setFontSize(40).setColor("#000000").setOrigin(.5, .5).setFontFamily("cursive").setFontStyle("bold");
    }

    private initInfoBoard() {
        this.signContainer = new InfoBoardContainer(this, 0, 0);
    }

    private initGameBoard() {
        // set game bg
        this.shopBg = this.add.tileSprite(0, 0, getGameWidth(this), 438, "bg-shelf").setOrigin(0, 0);
        this.shopBg.scaleY = (getGameHeight(this)*0.5/438);
        this.floorBg = this.add.tileSprite(0, getGameHeight(this) * 0.5, getGameWidth(this), getGameHeight(this) * 0.25, "bg-floor").setOrigin(0, 0);
        const gameContainer = this.add.container(0, getGameHeight(this) * 0.25);
        gameContainer.add(this.shopBg);
        gameContainer.add(this.floorBg);
    }

    private initActor() {
        this.actorContainer = new ActorContainer(this, 0, getGameHeight(this)*0.8);
    }

    private prepareGame() {
        // first animation to start
        this.actorContainer.playAnimation("walk");
        const prepareTween = this.tweens.add({
            targets: this.actorContainer,
            x: getGameWidth(this)/2,
            duration: 1500,
            ease: 'Linear'
        });
        prepareTween.on("complete", () => {
            this.actorContainer.stopAnimation();
            this.actorContainer.setActorFrame("pause");
        }, this);

        // game title animation
        this.tweens.add({
            targets: this.gameTitle,
            x: this.gameTitle.width/1.5,
            y: this.gameTitle.height,
            duration: 1500,
            ease: 'Linear'
        });

    }

    private testGame() {

    }

    private startGame() {

    }
}