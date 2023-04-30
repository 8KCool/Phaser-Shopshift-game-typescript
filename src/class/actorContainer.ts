
import { getGameWidth, getGameHeight } from '../helper';
import {Actor_Sprite_Key, Game_Sprite_Key} from '../const';

export class ActorContainer extends Phaser.GameObjects.Container {

    private actorSprite!: Phaser.GameObjects.Sprite;
    private bucketSprite!: Phaser.GameObjects.Image;
    private actorState!: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.initActorSprite();
        this.scene.add.existing(this);
    }

    private initActorSprite() {
        this.actorSprite = this.scene.add.sprite(0, 0, Actor_Sprite_Key, "pause").setOrigin(0.5, 0);
        this.actorSprite.setY(this.actorSprite.y - this.actorSprite.height)
        this.bucketSprite = this.scene.add.sprite(0, this.actorSprite.height / 2 - this.actorSprite.height - 7, Game_Sprite_Key, "bucket").setOrigin(0.5, 0);
        this.add(this.actorSprite);
        this.add(this.bucketSprite);

        this.actorSprite.setX(-this.actorSprite.width/2.35);
        this.bucketSprite.setX(this.bucketSprite.width/2.35);
    }

    public setActorFrame(frame: string) {
        this.actorSprite.setFrame(frame);
    }

    public playAnimation(key: string) {
        this.actorSprite.play(key);
    }

    public stopAnimation() {
        this.actorSprite.stop();
    }
}