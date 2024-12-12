import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassSelectorComponent } from './glass-selector.component';

describe('GlassSelectorComponent', () => {
  let component: GlassSelectorComponent;
  let fixture: ComponentFixture<GlassSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlassSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlassSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
