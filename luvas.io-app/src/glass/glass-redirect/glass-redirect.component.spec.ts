import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassRedirectComponent } from './glass-redirect.component';

describe('GlassRedirectComponent', () => {
  let component: GlassRedirectComponent;
  let fixture: ComponentFixture<GlassRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlassRedirectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlassRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
