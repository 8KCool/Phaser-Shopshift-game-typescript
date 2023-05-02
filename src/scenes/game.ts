import { Scene } from 'phaser';
import { getGameWidth, getGameHeight, getRandomInt, getGoodFrameName } from '../helper';
import { InfoBoardContainer } from '../class/infoBoardContainer';
import { ActorContainer } from '../class/actorContainer';
import { Actor_Sprite_Key, Game_Sprite_Key, TestGameString, GameStateArray, TestGameValue, MatchValue } from '../const';


export class GameScene extends Scene {

    private gameTitle!: Phaser.GameObjects.Text;
    private shopBg!: Phaser.GameObjects.TileSprite;
    private floorBg!: Phaser.GameObjects.TileSprite;
    private signContainer!: InfoBoardContainer;
    private actorContainer!: ActorContainer;

    private goodSprite!: Phaser.GameObjects.Sprite;
    private typeSprite!: Phaser.GameObjects.Sprite;
    private mGoodContainer!: Phaser.GameObjects.Container;
    private goodAnimTween!: Phaser.Tweens.Tween;


    // button
    private continueButton!: Phaser.GameObjects.Text;
    private buyButton!: Phaser.GameObjects.Text;
    private notbuyButton!: Phaser.GameObjects.Text;

    // game logic
    private mCurrentGameState = GameStateArray.Loading;
    private mTestGamePoint = 0;
    private mTestGameScore = 0;
    private mCurrentGameValue!: number;
    private mCurrentGoodNumber!: number;
    private mCurrentTypeNumber!: number;

    private GoodsInterval!: any;
    private BackInterval!: any;

    constructor() {
        super('game-scene');
    }

    create(): void {
        this.initGameAnimate();
        this.initBoard();
        this.initActor();
        this.prepareGame();
        // this.startGame();
    }

    update(): void {
        // this.startBgAnimation();
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
        this.gameTitle = this.add.text(getGameWidth(this) / 2, getGameHeight(this) / 2, "Instruction")
            .setFontSize(40).setColor("#000000").setOrigin(.5, .5).setFontFamily("cursive").setFontStyle("bold");
    }

    private initInfoBoard() {
        this.signContainer = new InfoBoardContainer(this, 0, 0);
    }

    private initGameBoard() {
        // set game bg
        this.shopBg = this.add.tileSprite(0, 0, getGameWidth(this), 438, "bg-shelf").setOrigin(0, 0);
        this.shopBg.scaleY = (getGameHeight(this) * 0.5 / 438);
        this.floorBg = this.add.tileSprite(0, getGameHeight(this) * 0.5, getGameWidth(this), getGameHeight(this) * 0.25, "bg-floor").setOrigin(0, 0);

        const gameContainer = this.add.container(0, getGameHeight(this) * 0.25);
        gameContainer.add(this.shopBg);
        gameContainer.add(this.floorBg);

        this.typeSprite = this.add.sprite(0, 5, Game_Sprite_Key, "circle");
        this.goodSprite = this.add.sprite(0, 0, Game_Sprite_Key, "orange").setScale(0.7);

        this.mGoodContainer = this.add.container(getGameWidth(this) * 1.1, getGameHeight(this) / 2);
        this.mGoodContainer.add(this.typeSprite);
        this.mGoodContainer.add(this.goodSprite);

        this.continueButton = this.add.text(getGameWidth(this) / 2, getGameHeight(this) * 0.9, 'Continue')
            .setOrigin(0.5)
            .setPadding(40, 20, 40, 20)
            .setFontSize(36)
            .setStyle({ backgroundColor: '#43b749' })
            .setInteractive({ useHandCursor: true })
            .setVisible(false)
            .on('pointerdown', this.testGame, this)
            .on('pointerover', () => this.continueButton.setStyle({ fill: '#CCC' }))
            .on('pointerout', () => this.continueButton.setStyle({ fill: '#FFF' }));


        this.notbuyButton = this.add.text(getGameWidth(this) * 0.4, getGameHeight(this) * 0.9, "Don't Buy")
            .setOrigin(0.5)
            .setPadding(40, 20, 40, 20)
            .setFontSize(36)
            .setStyle({ backgroundColor: '#d54040' })
            .setInteractive({ useHandCursor: true })
            .setVisible(false)
            .on('pointerdown', this.checkGameValueFalse, this)
            .on('pointerover', () => this.continueButton.setStyle({ fill: '#CCC' }))
            .on('pointerout', () => this.continueButton.setStyle({ fill: '#FFF' }));


        this.buyButton = this.add.text(getGameWidth(this) * 0.6, getGameHeight(this) * 0.9, 'Buy')
            .setOrigin(0.5)
            .setPadding(40, 20, 40, 20)
            .setFontSize(36)
            .setStyle({ backgroundColor: '#43b749' })
            .setInteractive({ useHandCursor: true })
            .setVisible(false)
            .on('pointerdown', this.checkGameValueTrue, this)
            .on('pointerover', () => this.continueButton.setStyle({ fill: '#CCC' }))
            .on('pointerout', () => this.continueButton.setStyle({ fill: '#FFF' }));
    }

    private showBtnPlayGroup(flag: boolean) {
        this.continueButton.setVisible(!flag);
        this.notbuyButton.setVisible(flag);
        this.buyButton.setVisible(flag);
    }

