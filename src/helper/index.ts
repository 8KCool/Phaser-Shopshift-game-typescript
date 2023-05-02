import * as Phaser from 'phaser';
import { MatchValue, Game_Sprite_Key } from '../const';

export const getGameWidth = (scene: Phaser.Scene): number => {
  return scene.game.scale.width;
};

export const getGameHeight = (scene: Phaser.Scene): number => {
  return scene.game.scale.height;
};

export const getRandomInt = (value: number): number => {
  return Math.floor(Math.random() * value);
}

export const getGoodFrameName = (value: number): string => {
  let signTextture = "";
  switch (value) {
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

  return signTextture;
}