import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartProjPageComponent } from './start-proj-page.component';

describe('StartProjPageComponent', () => {
  let component: StartProjPageComponent;
  let fixture: ComponentFixture<StartProjPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartProjPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartProjPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
