import { Injectable } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser'
import { NgxCSVParserError } from 'ngx-csv-parser';
import { Observable, of } from 'rxjs';
import { INFO } from '../info'

@Injectable({
  providedIn: 'root'
})
export class ReadCSVService {

  csvRecords: any[] = [];
  header: boolean = false;
  location:INFO[]=[];

  constructor(private ngxCsvParser: NgxCsvParser) { }

  readCSV(File) {
    const files = File;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
        result.shift();
        this.csvRecords = result;
        for(let i=0;i<this.csvRecords.length;i++) {
          this.location[i]={
          lat:parseFloat(this.csvRecords[i][1]),
          lng:parseFloat(this.csvRecords[i][2]),
          timeStamp: this.csvRecords[i][0],
          vehicleId: this.csvRecords[i][4],
          }
        }
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }

  getLocation(i):Observable<INFO> {
    const location=of(this.location[i]);
    return location;
  } 

}
