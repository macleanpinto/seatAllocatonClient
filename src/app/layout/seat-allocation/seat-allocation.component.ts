import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeatAllocationService } from '../providers/services/seatAllocationService';
import { Subscription } from '../../../../node_modules/rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-seat-allocation',
  templateUrl: './seat-allocation.component.html',
  styleUrls: ['./seat-allocation.component.scss']
})
export class SeatAllocationComponent implements OnInit, OnDestroy {
  public seats: Array<Array<Seat>> = new Array<Array<Seat>>();
  public selectedSeats: Array<Seat> = new Array<Seat>();
  private _subscription: Subscription[] = [];
  public selectedRequest: any;
  private _selectionExceededRequested = false;
  private closeResult: string;

  constructor(private _seatAllocationService: SeatAllocationService, private _router: Router, private _messageService: MessageService,
    private _modalService: NgbModal) { }

  ngOnInit() {
    this.selectedRequest = JSON.parse(sessionStorage.getItem('selectedRequest'));
    console.log('Test', this.selectedRequest.seatCount);
    if (this.selectedRequest == null) {
      this._router.navigate(['/approve-request']);
    }
    this._subscription.push(this._seatAllocationService.
      fetchLayout(this.selectedRequest.buildingId, this.selectedRequest.floorId, this.selectedRequest.bayId).subscribe(res => {
        this.seats = res.results['seats'];
      }));
  }
  ngOnDestroy() {
    this._subscription.forEach(sub => sub.unsubscribe());
  }

  public selectDeselectAvailableSeats(selectedSeat: Seat) {
    if (selectedSeat.currentlySelected) {
      const index = this.selectedSeats.indexOf(selectedSeat);
      if (index !== -1) {
        this.selectedSeats.splice(index, 1);
      }
    } else {
      this.selectedSeats.push(selectedSeat);
      console.log('Selected: ', this.selectedSeats.length);
      console.log('Requested: ', this.selectedRequest.seatCount);
      console.log('Condition: ', this.selectedSeats.length >= this.selectedRequest.seatCount);
      if (this.selectedSeats.length + 1 > this.selectedRequest.seatCount) {
        this._selectionExceededRequested = true;
        this._messageService.add({
          severity: 'error', summary: 'Error', detail: 'Selection of seats exceeded more than requested'
          , closable: true
        });
      }
    }
    selectedSeat.currentlySelected = !selectedSeat.currentlySelected;
  }

  onClose() {
    this._messageService.clear();
  }

  onReject(content) {
    this._modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

class Seat {
  seatNbr: string;
  occupancy: string;
  project: string;
  currentlySelected: boolean;

  constructor(seatNbr: string, occupancy: string, project: string) {
    this.seatNbr = seatNbr;
    this.occupancy = occupancy;
    this.project = project;
    this.currentlySelected = false;
  }
}

class AllocationRequest {
  requestId: string;
  buildingId: string;
  floorId: string;
  bayId: string;
  seatCount: number;
  projectName: boolean;
  requestInitiator: string;
  status: string;

  constructor(requestId: string,
    buildingId: string,
    floorId: string,
    bayId: string,
    seatCount: number,
    projectName: boolean,
    requestInitiator: string,
    status: string) {
    this.requestId = requestId;
    this.buildingId = buildingId;
    this.floorId = floorId;
    this.bayId = bayId;
    this.seatCount = seatCount;
    this.projectName = projectName;
    this.requestInitiator = requestInitiator;
    this.status = status;
  }
}

