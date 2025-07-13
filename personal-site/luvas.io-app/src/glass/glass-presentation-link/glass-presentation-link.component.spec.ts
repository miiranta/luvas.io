import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassPresentationLinkComponent } from './glass-presentation-link.component';

describe('GlassPresentationLinkComponent', () => {
  let component: GlassPresentationLinkComponent;
  let fixture: ComponentFixture<GlassPresentationLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlassPresentationLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlassPresentationLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
