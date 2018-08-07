import { Component, OnInit } from '@angular/core';
import { SeatsService } from '../../seats.service';

@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss']
})
export class BlankPageComponent implements OnInit {

    public selectedFileName = 'No file selected';
    public selectedfile: File;
    public seats: Array<Array<Seat>> = new Array<Array<Seat>>();
    public selectedSeats: Array<Seat> = new Array<Seat>();

    constructor(private _seatService: SeatsService) { }

    ngOnInit() { }


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
                //this._seatService.saveTemplateService(this.seats).subscribe(result => console.log('Done'));
            };
        }
    }

    public fecthRowSeats(rowCellsList: Array<string>, rowCount: number) {
        const rowSeats: Seat[] = [];
        let colCount = 0;
        rowCellsList.forEach(eachCellValue => {
            colCount++;
            const seatValues = eachCellValue.split('|');
            const eachSeat: Seat = new Seat(seatValues[0], seatValues[1], seatValues[2], rowCount, colCount);
            rowSeats.push(eachSeat);
        });
        return rowSeats;
    }

    public selectDeselectAvailableSeats(selectedSeat: Seat) {
        if (selectedSeat.currentlySelected) {
            const index = this.selectedSeats.indexOf(selectedSeat);
            if (index !== -1) {
                this.selectedSeats.splice(index, 1);
            }
        } else {
            this.selectedSeats.push(selectedSeat);
        }
        selectedSeat.currentlySelected = !selectedSeat.currentlySelected;
    }

    // public populateSeats() {
        // this._seatService.fetchTemplateService()
        //   .subscribe(
        //     (result) => {
        //       this.seats = result[0].listOfSeatsList;
        //       console.log('Done');

        //     });
    //}

    // public convertSeatsForDisplay() {
    //     let backendSeats = new Array<Seat>();
    //     //this.seats.push
    //     //backendSeats.forEach()
    //     for (let rowCount = 1; rowCount <= backendSeats.length; rowCount++) {
    //         const seatRowList = new Array<Seat>();
    //         backendSeats.forEach((element) => {
    //             if (element.rowCount === rowCount) {
    //                 seatRowList.push(element);
    //             }
    //         });
    //         this.seats.push(seatRowList);
    //     }
    // }
}

class Seat {
    seatId: number;
    rowId: string;
    colId: number;
    occupancy: string;
    project: string;
    currentlySelected: boolean;


    constructor(occupancy: string, project: string, rowId: string, colId: number, seatId: number) {
        this.seatId = seatId;
        this.occupancy = occupancy;
        this.project = project;
        this.currentlySelected = false;
        this.rowId = rowId;
        this.colId = colId;
    }
}
