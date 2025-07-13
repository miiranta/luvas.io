import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassPresentationComponent } from './glass-presentation.component';

describe('GlassPresentationComponent', () => {
  let component: GlassPresentationComponent;
  let fixture: ComponentFixture<GlassPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlassPresentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlassPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
