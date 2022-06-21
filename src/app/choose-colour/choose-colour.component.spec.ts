import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseColourComponent } from './choose-colour.component';

describe('ChooseColourComponent', () => {
  let component: ChooseColourComponent;
  let fixture: ComponentFixture<ChooseColourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseColourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseColourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
