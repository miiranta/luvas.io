import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Minecraft2ProjPageComponent } from './minecraft2-proj-page.component';

describe('Minecraft2ProjPageComponent', () => {
  let component: Minecraft2ProjPageComponent;
  let fixture: ComponentFixture<Minecraft2ProjPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Minecraft2ProjPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Minecraft2ProjPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
