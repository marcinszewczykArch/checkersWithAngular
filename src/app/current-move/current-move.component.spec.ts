import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentMoveComponent } from './current-move.component';

describe('CurrentMoveComponent', () => {
  let component: CurrentMoveComponent;
  let fixture: ComponentFixture<CurrentMoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentMoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
