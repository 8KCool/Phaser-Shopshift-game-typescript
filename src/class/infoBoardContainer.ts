
import { sign } from 'crypto';
import { getGameWidth, getGameHeight } from '../helper';
import { MatchValue, Game_Sprite_Key } from '../const';


export class InfoBoardContainer extends Phaser.GameObjects.Container {

    private signTitle!: Phaser.GameObjects.Text;
    private signImage!: Phaser.GameObjects.Sprite;
    private scoreValue!: Phaser.GameObjects.Text;
    private wallBg!: Phaser.GameObjects.TileSprite;

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
        this.wallBg = this.scene.add.tileSprite(0, 0, getGameWidth(this.scene), getGameHeight(this.scene) * 0.25, "bg-wall").setOrigin(0, 0);

        this.initSignPanel();
        this.initScorePanel();
    }

    // set sign panel
    private initSignPanel() {
        const signBg = this.scene.add.image(0, 0, "bg-sign").setOrigin(.5, 0);
        signBg.setPosition(getGameWidth(this.scene) / 2, 0);
        signBg.setDisplaySize(getGameWidth(this.scene) * 0.42 , getGameHeight(this.scene) * 0.225)
        this.signTitle = this.scene.add.text(getGameWidth(this.scene) * 0.44, this.wallBg.height *0.5, "")
            .setFontSize(30).setColor("#FFFFFF").setOrigin(.5, .5).setFontFamily("cursive");
        this.signTitle.setWordWrapWidth(420);

        
        this.signImage = this.scene.add.sprite(getGameWidth(this.scene) * 0.65, this.wallBg.height *0.5, Game_Sprite_Key, "orange")
            .setOrigin(.5, .5).setVisible(false);
        this.add(signBg);
        this.add(this.signTitle);
        this.add(this.signImage);
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

    public setSignImage(index: number) {
        // "Banana", "Egg", "Bread", "Juice", "Orange", "Pie", "Sqare", "Circle", "Pentagon", "Hexagon", "BHexagon"
        let signTextture = "";
        switch(index) {
            case MatchValue.Banana: signTextture = "banana"; break;
            case MatchValue.Egg: signTextture = "egg"; break;
            case MatchValue.Bread: signTextture = "bread"; break;
            case MatchValue.Juice: signTextture = "juice"; break;
            case MatchValue.Orange: signTextture = "orange"; break;
            case MatchValue.Pie: signTextture = "noodle"; break;
            case MatchValue.Sqare: signTextture = "rectangle"; break;
            case MatchValue.Circle: signTextture = "circle"; break;
            case MatchValue.Pentagon: signTextture = "pentagon"; break;
            case MatchValue.Hexagon: signTextture = "hexagon"; break;
            case MatchValue.BHexagon: signTextture = "b_hexagon"; break;
        }
        this.signImage.setFrame(signTextture);
        this.signImage.setVisible(true);
    }

    public setScoreValue(value: number) {
        this.scoreValue.setText(value.toString());
    }

    public getHeight() {
        return this.wallBg.height;
    }
}