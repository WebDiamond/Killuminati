import {Injectable} from '@angular/core';
import {BestscoreModel} from "@src/app/services/local/models/bestscore";
import {RankModel} from "@src/app/services/local/models/rank";
import {GameplayModel} from "@src/app/services/local/models/gameplay";
import {JoypadModel} from "@src/app/services/local/models/joypad";
import {StorageMap} from "@ngx-pwa/local-storage";
import {GameplayService} from "@src/app/services/local/extensions/gameplay.service";
import {RankService} from "@src/app/services/local/extensions/rank.service";
import {JoypadService} from "@src/app/services/local/extensions/joypad.service";
import {BestscoreService} from "@src/app/services/local/extensions/bestscore.service";

@Injectable({
  providedIn: 'root'
})
export class DbprovideService {

  public BestscoreValue: BestscoreModel;
  public RankValue: RankModel;
  public GameplayValue: GameplayModel;
  public JoypadValue: JoypadModel;

  constructor(
    private storage: StorageMap,
    private gameplayService: GameplayService,
    private rankService: RankService,
    private joypadService: JoypadService,
    private bestscoreService: BestscoreService) {

  }

  public load(): void{
    let initrank = {
      name: '',
      points: 0,
    };
    let initconfig = {
      last: 0,
      required:  0,
      score: 0,
      total: 0,
      elapsedTime: 0,
    };
    let initpad: JoypadModel = {
      ctrl_up: 0,
      ctrl_down:  0,
      ctrl_fire: 0,
    };
    let initbestscore ={
      highscore:0
    };

    this.bestscoreService.add(this.BestscoreValue);
    this.bestscoreService.set(initbestscore);
    this.joypadService.add(this.JoypadValue);
    this.joypadService.set(initpad);
    this.rankService.add(this.RankValue);
    this.rankService.set(initrank);
    this.gameplayService.add(this.GameplayValue);
    this.gameplayService.set(initconfig);
  }
}
