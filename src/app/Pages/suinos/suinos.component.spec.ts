import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuinosComponent } from './suinos.component';

describe('SuinosComponent', () => {
  let component: SuinosComponent;
  let fixture: ComponentFixture<SuinosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuinosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
