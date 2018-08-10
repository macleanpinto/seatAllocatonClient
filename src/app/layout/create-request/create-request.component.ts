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
  private _buildingId: String;
  private _floorId: Number;
  private _bayId: String;
  private _seatCount: Number;
  private _projectName: String;
  private _requestInitiator: String;
  public bayList = ['1', '2', '3', '4'];
  public floorList = ['1', '2', '3'];
  public buildingList = ['Bangalore-C1', 'Bangalore-C2'];
  constructor(private _fb: FormBuilder, private _seatAllocationService: SeatAllocationService,
    private _messageService: MessageService) {

  }

  ngOnInit() {
    this.createRequestForm = this._fb.group({
      building: ['', Validators.required],
       floor: ['', Validators.required],
       bay: ['', Validators.required],
       seatCount: ['', Validators.required],
       projectName: ['', Validators.required],
       requestInitiator: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    //this._subscription.forEach(sub => sub.unsubscribe());
  }
  clearForm() {
    this.createRequestForm.controls['building'].setValue('');
    this.createRequestForm.controls['floor'].setValue('');
    this.createRequestForm.controls['bay'].setValue('');
    this.createRequestForm.controls['seatCount'].setValue('');
    this.createRequestForm.controls['projectName'].setValue('');
    this.createRequestForm.controls['requestInitiator'].setValue('');
  }
 // constructor(buildingId: string, floorId: number, bayId: string,
 //   seatCount: number, projectName: string, requestInitiator: string, status: string)
  onSubmit(createRequestForm: FormGroup) {
    const seatRequest = new SeatRequestDTO(this.createRequestForm.controls['building'].value,
      this.createRequestForm.controls['floor'].value,
      this.createRequestForm.controls['bay'].value,
      this.createRequestForm.controls['seatCount'].value,
      this.createRequestForm.controls['projectName'].value,
      this.createRequestForm.controls['requestInitiator'].value,
      'CREATED');
    this._seatAllocationService.saveTemplateService(seatRequest).subscribe(result => {
      this._selectionExceededRequested = true;
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
