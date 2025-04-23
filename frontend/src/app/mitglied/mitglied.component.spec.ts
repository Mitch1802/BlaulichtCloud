import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitgliedComponent } from './mitglied.component';

describe('MitgliedComponent', () => {
  let component: MitgliedComponent;
  let fixture: ComponentFixture<MitgliedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MitgliedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MitgliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
