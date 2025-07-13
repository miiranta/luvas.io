import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassLoadingCloseOnViewInitComponent } from './glass-loading-close-on-view-init.component';

describe('GlassLoadingCloseOnViewInitComponent', () => {
  let component: GlassLoadingCloseOnViewInitComponent;
  let fixture: ComponentFixture<GlassLoadingCloseOnViewInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlassLoadingCloseOnViewInitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlassLoadingCloseOnViewInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
