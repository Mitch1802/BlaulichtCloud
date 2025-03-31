import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VUserComponent } from './user.component';

describe('UserComponent', () => {
  let component: VUserComponent;
  let fixture: ComponentFixture<VUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [VUserComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
