import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ReadCSVService } from './services/read-csv.service';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  lati = 13.78911167;
  lngi = 100.60405;
  markers;
  lat;
  lng;
  getData=true;
  interval;
  i=-1;
  x1=2000;
  x2=200;
  speed=this.x1;

  constructor( private ReadCSV:ReadCSVService) { }

  ngOnInit(): void { }

  @ViewChild('fileImportInput') fileImportInput: any;


  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
    this.ReadCSV.readCSV(files);
  }

  plotOnMaps() {
    this.interval= setInterval(()=>{
     this.i=this.i+1
      this.ReadCSV.getLocation(this.i).subscribe((res)=>{
        if(res!=undefined) {
          this.markers=res;
          this.lat=res['lat'];
          this.lng=res['lng'];
        } else {
          this.stopInterval();
        }
      })
    },this.speed);
  }

  stopInterval() {
    clearInterval(this.interval);
  }

  stopPlot() {
    this.stopInterval();
  }

  stepUp() {
    this.stopInterval();
    this.speed=this.x2;
    this.plotOnMaps();
  }

  stepDown() {
    this.stopInterval();
    this.speed=this.x1;
    this.plotOnMaps();
  }

}

