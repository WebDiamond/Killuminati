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
import {AuthService, User} from "@src/app/services/auth/auth.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentUser: User;
  public title: string = 'killuminatipwa';
  public BestscoreValue: BestscoreModel;
  public RankValue: RankModel;
  public GameplayValue: GameplayModel;
  public JoypadValue: JoypadModel;
  myStyle: Object = {};
  myParams: Object = {};
  width: number = 100;
  height: number = 100;
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private storage: StorageMap,
              private gameplayService: GameplayService,
              private rankService: RankService,
              private joypadService: JoypadService,
              private bestscoreService: BestscoreService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit() {
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': 3,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
      'display': 'block'
    };
    this.myParams = {
      particles: {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        color: {
          value: '#82fffd'
        },
        shape: {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        opacity: {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        size: {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        line_linked: {
          "enable": true,
          "distance": 150,
          "color": "#2c95ff",
          "opacity": 0.4,
          "width": 1
        },
        move: {
          "enable": true,
          "speed": 6,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        },
        interactivity: {

          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
            },

            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },

          modes: {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },

      }
    };
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
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }


}
