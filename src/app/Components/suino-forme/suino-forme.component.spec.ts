import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuinoFormeComponent } from './suino-forme.component';

describe('SuinoFormeComponent', () => {
  let component: SuinoFormeComponent;
  let fixture: ComponentFixture<SuinoFormeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuinoFormeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuinoFormeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