    private initActor() {
        this.actorContainer = new ActorContainer(this, 0, getGameHeight(this) * 0.8);
    }

    private startBgAnimation() {
        this.BackInterval = setInterval(() => {
            if (this.mCurrentGameState == GameStateArray.PlayTest) {
                this.shopBg.tilePositionX += 4 * (this.actorContainer.getActorState() + 1);
                this.floorBg.tilePositionX += 4 * (this.actorContainer.getActorState() + 1);
            }
        }, 10)
    }

    private setSignText(title: string) {
        this.signContainer.setSignTitle(title);
    }

    private setSignImage(index: number) {
        this.signContainer.setSignImage(index);
    }

    private prepareGame() {
        // first animation to start
        this.actorContainer.playAnimation("walk");
        const prepareTween = this.tweens.add({
            targets: this.actorContainer,
            x: getGameWidth(this) / 2,
            duration: 1500,
            ease: 'Linear'
        });
        prepareTween.on("complete", () => {
            this.continueButton.setVisible(true);
            this.actorContainer.stopAnimation();
            this.actorContainer.setActorFrame("pause.png");
            this.signContainer.setSignTitle("Goal: Buy products that are on sale");
            this.mCurrentGameState = GameStateArray.FinishLoading;
        }, this);

        // game title animation
        this.tweens.add({
            targets: this.gameTitle,
            x: this.gameTitle.width / 1.5,
            y: this.gameTitle.height,
            duration: 1500,
            ease: 'Linear'
        });

        this.mTestGamePoint = 0;
    }

    private testGame() {
        if (this.mTestGamePoint < TestGameString.length && (this.mCurrentGameState == GameStateArray.FinishLoading || this.mCurrentGameState == GameStateArray.Inittest)) {
            this.mCurrentGameState = GameStateArray.Inittest;
            let signStr = TestGameString[this.mTestGamePoint];
            this.setSignText(signStr);
            this.setSignImage(TestGameValue[this.mTestGamePoint]);
            this.mTestGamePoint++;
        }
        else if (this.mTestGamePoint == TestGameString.length && this.mCurrentGameState == GameStateArray.Inittest) {
            this.mCurrentGameState = GameStateArray.PlayTest;
            this.startTestGame();
        }
    }

    private startTestGame() {
        this.startBgAnimation();
        this.showBtnPlayGroup(true);
        this.actorContainer.playAnimation("walk");

        this.makeOnePlay();

    }

    private startGame() {

    }

    /**
     * the single game logic
    */
    private makeOnePlay() {
        this.mCurrentGameValue = getRandomInt(11);   // sign number
        this.mCurrentGoodNumber = getRandomInt(6);   // good number (orange...)
        this.mCurrentTypeNumber = getRandomInt(5) + 6;   // good type number  (circle ...)
        this.setSignImage(this.mCurrentGameValue);
        this.makeGoodAnimation(this.mCurrentGoodNumber, this.mCurrentTypeNumber);
    }

    private makeGoodAnimation(goodNumber: number, typeNumber: number) {
        this.goodSprite.setFrame(getGoodFrameName(goodNumber));
        this.typeSprite.setFrame(getGoodFrameName(typeNumber));
        this.GoodsInterval = setInterval(() => {
            this.mGoodContainer.setX(this.mGoodContainer.x - (4 * (this.actorContainer.getActorState() + 1)));
            if (this.mGoodContainer.x <= getGameWidth(this) * 0.1) {
                // this.mGoodContainer.setX(getGameWidth(this)*1.1);
                // if(this.mCurrentGameState == GameStateArray.PlayTest) {
                //     this.mCurrentGameState = GameStateArray.Inittest;
                //     // this.stopPlayingGame();
                //     // this.showBtnPlayGroup(false);
                //     this.setWrongResult();
                // }
                this.setWrongResult();
            }
        }, 10)
    }

    private stopPlayingGame() {
        clearInterval(this.GoodsInterval);
        clearInterval(this.BackInterval);
        this.actorContainer.stopAnimation();
    }

    private checkGameValueTrue() {
        var result = this.checkCurrentState();
        if (result == true) {
            // okay
            alert("okay");
        }
        else {
            // false
            // alert("false")
            this.setWrongResult();
        }
    }

    private checkGameValueFalse() {
        var result = this.checkCurrentState();
        if (result == true) {
            // false
            // alert("false")
            this.setWrongResult();
        }
        else {
            // true
            alert("okay")
        }
    }

    private checkCurrentState() {
        if (this.mCurrentGameValue == this.mCurrentGoodNumber || this.mCurrentGameValue == this.mCurrentTypeNumber)
            return true;
        return false;
    }

    private setWrongResult() {
        this.mGoodContainer.setX(getGameWidth(this) * 1.1);
        if (this.mCurrentGameState == GameStateArray.PlayTest) {
            this.mCurrentGameState = GameStateArray.Inittest;
            this.stopPlayingGame();
            this.showBtnPlayGroup(false);
            this.mTestGameScore = 0;
        }
    }
    private setTrueResult() {
        this.mGoodContainer.setX(getGameWidth(this) * 1.1);
        if (this.mCurrentGameState == GameStateArray.PlayTest) {
            this.mTestGameScore ++;
            if(this.mTestGameScore == 5) {
                this.mCurrentGameState = GameStateArray.FinishTest;
                this.finishTest();
            }
        }
    }
}