import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatureFiltreesComponent } from './candidature-filtrees.component';

describe('CandidatureFiltreesComponent', () => {
  let component: CandidatureFiltreesComponent;
  let fixture: ComponentFixture<CandidatureFiltreesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidatureFiltreesComponent]
    });
    fixture = TestBed.createComponent(CandidatureFiltreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
