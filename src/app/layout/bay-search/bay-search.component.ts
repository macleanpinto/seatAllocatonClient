import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SeatAllocationService } from '../providers/services/seatAllocationService';
import { Subscription } from '../../../../node_modules/rxjs';
import { Validators, FormBuilder, FormGroup, FormControl, Form } from '@angular/forms';

@Component({
  selector: 'app-bay-search',
  templateUrl: './bay-search.component.html',
  styleUrls: ['./bay-search.component.scss']
})
export class BaySearchComponent implements OnInit {
  public seats: Array<Array<Seat>> = new Array<Array<Seat>>();
  public buildingId: String;
  public floorId: String;
  public bayId: String;
  public selectedSeats: Array<Seat> = new Array<Seat>();
  private _subscription: Subscription[] = [];
  public selectedRequest: any;
  public baySearchForm: FormGroup;
  public showLayout: Boolean = false;

  constructor(private _seatAllocationService: SeatAllocationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.baySearchForm = this.formBuilder.group({
      building: new FormControl('', Validators.required),
      floor: new FormControl('', Validators.required),
      bay: new FormControl('', Validators.required)
    });
  }
  ngOnDestroy() {
    this._subscription.forEach(sub => sub.unsubscribe());
  }

  onSearch(form: any) {
    sessionStorage.setItem('baySearchForm', JSON.stringify(form.value));
    this._subscription.push(this._seatAllocationService.
      fetchLayout(form.value.building, form.value.floor, form.value.bay).subscribe(res => {
        this.showLayout = true;
        this.seats = res.results['seats'];
      }));
  }

  private clearForm() {
    this.baySearchForm.controls['building'].setValue('');
    this.baySearchForm.controls['floor'].setValue('');
    this.baySearchForm.controls['bay'].setValue('');
    this.seats = [];
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
