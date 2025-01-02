import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CecompcombrProjPageComponent } from './cecompcombr-proj-page.component';

describe('CecompcombrProjPageComponent', () => {
  let component: CecompcombrProjPageComponent;
  let fixture: ComponentFixture<CecompcombrProjPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CecompcombrProjPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CecompcombrProjPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
