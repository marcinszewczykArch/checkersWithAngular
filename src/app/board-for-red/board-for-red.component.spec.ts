import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardForRedComponent } from './board-for-red.component';

describe('BoardForRedComponent', () => {
  let component: BoardForRedComponent;
  let fixture: ComponentFixture<BoardForRedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardForRedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardForRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
