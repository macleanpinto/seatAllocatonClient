import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSeatsComponent } from './import-seats.component';

describe('ImportSeatsComponent', () => {
  let component: ImportSeatsComponent;
  let fixture: ComponentFixture<ImportSeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportSeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
