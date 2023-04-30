
import { getGameWidth, getGameHeight } from '../helper';

export class InfoBoardContainer extends Phaser.GameObjects.Container {

    private signTitle!: Phaser.GameObjects.Text;
    private scoreValue!: Phaser.GameObjects.Text;

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

        this.initSignPanel();
        this.initScorePanel();
    }

    // set sign panel
    private initSignPanel() {
        const signBg = this.scene.add.image(0, 0, "bg-sign").setOrigin(.5, 0);
        signBg.setPosition(getGameWidth(this.scene) / 2, 0);
        this.signTitle = this.scene.add.text(getGameWidth(this.scene) / 2 - 100, 120, "Goal: Buy products that are on sale.")
            .setFontSize(30).setColor("#FFFFFF").setOrigin(.5, 0).setFontFamily("cursive");
        this.signTitle.setWordWrapWidth(420);
        this.add(signBg);
        this.add(this.signTitle);
    }

    private initScorePanel() {
        const container = this.scene.add.container(getGameWidth(this.scene) - 250, 0);
        const scoreBg = this.scene.add.rectangle(0, 0, 250, 50, 1, 0xfafafa).setOrigin(0, 0);
        container.add(scoreBg);

        const scoreTitle = this.scene.add.text(20, 10, "score:")
            .setFontSize(28).setColor("#000000").setOrigin(0, 0).setFontFamily("cursive");
        container.add(scoreTitle);

        this.scoreValue = this.scene.add.text(180, 12, "0")
            .setOrigin(1, 0).setFontSize(28).setColor("#7e2a86").setFontFamily("sursive").setFontStyle("bold");
        container.add(this.scoreValue);
        this.setScoreValue(0);
    }

    // change the text of the sign panel
    public setSignTitle(text: string) {
        this.signTitle.setText(text);
    }

    public setScoreValue(value: number) {
        this.scoreValue.setText(value.toString());
    }

}