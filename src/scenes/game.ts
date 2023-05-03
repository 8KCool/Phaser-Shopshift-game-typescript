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
    private resultGoodSprite!: Phaser.GameObjects.Sprite;
    private mGoodContainer!: Phaser.GameObjects.Container;

    private goodAnimTween!: Phaser.Tweens.Tween;


    // button
    private continueButton!: Phaser.GameObjects.Text;
    private buyButton!: Phaser.GameObjects.Text;
    private notbuyButton!: Phaser.GameObjects.Text;
    private startButton!: Phaser.GameObjects.Text;

    // game logic
    private mCurrentGameState = GameStateArray.Loading;
    private mTestGamePoint = 0;
    private mTestGameScore = 0;
    private mGameScore = 0;
    private mTotalHitCount = 0;
    private mCurrentGameValue!: number;
    private mCurrentGoodNumber!: number;
    private mCurrentTypeNumber!: number;
    private mGoodCheckState = false;

    private GoodsInterval!: any;
    private BackInterval!: any;

    constructor() {
        super('game-scene');
    }

    create(): void {
        this.initAudio();
        this.initGameAnimate();
        this.initBoard();
        this.initActor();
        this.prepareGame();
        // this.startGame();
    }

    update(): void {
        // this.startBgAnimation();
    }

    private initAudio() {
        this.sound.add("bell");
        this.sound.add("positive");
        this.sound.add("sndSuccess");
        this.sound.add("sndWrong");
    }

    private initGameAnimate() {
        var walkAnim = this.anims.generateFrameNames(Actor_Sprite_Key, {
            start: 1, end: 9,
            prefix: 'walk_', suffix: '.png'
        });
        this.anims.create({ key: "walk", frames: walkAnim, frameRate: 10, repeat: -1 });

        var runAnim = this.anims.generateFrameNames(Actor_Sprite_Key, {
            start: 1, end: 9,
            prefix: 'run_', suffix: '.png'
        });
        this.anims.create({ key: "run", frames: runAnim, frameRate: 10, repeat: -1 });


        var runAnim = this.anims.generateFrameNames(Actor_Sprite_Key, {
            start: 1, end: 6,
            prefix: 'ride_', suffix: '.png'
        });
        this.anims.create({ key: "ride", frames: runAnim, frameRate: 10, repeat: -1 });

        var runAnim = this.anims.generateFrameNames(Actor_Sprite_Key, {
            start: 1, end: 4,
            prefix: 'fly_', suffix: '.png'
        });
        this.anims.create({ key: "fly", frames: runAnim, frameRate: 10, repeat: -1 });
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

        this.typeSprite = this.add.sprite(0, 5, Game_Sprite_Key, "circle").setScale(1.4);
        this.goodSprite = this.add.sprite(0, 0, Game_Sprite_Key, "orange").setScale(0.9);
        this.resultGoodSprite = this.add.sprite(0, 0, Game_Sprite_Key, "hudTick").setVisible(false).setScale(0.5);

        this.mGoodContainer = this.add.container(getGameWidth(this) * 1.1, getGameHeight(this) / 2);
        this.mGoodContainer.add(this.typeSprite);
        this.mGoodContainer.add(this.goodSprite);
        this.mGoodContainer.add(this.resultGoodSprite);


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

        this.startButton = this.add.text(getGameWidth(this) / 2, getGameHeight(this) * 0.9, 'Start Game')
            .setOrigin(0.5)
            .setPadding(40, 20, 40, 20)
            .setFontSize(36)
            .setStyle({ backgroundColor: '#43b749' })
            .setInteractive({ useHandCursor: true })
            .setVisible(false)
            .on('pointerdown', this.startRealGame, this)
            .on('pointerover', () => this.continueButton.setStyle({ fill: '#CCC' }))
            .on('pointerout', () => this.continueButton.setStyle({ fill: '#FFF' }));
    }

    private showBtnPlayGroup(flag: boolean) {
        this.continueButton.setVisible(!flag);
        this.notbuyButton.setVisible(flag);
        this.buyButton.setVisible(flag);
        this.startButton.setVisible(false);
    }

    private showStartButton() {
        this.continueButton.setVisible(false);
        this.notbuyButton.setVisible(false);
        this.buyButton.setVisible(false);
        this.startButton.setVisible(true);
    }

    private hideAllButton() {
        this.continueButton.setVisible(false);
        this.notbuyButton.setVisible(false);
        this.buyButton.setVisible(false);
        this.startButton.setVisible(false);
    }

    private initActor() {
        this.actorContainer = new ActorContainer(this, 0, getGameHeight(this) * 0.8);
    }

    private startBgAnimation() {
        clearInterval(this.BackInterval);
        this.BackInterval = setInterval(() => {
            if (this.mCurrentGameState == GameStateArray.PlayTest
                || this.mCurrentGameState == GameStateArray.FinishTest
                || this.mCurrentGameState == GameStateArray.PlayingGame) {
                this.shopBg.tilePositionX += 2 * this.actorContainer.getActorSpeed();
                this.floorBg.tilePositionX += 2 * this.actorContainer.getActorSpeed();
                console.log(this.actorContainer.getActorSpeed());
            }
        }, 5)
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

    private prepareStartGame() {
        // first animation to start
        this.hideAllButton();
        this.actorContainer.playAnimation("walk");
        this.actorContainer.setX(0);

        const prepareTween = this.tweens.add({
            targets: this.actorContainer,
            x: getGameWidth(this) / 2,
            duration: 1500,
            ease: 'Linear'
        });
        prepareTween.on("complete", () => {
            this.showStartButton();
        }, this);

        // game title animation
        this.tweens.add({
            targets: this.gameTitle,
            x: this.gameTitle.width / 1.5,
            y: this.gameTitle.height,
            duration: 1500,
            ease: 'Linear'
        });

    }

    private testGame() {
        if (this.mTestGamePoint < TestGameString.length && (this.mCurrentGameState == GameStateArray.FinishLoading || this.mCurrentGameState == GameStateArray.Inittest)) {
            this.mCurrentGameState = GameStateArray.Inittest;
            let signStr = TestGameString[this.mTestGamePoint];
            this.setSignText(signStr);
            this.setSignImage(TestGameValue[this.mTestGamePoint]);
            this.sound.stopAll();
            this.sound.play('bell');
            this.mTestGamePoint++;
        }
        else if (this.mTestGamePoint == TestGameString.length && this.mCurrentGameState == GameStateArray.Inittest) {
            this.mCurrentGameState = GameStateArray.PlayTest;
            this.startTestGame();
        }
    }

    /**
     * the single game logic
    */
    private startTestGame() {
        this.startBgAnimation();
        this.showBtnPlayGroup(true);
        this.setSignText("Try it now.");
        this.actorContainer.playAnimation("walk");

        this.initNewGood();
        this.makeGoodAnimation();
    }

    private makeGoodFrame(goodNumber: number, typeNumber: number) {
        this.goodSprite.setFrame(getGoodFrameName(goodNumber));
        this.typeSprite.setFrame(getGoodFrameName(typeNumber));
    }

    private makeGoodAnimation() {
        clearInterval(this.GoodsInterval)
        this.GoodsInterval = setInterval(() => {
            this.mGoodContainer.setX(this.mGoodContainer.x - 2 * this.actorContainer.getActorSpeed());
            if (this.mGoodContainer.x <= getGameWidth(this) * 0.1 && !this.mGoodCheckState) {
                this.setWrongResult();
            }
        }, 5)
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
            this.setTrueResult();
        }
        else {
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
            this.setTrueResult();
        }
    }

    private checkCurrentState() {
        if (this.mCurrentGameValue == this.mCurrentGoodNumber || this.mCurrentGameValue == this.mCurrentTypeNumber)
            return true;
        return false;
    }

    private setWrongResult() {
        this.mGoodCheckState = true;
        if (this.mCurrentGameState == GameStateArray.PlayTest) {  // false
            this.mCurrentGameState = GameStateArray.Inittest;
            this.stopPlayingGame();
            this.showBtnPlayGroup(false);
            this.mTestGameScore = 0;
            // show the sign result
            var str = "";
            if (this.mCurrentGameValue <= MatchValue.Pie) {
                str = "The " + getGoodFrameName(this.mCurrentGoodNumber) + " are currently not on sale, you should not have bought them.";
            } else {
                str = getGoodFrameName(this.mCurrentGameValue) + " packaging is currently on sale, you should have bought the product.";
            }
            this.setSignText(str);
            this.resultHideGood("false", this.initNewOnlyGood);
        }
        else if (this.mCurrentGameState == GameStateArray.PlayingGame) {
            this.setSignText("DISCOUNT");
            this.resultHideGood("false", this.initNewGood);
        }
    }
    private setTrueResult() {
        this.mGoodCheckState = true;
        if (this.mCurrentGameState == GameStateArray.PlayTest) {
            // show the sign result
            this.setSignText("Well done!");
            this.mTestGameScore++;
            if (this.mTestGameScore == 5) {
                this.mCurrentGameState = GameStateArray.FinishTest;
                this.resultHideGood("true", this.finishTest);
            }
            else {
                this.resultHideGood("true", this.initNewGood);
            }
        }
        else if (this.mCurrentGameState == GameStateArray.PlayingGame) {
            this.mTotalHitCount++;
            this.actorContainer.increaseActorSpeed(this.mTotalHitCount);
            this.mGameScore += (this.actorContainer.getActorSpeed() - 1) / 0.2 * 2 + 6;
            this.signContainer.setScoreValue(this.mGameScore);
            this.resultHideGood("true", this.initNewGood);
        }
    }

    private initNewGood(context?: any) {
        if (!context) {
            context = this;
        }
        context.initnewGameValue(context);
        context.initNewOnlyGood(context);
    }
    private initnewGameValue(context?: any) {
        if (!context) {
            context = this;
        }
        this.sound.stopAll();
        this.sound.play('bell');
        context.mCurrentGameValue = getRandomInt(11);   // sign number
        context.setSignImage(context.mCurrentGameValue);
    }

    private initNewOnlyGood(context?: any) {
        if (!context) {
            context = this;
        }
        context.mGoodCheckState = false;
        context.mGoodContainer.setX(getGameWidth(context) * 1.1);
        context.resultGoodSprite.setVisible(false);
        context.mGoodContainer.setAlpha(1);
        context.mCurrentGoodNumber = getRandomInt(6);   // good number (orange...)
        context.mCurrentTypeNumber = getRandomInt(5) + 6;   // good type number  (circle ...)
        context.makeGoodFrame(context.mCurrentGoodNumber, context.mCurrentTypeNumber);
    }


    private resultHideGood(result: string, func: any) {
        if (result == "true") {
            this.resultGoodSprite.setVisible(true);
            this.resultGoodSprite.setFrame("hudTick");
            this.sound.stopAll();
            this.sound.play("sndSuccess");
        } else if (result == "false") {
            this.resultGoodSprite.setVisible(true);
            this.resultGoodSprite.setFrame("hudCross");
            this.sound.stopAll();
            this.sound.play("sndWrong");
        }

        const hideTween = this.tweens.add({
            targets: this.mGoodContainer,
            alpha: 0,
            duration: 500,
            ease: 'Linear'
        });

        hideTween.on("complete", () => {
            func(this);
        }, this);
    }

    private finishTest(context?: any) {
        if (!context) {
            context = this;
        }
        context.mGoodCheckState = false;
        context.setSignText("Shopshift improves: flexibility, task switching and concentration.");
        clearInterval(context.GoodsInterval);
        // prepare start game
        context.prepareStartGame();
    }

    private startRealGame() {
        this.setSignText("Have fun!");
        this.mCurrentGameState = GameStateArray.PlayingGame;
        this.startBgAnimation();
        this.showBtnPlayGroup(true);
        this.actorContainer.playAnimation("walk");
        this.initNewGood();
        this.makeGoodAnimation();
    }
}