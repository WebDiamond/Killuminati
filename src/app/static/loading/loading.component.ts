import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  public static instance;
  public  isLoaderVisible: boolean = false;
  private timer;
  private maxtimeoutTimer;
  private maxTimeout = 20 * 1000; //20 sec
  private waitTimeout = 1.5 * 1000; //1500ms
  isTimeExceeded: boolean = false;
  isLoaderOnWait: boolean = false;


  constructor() {
    LoadingComponent.instance = this;
  }

  public show(){this.setVisibility(true)}
  public hide(){this.setVisibility(false)}

  private setVisibility(value: boolean){
    /** imposto l'attesa a 500ms solo se faccio visualizzare il caricamento, altrimento la sua rimozione è immediata */
    let time = value?this.waitTimeout:0;
    /** dissocio il timer se mentre aspettavo i 500ms è stata dismessa la modal */
    if(!value){
      this.isTimeExceeded = false;
      this.isLoaderOnWait = false;
      clearInterval(this.timer);
    }else{
      this.isLoaderOnWait = true;
    }
    this.timer = setInterval(()=>{
      this.isLoaderVisible = value;
      clearInterval(this.timer);
    }, time)

    //todo capire cosa fare con il timeout timer
    if(false) {
      this.maxtimeoutTimer = setInterval(() => {
        this.isTimeExceeded = true;
      }, this.maxTimeout)
    }
  }

  ngOnInit() {
  }

  abortLoading() {
    LoadingComponent.instance.hide();
  }
}
