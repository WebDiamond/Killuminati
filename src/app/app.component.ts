import {Component, OnInit,} from '@angular/core';
import {StorageMap} from "@ngx-pwa/local-storage";
import {RankModel} from "./services/local/models/rank";
import {GameplayModel} from "./services/local/models/gameplay";
import {JoypadModel} from "./services/local/models/joypad";
import {BestscoreModel} from "./services/local/models/bestscore";
import {RankService} from "./services/local/extensions/rank.service";
import {JoypadService} from "./services/local/extensions/joypad.service";
import {GameplayService} from "./services/local/extensions/gameplay.service";
import {BestscoreService} from "./services/local/extensions/bestscore.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  public title: string = 'killuminatipwa';

  static BestscoreValue: BestscoreModel;
  static RankValue: RankModel;
  static GameplayValue: GameplayModel;
  static JoypadValue: JoypadModel;
  constructor(private storage: StorageMap,
              private gameplayService: GameplayService,
              private rankService: RankService,
              private joypadService: JoypadService,
              private bestscoreService: BestscoreService) {
  }
  ngOnInit() {
    let initrank = {
      name: '',
      points: 0
    };
    let initconfig = {
      last: 0,
      required:  0,
      score: 0,
      total: 0,
      elapsedTime: 0,
    };
    let initpad = {
      ctrl_up: 0,
      ctrl_down:  0,
      ctrl_fire: 0,
    };
    this.joypadService.add(AppComponent.JoypadValue);
    this.joypadService.set(initpad);
    this.rankService.add(AppComponent.RankValue);
    this.rankService.set(initrank);
    this.gameplayService.add(AppComponent.GameplayValue);
    this.gameplayService.set(initconfig);

    }



}
