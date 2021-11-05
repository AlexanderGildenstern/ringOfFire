import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerMoblieComponent } from './player-moblie.component';

describe('PlayerMoblieComponent', () => {
  let component: PlayerMoblieComponent;
  let fixture: ComponentFixture<PlayerMoblieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerMoblieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerMoblieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
