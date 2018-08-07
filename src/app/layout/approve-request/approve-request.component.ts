import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { SeatAllocationService } from '../providers/services/seatAllocationService';

@Component({
  selector: 'app-approve-request',
  templateUrl: './approve-request.component.html',
  styleUrls: ['./approve-request.component.scss'],
  animations: [routerTransition()]
})
export class ApproveRequestComponent implements OnInit {

  requests: any[];
  cols: any[];
  selectedRequest: any;

  constructor(private _seatAllocationService: SeatAllocationService) { }

  ngOnInit() {
    this._seatAllocationService.fetchRequests().subscribe(res => {
      this.requests = res.results;
    });
    this.cols = [
      { field: 'bayName', header: 'Bay Name' },
      { field: 'floorId', header: 'Floor Id' },
      { field: 'wingId', header: 'Wing Id' },
      { field: 'seatCount', header: 'No of Seats Requested' },
      { field: 'projectName', header: 'Project Name' },
      { field: 'requestInitiator', header: 'Request Initiator' },
      { field: 'status', header: 'Status' }
    ];
  }

  onRowSelect(event) {
    this.selectedRequest = event.data;
    // this.messageService.add({ severity: 'info', summary: 'Car Selected', detail: 'Vin: ' + event.data.projectName });
  }

  onRowUnselect(event) {
    //   this.messageService.add({ severity: 'info', summary: 'Car Unselected', detail: 'Vin: ' + event.data.vin });
  }
}
