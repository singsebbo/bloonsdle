import dartMonkey from "./assets/towerImages/dart-monkey.png";
import boomerangMonkey from "./assets/towerImages/boomerang-monkey.png";
import bombShooter from "./assets/towerImages/bomb-shooter.png";
import tackShooter from "./assets/towerImages/tack-shooter.png";
import iceMonkey from "./assets/towerImages/ice-monkey.png";
import glueGunner from "./assets/towerImages/glue-gunner.png";
import sniperMonkey from "./assets/towerImages/sniper-monkey.png";
import monkeySub from "./assets/towerImages/monkey-sub.png";
import monkeyBuccaneer from "./assets/towerImages/monkey-buccaneer.png";
import monkeyAce from "./assets/towerImages/monkey-ace.png";
import heliPilot from "./assets/towerImages/heli-pilot.png";
import mortarMonkey from "./assets/towerImages/mortar-monkey.png";
import dartlingGunner from "./assets/towerImages/dartling-gunner.png";
import wizardMonkey from "./assets/towerImages/wizard-monkey.png";
import superMonkey from "./assets/towerImages/super-monkey.png";
import ninjaMonkey from "./assets/towerImages/ninja-monkey.png";
import alchemist from "./assets/towerImages/alchemist.png";
import druid from "./assets/towerImages/druid.png";
import mermonkey from "./assets/towerImages/mermonkey.png";
import bananaFarm from "./assets/towerImages/banana-farm.png";
import spikeFactory from "./assets/towerImages/spike-factory.png";
import monkeyVillage from "./assets/towerImages/monkey-village.png";
import engineerMonkey from "./assets/towerImages/engineer-monkey.png";
import beastHandler from "./assets/towerImages/beast-handler.png";

export interface Suggestion {
  towerName: string;
  image: string;
  crosspath: string;
}

export const allSuggestions: Suggestion[] = [
  { towerName: "Dart Monkey", image: dartMonkey, crosspath: "0-0-0" },
  { towerName: "Boomerang Monkey", image: boomerangMonkey, crosspath: "0-0-0" },
  { towerName: "Bomb Shooter", image: bombShooter, crosspath: "0-0-0" },
  { towerName: "Tack Shooter", image: tackShooter, crosspath: "0-0-0" },
  { towerName: "Ice Monkey", image: iceMonkey, crosspath: "0-0-0" },
  { towerName: "Glue Gunner", image: glueGunner, crosspath: "0-0-0" },
  { towerName: "Sniper Monkey", image: sniperMonkey, crosspath: "0-0-0" },
  { towerName: "Monkey Sub", image: monkeySub, crosspath: "0-0-0" },
  { towerName: "Monkey Buccaneer", image: monkeyBuccaneer, crosspath: "0-0-0" },
  { towerName: "Monkey Ace", image: monkeyAce, crosspath: "0-0-0" },
  { towerName: "Heli Pilot", image: heliPilot, crosspath: "0-0-0" },
  { towerName: "Mortar Monkey", image: mortarMonkey, crosspath: "0-0-0" },
  { towerName: "Dartling Gunner", image: dartlingGunner, crosspath: "0-0-0" },
  { towerName: "Wizard Monkey", image: wizardMonkey, crosspath: "0-0-0" },
  { towerName: "Super Monkey", image: superMonkey, crosspath: "0-0-0" },
  { towerName: "Ninja Monkey", image: ninjaMonkey, crosspath: "0-0-0" },
  { towerName: "Alchemist", image: alchemist, crosspath: "0-0-0" },
  { towerName: "Druid", image: druid, crosspath: "0-0-0" },
  { towerName: "Mermonkey", image: mermonkey, crosspath: "0-0-0" },
  { towerName: "Banana Farm", image: bananaFarm, crosspath: "0-0-0" },
  { towerName: "Spike Factory", image: spikeFactory, crosspath: "0-0-0" },
  { towerName: "Monkey Village", image: monkeyVillage, crosspath: "0-0-0" },
  { towerName: "Engineer Monkey", image: engineerMonkey, crosspath: "0-0-0" },
  { towerName: "Beast Handler", image: beastHandler, crosspath: "0-0-0" },
];
