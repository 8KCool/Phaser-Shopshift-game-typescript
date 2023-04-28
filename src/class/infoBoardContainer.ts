
import { getGameWidth, getGameHeight } from '../helper';

export class InfoBoardContainer extends Phaser.GameObjects.Container {

    private signBg!: Phaser.GameObjects.Image;
    private signTitle!: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;
        
        this.initBoardContainer();
        
        this.scene.add.existing(this);
    }

    private initBoardContainer() {
        // set info bg
        const wallBg = this.scene.add.tileSprite(0, 0, getGameWidth(this.scene), getGameHeight(this.scene) * 0.3, "bg-wall").setOrigin(0, 0);

        // set sign panel
        this.signBg = this.scene.add.image(0, 0, "bg-sign").setOrigin(0, 0);
        this.signTitle = this.scene.add.text(50, 120, "Goal: Buy products that are on sale.")
            .setFontSize(30).setColor("#FFFFFF").setOrigin(0, 0).setFontFamily("cursive");
        this.signTitle.setWordWrapWidth(420);
        this.add(this.signBg);
        this.add(this.signTitle);
        this.x = getGameWidth(this.scene) / 2 - this.signBg.width / 2;
        this.y = 0;
    }

}