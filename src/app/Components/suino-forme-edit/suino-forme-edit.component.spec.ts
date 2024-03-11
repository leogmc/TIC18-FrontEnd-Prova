import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuinoFormeEditComponent } from './suino-forme-edit.component';

describe('SuinoFormeEditComponent', () => {
  let component: SuinoFormeEditComponent;
  let fixture: ComponentFixture<SuinoFormeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuinoFormeEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuinoFormeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
