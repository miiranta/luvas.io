import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuvasioProjPageComponent } from './luvasio-proj-page.component';

describe('LuvasioProjPageComponent', () => {
  let component: LuvasioProjPageComponent;
  let fixture: ComponentFixture<LuvasioProjPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LuvasioProjPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuvasioProjPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
