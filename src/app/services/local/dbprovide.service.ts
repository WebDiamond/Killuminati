import {Injectable} from '@angular/core';
import {BestscoreModel} from "@src/app/services/local/models/bestscore";
import {RankModel} from "@src/app/services/local/models/rank";
import {StorageMap} from "@ngx-pwa/local-storage";
import {RankService} from "@src/app/services/local/extensions/rank.service";
import {BestscoreService} from "@src/app/services/local/extensions/bestscore.service";

@Injectable({
  providedIn: 'root'
})
export class DbprovideService {

  public BestscoreValue: BestscoreModel;
  public RankValue: RankModel;

  constructor(
    private storage: StorageMap,
    private rankService: RankService,
    private bestscoreService: BestscoreService) {

  }

  public load(): void{
    let initrank = {
      name: '',
      points: 0,
    };
    let initbestscore ={
      highscore:0
    };

    this.bestscoreService.add(this.BestscoreValue);
    this.bestscoreService.set(initbestscore);
    this.rankService.add(this.RankValue);
    this.rankService.set(initrank);
  }
}
