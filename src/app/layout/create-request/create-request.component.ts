import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { SeatAllocationService } from '../providers/services/seatAllocationService';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {

  public createRequestForm: FormGroup;
  public _selectionExceededRequested: Boolean = true;
  public _buildingId: String;
  public _floorId: Number;
  public _bayId: String;
  public _seatCount: Number;
  public _projectName: String;
  public _requestInitiator: String;
  public bayList = ['Bay 1', 'Bay 2', 'Bay 3', 'Bay 4'];
  public floorList = ['Floor 1', 'Floor 2', 'Floor 3'];
  public buildingList = ['Building 1', 'Building 2', 'Building 3'];
  constructor(private _fb: FormBuilder, private _seatAllocationService: SeatAllocationService,
    private _messageService: MessageService) {

  }

  ngOnInit() {
    this.createRequestForm = this._fb.group({
      buildingId: ['', Validators.required],
       floorId: ['', Validators.required],
       bayId: ['', Validators.required],
       seatCount: ['', Validators.required],
       projectName: ['', Validators.required],
       requestInitiator: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    //this._subscription.forEach(sub => sub.unsubscribe());
  }
  clearForm() {
    this.createRequestForm.controls['buildingId'].setValue('');
    this.createRequestForm.controls['floorId'].setValue('');
    this.createRequestForm.controls['bayId'].setValue('');
    this.createRequestForm.controls['seatCount'].setValue('');
    this.createRequestForm.controls['projectName'].setValue('');
    this.createRequestForm.controls['requestInitiator'].setValue('');
  }
 // constructor(buildingId: string, floorId: number, bayId: string,
 //   seatCount: number, projectName: string, requestInitiator: string, status: string)
  onSubmit(createRequestForm: FormGroup) {
    const seatRequest = new SeatRequestDTO(this.createRequestForm.controls['buildingId'].value,
      this.createRequestForm.controls['floorId'].value,
      this.createRequestForm.controls['bayId'].value,
      this.createRequestForm.controls['seatCount'].value,
      this.createRequestForm.controls['projectName'].value,
      this.createRequestForm.controls['requestInitiator'].value,
      'CREATED');
    this._seatAllocationService.saveTemplateService(seatRequest).subscribe(result => {
      this._messageService.add({
        severity: 'success', summary: 'Success', detail: 'Request created successfully', closable: true
      });
      this.clearForm();
    });
  }
}

class SeatRequestDTO {

  buildingId: string;

  floorId: number;

  bayId: string;

  seatCount: number;

  projectName: string;

  requestInitiator: string;

  status: string;

  constructor(buildingId: string, floorId: number, bayId: string,
    seatCount: number, projectName: string, requestInitiator: string, status: string) {
    this.buildingId = buildingId;
    this.floorId = floorId;
    this.bayId = bayId;
    this.seatCount = seatCount;
    this.projectName = projectName;
    this.requestInitiator = requestInitiator;
    this.status = status;
  }
}
