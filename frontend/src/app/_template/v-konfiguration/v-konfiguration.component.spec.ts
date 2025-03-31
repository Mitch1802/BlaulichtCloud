import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VKonfigurationComponent } from './v-konfiguration.component';

describe('VKonfigurationComponent', () => {
  let component: VKonfigurationComponent;
  let fixture: ComponentFixture<VKonfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [VKonfigurationComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(VKonfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
