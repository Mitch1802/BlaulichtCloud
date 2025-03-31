import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VDetailComponent } from './v-detail.component';

describe('VDetailComponent', () => {
  let component: VDetailComponent;
  let fixture: ComponentFixture<VDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [VDetailComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
