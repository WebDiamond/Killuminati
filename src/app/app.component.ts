import {Component, OnInit,} from '@angular/core';
import {DbprovideService} from "@src/app/services/local/dbprovide.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public title: string = 'killuminatipwa';

  constructor(private dbprovide: DbprovideService) {}

  ngOnInit() {
   this.dbprovide.load();
  }



}
