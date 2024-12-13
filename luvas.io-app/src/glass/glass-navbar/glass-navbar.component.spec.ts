import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassNavbarComponent } from './glass-navbar.component';

describe('GlassNavbarComponent', () => {
  let component: GlassNavbarComponent;
  let fixture: ComponentFixture<GlassNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlassNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlassNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
