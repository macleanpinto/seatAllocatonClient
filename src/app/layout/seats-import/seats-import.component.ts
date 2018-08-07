import { Component, OnInit } from '@angular/core';
import { SeatAllocationService } from '../providers/services/seatAllocationService';

@Component({
  selector: 'app-seats-import',
  templateUrl: './seats-import.component.html',
  styleUrls: ['./seats-import.component.scss']
})
export class SeatsImportComponent implements OnInit {

  public selectedFileName = 'No file selected';
  public selectedfile: File;
  public seats: Array<Array<Seat>> = new Array<Array<Seat>>();
  public selectedSeats: Array<Seat> = new Array<Seat>();
  public saveSeats: Array<Seat> = new Array<Seat>();
  public building = '';
  public floorId = '';
  public bayId = '';

  constructor(private _seatsService: SeatAllocationService) { }

  ngOnInit() {
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFileName = fileList[0].name;
      this.selectedfile = fileList[0];
      console.log(this.selectedfile.type);
      const reader = new FileReader();
      reader.readAsText(this.selectedfile, 'UTF-8');
      reader.onload = (fileLoadEvent) => {
        const excelContentAsString = reader.result;
        const allRows = excelContentAsString.split('\n');

        for (let i = 0; i < allRows.length; i++) {
          if (allRows[i] || allRows[i].trim() !== '') {
            const cellValues = allRows[i].split(',');
            const rowSeats: Seat[] = this.fecthRowSeats(cellValues, i);
            this.seats.push(rowSeats);
          }
        }
        console.log(this.seats);

      };
    }
  }

  public fecthRowSeats(rowCellsList: Array<string>, rowId: number) {
    const rowSeats: Seat[] = [];
    rowCellsList.forEach((eachCellValue, colId) => {
      const seatValues = eachCellValue.split('|');
      const eachSeat: Seat = new Seat(seatValues[0], seatValues[1], seatValues[2], rowId, colId);
      rowSeats.push(eachSeat);
      this.saveSeats.push(eachSeat);
    });
    return rowSeats;
  }

  // public selectDeselectAvailableSeats(selectedSeat: Seat) {
  //   if (selectedSeat.currentlySelected) {
  //     const index = this.selectedSeats.indexOf(selectedSeat);
  //     if (index !== -1) {
  //       this.selectedSeats.splice(index, 1);
  //     }
  //   } else {
  //     this.selectedSeats.push(selectedSeat);
  //   }
  //   selectedSeat.currentlySelected = !selectedSeat.currentlySelected;
  // }

  // public populateSeats() {
  //   this._templateSaveService.fetchTemplateService()
  //   .subscribe(
  //     (result) => {
  //       this.seats = result[0].listOfSeatsList;
  //       console.log('Done');

  //     });
  // }


  uploadCsv() {
    let bay = new Bay( this.building, this.floorId, this.bayId);
    this._seatsService.saveTemplateService(this.saveSeats,
      bay).subscribe(result => {
        console.log('Done');
      });
  }
  cancelUpload() {
    this.seats = new Array<Array<Seat>>();
    this.selectedFileName = 'No file selected';
    this.selectedfile = null;
  }


}

class Seat {
  seatNbr: string;
  occupancy: string;
  project: string;
  rowId: number;
  colId: number;
  constructor(seatNbr: string, occupancy: string, project: string, rowId: number, colId: number) {
    this.seatNbr = seatNbr;
    this.occupancy = occupancy;
    this.project = project;
    this.rowId = rowId;
    this.colId = colId;
  }
}

class Bay {
  building: string;
  floorId: string;
  bayId: string;
  constructor(building: string, floorId: string, bayId: string) {
    this.building = building;
    this.floorId = floorId;
    this.bayId = bayId;
  }
}
