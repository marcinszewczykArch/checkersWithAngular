import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardForWhiteComponent } from './board-for-white.component';

describe('BoardForWhiteComponent', () => {
  let component: BoardForWhiteComponent;
  let fixture: ComponentFixture<BoardForWhiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardForWhiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardForWhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
