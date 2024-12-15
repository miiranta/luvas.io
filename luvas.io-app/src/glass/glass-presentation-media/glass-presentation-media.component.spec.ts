import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassPresentationMediaComponent } from './glass-presentation-media.component';

describe('GlassPresentationMediaComponent', () => {
  let component: GlassPresentationMediaComponent;
  let fixture: ComponentFixture<GlassPresentationMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlassPresentationMediaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlassPresentationMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
