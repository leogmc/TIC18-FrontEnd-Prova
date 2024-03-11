import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioSuinoComponent } from './relatorio-suino.component';

describe('RelatorioSuinoComponent', () => {
  let component: RelatorioSuinoComponent;
  let fixture: ComponentFixture<RelatorioSuinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioSuinoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelatorioSuinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
