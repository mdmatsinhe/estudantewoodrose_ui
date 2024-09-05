import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoAcademicoComponent } from './historico-academico.component';

describe('HistoricoAcademicoComponent', () => {
  let component: HistoricoAcademicoComponent;
  let fixture: ComponentFixture<HistoricoAcademicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricoAcademicoComponent]
    });
    fixture = TestBed.createComponent(HistoricoAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
