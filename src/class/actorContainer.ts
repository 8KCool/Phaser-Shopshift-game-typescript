
import { getGameWidth, getGameHeight } from '../helper';
import {Actor_Sprite_Key, Game_Sprite_Key} from '../const';

export class ActorContainer extends Phaser.GameObjects.Container {

    private actorSprite!: Phaser.GameObjects.Sprite;
    private bucketSprite!: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.initActorSprite();
        this.scene.add.existing(this);
    }

    private initActorSprite() {
        this.actorSprite = this.scene.add.sprite(0, -20, Actor_Sprite_Key).setOrigin(0.5, 0);
        this.actorSprite.setFrame("walk4");
        this.bucketSprite = this.scene.add.sprite(0, 0 + this.actorSprite.height / 2 - 27, Game_Sprite_Key).setOrigin(0.5, 0);
        this.bucketSprite.setFrame("bucket");
        this.add(this.actorSprite);
        this.add(this.bucketSprite);

        this.actorSprite.setX(-this.actorSprite.width/2.35);
        this.bucketSprite.setX(this.bucketSprite.width/2.35);
    }

    public playAnimation(key: string) {
        const animConfig = {
            key: key,
            frames: Actor_Sprite_Key,
            frameRate: 10,
            duration: 50,
            repeat: -1
        };
        this.actorSprite.anims.create(animConfig);
        // this.actorSprite = this.add.sprite(300, 300, "walkactor");
        this.actorSprite.play(key);
    }
}