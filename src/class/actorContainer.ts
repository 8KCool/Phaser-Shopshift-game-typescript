
import { getGameWidth, getGameHeight } from '../helper';
import { Actor_Sprite_Key, Game_Sprite_Key, ActorState } from '../const';

export class ActorContainer extends Phaser.GameObjects.Container {

    private actorSprite!: Phaser.GameObjects.Sprite;
    private bucketSprite!: Phaser.GameObjects.Image;
    private actorState = ActorState.WALK;
    private actorSpeed = 1;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.initActorSprite();
        this.scene.add.existing(this);
    }

    private initActorSprite() {
        this.actorSprite = this.scene.add.sprite(0, 0, Actor_Sprite_Key, "pause.png").setOrigin(1, 1);
        this.bucketSprite = this.scene.add.sprite(0, 0, Game_Sprite_Key, "bucket").setOrigin(0, 1);
        this.add(this.actorSprite);
        this.add(this.bucketSprite);
        this.actorSprite.setX(this.actorSprite.width * 0.15);
        this.actorState = ActorState.WALK;
    }

    public setActorFrame(frame: string) {
        this.actorSprite.setFrame(frame);
        this.actorSprite.setX(this.actorSprite.width * 0.15);
    }

    public playAnimation(key: string) {
        this.actorSprite.play(key);
        if (key == "walk") {
            this.actorSprite.setX(this.actorSprite.width * 0.15);
            this.actorSprite.setY(0);
        }
        else if (key == "run") {
            this.actorSprite.setX(this.actorSprite.width * 0.4);
            this.actorSprite.setY(0);
        }
        else if (key == "ride") {
            this.actorSprite.setX(this.actorSprite.width * 0.55);
            this.actorSprite.setY(-this.actorSprite.height * 0.2);
        }
        else if (key == "fly") {
            this.actorSprite.setX(this.actorSprite.width * 0.15);
            this.actorSprite.setY(-this.actorSprite.height * 0.75);
        }
    }

    public stopAnimation() {
        this.actorSprite.stop();
        this.actorSprite.setFrame("pause.png");
    }

    public getActorState() {
        return this.actorState;
    }

    public setActorState() {
        if (this.actorSpeed < 1.5) {
            // walk
            this.actorState = ActorState.WALK;
            this.playAnimation("walk");
        }
        else if (this.actorSpeed < 2.5) {
            // run
            this.actorState = ActorState.RUN;
            this.playAnimation("run");
        }
        else if (this.actorSpeed < 4) {
            // ride
            this.actorState = ActorState.RIDE;
            this.playAnimation("ride");
        }
        else {
            // fly
            this.actorState = ActorState.FLY;
            this.playAnimation("fly");
        }
    }

    public getActorSpeed() {
        return this.actorSpeed;
    }

    public setActorSpeed(speed: number) {
        this.actorSpeed = speed;
        this.setActorState();
        return this.actorSpeed;
    }

    public increaseActorSpeed(count: number) {

        if (count <= 3) {
            this.actorSpeed = 1;
        }
        else if (count <= 6) {
            this.actorSpeed = 1.3;
        }
        else if (count <= 10) {
            this.actorSpeed = 1.7;
        }
        else {
            this.actorSpeed = 1.7 + Math.ceil((count - 10) / 5) * 0.3;
        }
        this.setActorState();
        return this.actorSpeed;
    }

    public getCurrentScoreHint(count: number) {
        if (count <= 6) {
            return 6;
        }
        else if (count <= 10) {
            return 10;
        }
        else {
            return 10 + Math.round((this.actorSpeed - 1.7) / 0.3 * 4);
        }
    }

    public decreaseTotalScore(count: number) {
        if (count <= 10)
            return 6;
        else
            count = count - 4;

        if (count < 6)
            return 6;
        return count;
    }


}