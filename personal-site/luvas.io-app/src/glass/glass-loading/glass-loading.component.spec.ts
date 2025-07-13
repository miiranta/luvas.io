import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassLoadingComponent } from './glass-loading.component';

describe('GlassLoadingComponent', () => {
  let component: GlassLoadingComponent;
  let fixture: ComponentFixture<GlassLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlassLoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlassLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
