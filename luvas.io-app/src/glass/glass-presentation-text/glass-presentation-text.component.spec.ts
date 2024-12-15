import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassPresentationTextComponent } from './glass-presentation-text.component';

describe('GlassPresentationTextComponent', () => {
  let component: GlassPresentationTextComponent;
  let fixture: ComponentFixture<GlassPresentationTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlassPresentationTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlassPresentationTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
