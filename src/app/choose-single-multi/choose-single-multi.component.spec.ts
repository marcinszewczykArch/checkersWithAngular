import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSingleMultiComponent } from './choose-single-multi.component';

describe('ChooseSingleMultiComponent', () => {
  let component: ChooseSingleMultiComponent;
  let fixture: ComponentFixture<ChooseSingleMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseSingleMultiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseSingleMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
